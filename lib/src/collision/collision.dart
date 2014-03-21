// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Functions used for computing contact points, distance
 * queries, and time of impact (TimeOfImpact) queries.
 */

part of box2d;

class Collision {
  static const int NULL_FEATURE = Settings.MAX_INTEGER;

  final DefaultWorldPool _pool;

  /** Cache used to help warmstart distance. */
  final SimplexCache cache = new SimplexCache();

  /** Distance input and output. */
  final DistanceInput input = new DistanceInput();
  final DistanceOutput output = new DistanceOutput();

  /** A pool of already constructed objects. */
  final EdgeResults results1 = new EdgeResults();
  final EdgeResults results2 = new EdgeResults();
  final List<ClipVertex> incidentEdge =
    new List<ClipVertex>.generate(2, (_) => new ClipVertex(), growable: false);

  final Vector2 localTangent = new Vector2.zero();
  final Vector2 localNormal = new Vector2.zero();
  final Vector2 planePoint = new Vector2.zero();
  final Vector2 tangent = new Vector2.zero();
  final Vector2 normal = new Vector2.zero();
  final Vector2 normal1 = new Vector2.zero();
  final Vector2 v11 = new Vector2.zero();
  final Vector2 v12 = new Vector2.zero();
  final List<ClipVertex> clipPoints1 =
    new List<ClipVertex>.generate(2, (_) => new ClipVertex(), growable: false);

  final List<ClipVertex> clipPoints2 =
    new List<ClipVertex>.generate(2, (_) => new ClipVertex(), growable: false);

  /**
   * Constructs a new Collision object. Should only be constructed once (in the
   * pool). Retrieve from the pool to use.
   */
  Collision._construct(this._pool);

  /**
   * Returns true if the two given shapes overlap.
   */
  bool testOverlap(Shape shapeA, Shape shapeB, Transform transformA,
      Transform transformB) {
    input.proxyA.setFromShape(shapeA);
    input.proxyB.setFromShape(shapeB);
    input.transformA.setFrom(transformA);
    input.transformB.setFrom(transformB);
    input.useRadii = true;

    cache.count = 0;

    _pool.distance.distance(output, cache, input);
    return output.distance < 10.0 * Settings.EPSILON;
  }

  /**
   * Compute the point states given two manifolds. The states pertain to the
   * transition from manifold1 to manifold2. So state1 is either persist or
   * remove while state2 is either add or persist.
   */
  void getPointStates(List<int> state1, List<int> state2,
      Manifold manifold1, Manifold manifold2) {
    for (int i = 0; i < Settings.MAX_MANIFOLD_POINTS; ++i) {
      state1[i] = PointState.NULL_STATE;
      state2[i] = PointState.NULL_STATE;
    }

    // Detect persists and removes.
    for (int i = 0; i < manifold1.pointCount; ++i) {
      ContactID id = manifold1.points[i].id;

      state1[i] = PointState.REMOVE_STATE;

      for (int j = 0; j < manifold2.pointCount; ++j) {
        if (manifold2.points[j].id.isEqual(id)) {
          state1[i] = PointState.PERSIST_STATE;
          break;
        }
      }
    }

    // Detect persists and adds
    for (int i = 0; i < manifold2.pointCount; ++i) {
      ContactID id = manifold2.points[i].id;

      state2[i] = PointState.ADD_STATE;

      for (int j = 0; j < manifold1.pointCount; ++j) {
        if (manifold1.points[j].id.isEqual(id)) {
          state2[i] = PointState.PERSIST_STATE;
          break;
        }
      }
    }
  }

  /**
   * Clipping for contact manifolds.
   * Sutherland-Hodgman clipping.
   */
  static int clipSegmentToLine(List<ClipVertex> vOut, List<ClipVertex> vIn,
      Vector2 norm, double offset) {

    // Start with no output points
    int numOut = 0;

    // Calculate the distance of end points to the line
    double distance0 = norm.dot(vIn[0].v) - offset;
    double distance1 = norm.dot(vIn[1].v) - offset;

    // If the points are behind the plane
    if (distance0 <= 0.0) vOut[numOut++].setFrom(vIn[0]);

    if (distance1 <= 0.0) vOut[numOut++].setFrom(vIn[1]);

    // If the points are on different sides of the plane
    if (distance0 * distance1 < 0.0) {
      // Find intersection point of edge and plane
      double interp = distance0 / (distance0 - distance1);
      // vOut[numOut].v = vIn[0].v + interp * (vIn[1].v - vIn[0].v);
      vOut[numOut].v..setFrom(vIn[1].v)..
          sub(vIn[0].v)..scale(interp)..add(vIn[0].v);
      final ClipVertex vin = (distance0 > 0.0 ? vIn[0] : vIn[1]);
      vOut[numOut].id.setFrom(vin.id);
      ++numOut;
    }

    return numOut;
  }

  /** Compute the collision manifold between two circles. */
  void collideCircles(Manifold manifold, CircleShape circle1, Transform xfA,
      CircleShape circle2, Transform xfB) {
    manifold.pointCount = 0;

    final Vector2 v = circle1.position;
    final double pAy = xfA.position.y + xfA.rotation.dotRow(1, v);
    final double pAx = xfA.position.x + xfA.rotation.dotRow(0, v);

    final Vector2 v1 = circle2.position;
    final double pBy = xfB.position.y + xfB.rotation.dotRow(1, v1);
    final double pBx = xfB.position.x + xfB.rotation.dotRow(0, v1);

    final double dx = pBx - pAx;
    final double dy = pBy - pAy;

    final double distSqr = dx * dx + dy * dy;

    final double radius = circle1.radius + circle2.radius;
    if (distSqr > radius * radius) return;

    manifold.type = ManifoldType.CIRCLES;
    manifold.localPoint.setFrom(circle1.position);
    manifold.localNormal.setZero();
    manifold.pointCount = 1;

    manifold.points[0].localPoint.setFrom(circle2.position);
    manifold.points[0].id.zero();
  }

  /**
   * Compute the collision manifold between a polygon and a circle.
   */
  void collidePolygonAndCircle(Manifold manifold, PolygonShape polygon,
      Transform xfA, CircleShape circle, Transform xfB) {
    manifold.pointCount = 0;
    Vector2 v = circle.position;

    final double cy = xfB.position.y + xfB.rotation.dotRow(1, v);
    final double cx = xfB.position.x + xfB.rotation.dotRow(0, v);
    final Vector2 cpos = new Vector2(cx - xfA.position.x, cy - xfA.position.y);
//    final double bx = xfA.rotation.entry(0,0);
//    final double by = xfA.rotation.entry(1,0);
//    final double b1x = xfA.rotation.entry(0,1);
//    final double b1y = xfA.rotation.entry(1,1);
    final Vector2 cLocal = new Vector2(xfA.rotation.dotColumn(0, cpos),
                                       xfA.rotation.dotColumn(1, cpos));

    // Find the min separating edge.
    int normalIndex = 0;
    double separation = Settings.SMALL_NUMBER;
    final double radius = polygon.radius + circle.radius;
    final int vertexCount = polygon.vertexCount;

    final List<Vector2> vertices = polygon.vertices;
    final List<Vector2> normals = polygon.normals;

    for (int i = 0; i < vertexCount; ++i) {
      final Vector2 vertex = vertices[i];
      final Vector2 temp = cLocal - vertex;
      final Vector2 norm = normals[i];
      final double s = norm.dot(temp);

      // early out
      if (s > radius) return;

      if (s > separation) {
        separation = s;
        normalIndex = i;
      }
    }

    // Vertices that subtend the incident face.
    final int vertIndex1 = normalIndex;
    final int vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
    final Vector2 v1 = vertices[vertIndex1];
    final Vector2 v2 = vertices[vertIndex2];

    // If the center is inside the polygon ...
    if (separation < Settings.EPSILON) {
      manifold.pointCount = 1;
      manifold.type = ManifoldType.FACE_A;

      Vector2 norm = normals[normalIndex];
      manifold.localNormal.x = norm.x;
      manifold.localNormal.y = norm.y;
      manifold.localPoint.x = (v1.x + v2.x) * .5;
      manifold.localPoint.y = (v1.y + v2.y) * .5;
      ManifoldPoint mpoint = manifold.points[0];
      mpoint.localPoint.x = circle.position.x;
      mpoint.localPoint.y = circle.position.y;
      mpoint.id.zero();
      return;
    }

    // Compute barycentric coordinates
    final Vector2 temp = cLocal - v1;
    final Vector2 temp2 = v2 - v1;
    final double u1 = temp.dot(temp2);

    final Vector2 temp3 = cLocal - v2;
    final Vector2 temp4 = v1 - v2;
    final double u2 = temp3.dot(temp4);

    if (u1 <= 0) {
      final Vector2 d = cLocal - v1;
      if (d.length2 > radius * radius) return;

      manifold.pointCount = 1;
      manifold.type = ManifoldType.FACE_A;
      manifold.localNormal.setFrom(cLocal - v1);
      manifold.localNormal.normalize();
      manifold.localPoint.setFrom(v1);
      manifold.points[0].localPoint.setFrom(circle.position);
      manifold.points[0].id.zero();
    } else if (u2 <= 0.0) {
      final Vector2 d = cLocal - v2;
      if (d.length2 > radius * radius) return;

      manifold.pointCount = 1;
      manifold.type = ManifoldType.FACE_A;
      manifold.localNormal.setFrom(cLocal - v2);
      manifold.localNormal.normalize();
      manifold.localPoint.setFrom(v2);
      manifold.points[0].localPoint.setFrom(circle.position);
      manifold.points[0].id.zero();
    } else {
      // Vector2 faceCenter = 0.5 * (v1 + v2);
      // (temp is faceCenter)
      final Vector2 fc = (v1 + v2)..scale(0.5);

      final Vector2 t = cLocal - fc;
      final Vector2 norm = normals[vertIndex1];
      separation = t.dot(norm);
      if (separation > radius) return;

      manifold.pointCount = 1;
      manifold.type = ManifoldType.FACE_A;
      manifold.localNormal.setFrom(normals[vertIndex1]);
      manifold.localPoint.setFrom(fc);
      manifold.points[0].localPoint.setFrom(circle.position);
      manifold.points[0].id.zero();
    }
  }

  /**
   * Find the separation between poly1 and poly2 for a given edge normal on
   * poly1.
   */
  double edgeSeparation(PolygonShape poly1, Transform xf1, int edge1,
                        PolygonShape poly2, Transform xf2) {
    final int count1 = poly1.vertexCount;
    final List<Vector2> vertices1 = poly1.vertices;
    final List<Vector2> normals1 = poly1.normals;

    final int count2 = poly2.vertexCount;
    final List<Vector2> vertices2 = poly2.vertices;

    assert(0 <= edge1 && edge1 < count1);
    // Convert normal from poly1's frame into poly2's frame.
    final Matrix2 R = xf1.rotation;
    final Vector2 v = normals1[edge1];
    final Vector2 normal1World = new Vector2(R.dotRow(0, v), R.dotRow(1, v));
    final Matrix2 R1 = xf2.rotation;
    final double normal1x = R1.dotColumn(0, normal1World);
    final double normal1y = R1.dotColumn(1, normal1World);
    // end inline

    // Find support vertex on poly2 for -normal.
    int index = 0;
    double minDot = Settings.BIG_NUMBER;

    for (int i = 0; i < count2; ++i) {
      final Vector2 a = vertices2[i];
      final double dot = a.x * normal1x + a.y * normal1y;
      if (dot < minDot) {
        minDot = dot;
        index = i;
      }
    }

    final Vector2 v3 = vertices1[edge1];
    final double v1y = xf1.position.y + R.dotRow(1, v3);
    final double v1x = xf1.position.x + R.dotRow(0, v3);
    final Vector2 v4 = vertices2[index];
    final double v2y = xf2.position.y + R1.dotRow(1, v4) - v1y;
    final double v2x = xf2.position.x + R1.dotRow(0, v4) - v1x;

    return v2x * normal1World.x + v2y * normal1World.y;
  }

  /**
   * Find the max separation between poly1 and poly2 using edge normals from
   * poly1.
   */
  void findMaxSeparation(EdgeResults results, PolygonShape poly1, Transform xf1,
      PolygonShape poly2, Transform xf2) {
    int count1 = poly1.vertexCount;
    final List<Vector2> normals1 = poly1.normals;
    Vector2 v = poly2.centroid;

    final double predy = xf2.position.y + xf2.rotation.dotRow(1, v);
    final double predx = xf2.position.x + xf2.rotation.dotRow(0, v);
    final Vector2 v1 = poly1.centroid;
    final double tempy = xf1.position.y + xf1.rotation.dotRow(1, v1);
    final double tempx = xf1.position.x + xf1.rotation.dotRow(0, v1);
    final Vector2 d = new Vector2(predx - tempx, predy - tempy);

    final Matrix2 R = xf1.rotation;
    final double dLocal1x = R.dotColumn(0, d);
    final double dLocal1y = R.dotColumn(1, d);

    // Find edge normal on poly1 that has the largest projection onto d.
    int edge = 0;
    double dot;
    double maxDot = Settings.SMALL_NUMBER;
    for (int i = 0; i < count1; i++) {
      final Vector2 norm = normals1[i];
      dot = norm.x * dLocal1x + norm.y * dLocal1y;
      if (dot > maxDot) {
        maxDot = dot;
        edge = i;
      }
    }

    // Get the separation for the edge normal.
    double s = edgeSeparation(poly1, xf1, edge, poly2, xf2);

    // Check the separation for the previous edge normal.
    int prevEdge = edge - 1 >= 0 ? edge - 1 : count1 - 1;
    double sPrev = edgeSeparation(poly1, xf1, prevEdge, poly2, xf2);

    // Check the separation for the next edge normal.
    int nextEdge = edge + 1 < count1 ? edge + 1 : 0;
    double sNext = edgeSeparation(poly1, xf1, nextEdge, poly2, xf2);

    // Find the best edge and the search direction.
    int bestEdge;
    double bestSeparation;
    int increment;
    if (sPrev > s && sPrev > sNext) {
      increment = -1;
      bestEdge = prevEdge;
      bestSeparation = sPrev;
    } else if (sNext > s) {
      increment = 1;
      bestEdge = nextEdge;
      bestSeparation = sNext;
    } else {
      results.edgeIndex = edge;
      results.separation = s;
      return;
    }

    // Perform a local search for the best edge normal.
    while (true) {
      if (increment == -1)
        edge = bestEdge - 1 >= 0 ? bestEdge - 1 : count1 - 1;
      else
        edge = bestEdge + 1 < count1 ? bestEdge + 1 : 0;

      s = edgeSeparation(poly1, xf1, edge, poly2, xf2);

      if (s > bestSeparation) {
        bestEdge = edge;
        bestSeparation = s;
      } else {
        break;
      }
    }

    results.edgeIndex = bestEdge;
    results.separation = bestSeparation;
  }

  void findIncidentEdge(List<ClipVertex> c, PolygonShape poly1, Transform xf1,
      int edge1, PolygonShape poly2, Transform xf2) {
    int count1 = poly1.vertexCount;
    final List<Vector2> normals1 = poly1.normals;

    int count2 = poly2.vertexCount;
    final List<Vector2> vertices2 = poly2.vertices;
    final List<Vector2> normals2 = poly2.normals;

    assert(0 <= edge1 && edge1 < count1);

    // Get the normal of the reference edge in poly2's frame.
    xf1.rotation.transformed(normals1[edge1], normal1);
    xf2.rotation.transposed().transformed(normal1, normal1);

    // Find the incident edge on poly2.
    int index = 0;
    double minDot = Settings.BIG_NUMBER;
    for (int i = 0; i < count2; ++i) {
      double dot = normal1.dot(normals2[i]);
      if (dot < minDot) {
        minDot = dot;
        index = i;
      }
    }

    // Build the clip vertices for the incident edge.
    int i1 = index;
    int i2 = i1 + 1 < count2 ? i1 + 1 : 0;

    Transform.mulToOut(xf2, vertices2[i1], c[0].v);
    c[0].id.features.referenceEdge = edge1;
    c[0].id.features.incidentEdge = i1;
    c[0].id.features.incidentVertex = 0;

    Transform.mulToOut(xf2, vertices2[i2], c[1].v);
    c[1].id.features.referenceEdge = edge1;
    c[1].id.features.incidentEdge = i2;
    c[1].id.features.incidentVertex = 1;
  }

  /**
   * Compute the collision manifold between two polygons.
   */
  void collidePolygons(Manifold manifold, PolygonShape polyA, Transform xfA,
     PolygonShape polyB, Transform xfB) {

    manifold.pointCount = 0;
    double totalRadius = polyA.radius + polyB.radius;

    findMaxSeparation(results1, polyA, xfA, polyB, xfB);
    if (results1.separation > totalRadius) return;

    findMaxSeparation(results2, polyB, xfB, polyA, xfA);
    if (results2.separation > totalRadius) return;

    PolygonShape poly1; // reference polygon
    PolygonShape poly2; // incident polygon
    Transform xf1, xf2;
    int edge1; // reference edge
    int flip;
    double k_relativeTol = 0.98;
    double k_absoluteTol = 0.001;

    if (results2.separation > k_relativeTol * results1.separation +
        k_absoluteTol) {
      poly1 = polyB;
      poly2 = polyA;
      xf1 = xfB;
      xf2 = xfA;
      edge1 = results2.edgeIndex;
      manifold.type = ManifoldType.FACE_B;
      flip = 1;
    } else {
      poly1 = polyA;
      poly2 = polyB;
      xf1 = xfA;
      xf2 = xfB;
      edge1 = results1.edgeIndex;
      manifold.type = ManifoldType.FACE_A;
      flip = 0;
    }

    findIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);

    int count1 = poly1.vertexCount;
    List<Vector2> vertices1 = poly1.vertices;

    v11.setFrom(vertices1[edge1]);
    v12.setFrom(edge1 + 1 < count1 ? vertices1[edge1 + 1] : vertices1[0]);

    localTangent..setFrom(v12)..sub(v11);
    localTangent.normalize();

    // Vector2 localNormal = Cross(dv, 1.0);
    localTangent.scaleOrthogonalInto(-1.0, localNormal);

    // Vector2 planePoint = 0.5 * (v11 + v12)
    planePoint..setFrom(v11)..add(v12)..scale(.5);

    // Vector2 sideNormal = Mul(xf1.rotation, v12 - v11);
    xf1.rotation.transformed(localTangent, tangent);

    // Vector2 frontNormal = Cross(sideNormal, 1.0);
    tangent.scaleOrthogonalInto(-1.0, normal);

    // v11 = Mul(xf1, v11);
    // v12 = Mul(xf1, v12);
    Transform.mulToOut(xf1, v11, v11);
    Transform.mulToOut(xf1, v12, v12);

    // Face offset
    double frontOffset = normal.dot(v11);

    // Side offsets, extended by polytope skin thickness.
    double sideOffset1 = -tangent.dot(v11) + totalRadius;
    double sideOffset2 = tangent.dot(v12) + totalRadius;

    // Clip incident edge against extruded edge1 side edges.
    // ClipVertex clipPoints1[2];
    // ClipVertex clipPoints2[2];
    int np;

    // Clip to box side 1
    // np = ClipSegmentToLine(clipPoints1, incidentEdge, -sideNormal,
    // sideOffset1);
    tangent.negate();
    np = clipSegmentToLine(clipPoints1, incidentEdge, tangent, sideOffset1);
    tangent.negate();

    if (np < 2) return;

    // Clip to negative box side 1
    np = clipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2);

    if (np < 2) return;

    // Now clipPoints2 contains the clipped points.
    manifold.localNormal.setFrom(localNormal);
    manifold.localPoint.setFrom(planePoint);

    int pointCount = 0;
    for (int i = 0; i < Settings.MAX_MANIFOLD_POINTS; ++i) {
      double separation = normal.dot(clipPoints2[i].v) - frontOffset;

      if (separation <= totalRadius) {
        ManifoldPoint cp = manifold.points[pointCount];
        Transform.mulTransToOut(xf2, clipPoints2[i].v, cp.localPoint);
        // cp.localPoint = MulT(xf2, clipPoints2[i].v);
        cp.id.setFrom(clipPoints2[i].id);
        cp.id.features.flip = flip;
        ++pointCount;
      }
    }

    manifold.pointCount = pointCount;
  }
}

/**
 * Used for computing contact manifolds.
 */
class ClipVertex {
  Vector2 v = new Vector2.zero();
  ContactID id = new ContactID();

  ClipVertex();

  void setFrom(ClipVertex cv) {
    v.setFrom(cv.v);
    id.setFrom(cv.id);
  }
}

/**
 * Class for returning edge results
 */
class EdgeResults {
  double separation = 0.0;
  int edgeIndex = 0;

  EdgeResults();
}
