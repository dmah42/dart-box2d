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
 * queries, and time of impact (TimeOfImpact) queries. Collision methods are non-static
 * for pooling speed, retrieve a collision object from the SingletonPool.
 */

part of box2d;

class Collision {
  static const int NULL_FEATURE = Settings.MAX_INTEGER;

  final DefaultWorldPool _pool;

  /** Cache used to help warmstart distance. */
  final SimplexCache cache;

  /** Distance input and output. */
  final DistanceInput input;
  final DistanceOutput output;

  /** A pool of already constructed objects. */
  final EdgeResults results1;
  final EdgeResults results2;
  final List<ClipVertex> incidentEdge;
  final vec2 localTangent;
  final vec2 localNormal;
  final vec2 planePoint;
  final vec2 tangent;
  final vec2 normal;
  final vec2 normal1;
  final vec2 v11;
  final vec2 v12;
  final List<ClipVertex> clipPoints1;
  final List<ClipVertex> clipPoints2;

  /**
   * Constructs a new Collision object. Should only be constructed once (in the
   * pool). Retrieve from the pool to use.
   */
  Collision._construct(DefaultWorldPool pool) :
    _pool = pool,
    input = new DistanceInput(),
    cache = new SimplexCache(),
    output = new DistanceOutput(),
    results1 = new EdgeResults(),
    results2 = new EdgeResults(),
    incidentEdge = new List<ClipVertex>(2),
    localTangent = new vec2.zero(),
    localNormal = new vec2.zero(),
    planePoint = new vec2.zero(),
    tangent = new vec2.zero(),
    normal = new vec2.zero(),
    normal1 = new vec2.zero(),
    v11 = new vec2.zero(),
    v12 = new vec2.zero(),
    clipPoints1 = new List<ClipVertex>(2),
    clipPoints2 = new List<ClipVertex>(2) {
    incidentEdge[0] = new ClipVertex();
    incidentEdge[1] = new ClipVertex();
    clipPoints1[0] = new ClipVertex();
    clipPoints1[1] = new ClipVertex();
    clipPoints2[0] = new ClipVertex();
    clipPoints2[1] = new ClipVertex();
  }

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

    _pool.distance.computeDistance(output, cache, input);
    return output._distance < 10.0 * Settings.EPSILON;
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
      vec2 norm, num offset) {

    // Start with no output points
    int numOut = 0;

    // Calculate the distance of end points to the line
    num distance0 = dot(norm, vIn[0].v) - offset;
    num distance1 = dot(norm, vIn[1].v) - offset;

    // If the points are behind the plane
    if (distance0 <= 0.0)
      vOut[numOut++].setFrom(vIn[0]);

    if (distance1 <= 0.0)
      vOut[numOut++].setFrom(vIn[1]);

    // If the points are on different sides of the plane
    if (distance0 * distance1 < 0.0) {
      // Find intersection point of edge and plane
      num interp = distance0 / (distance0 - distance1);
      // vOut[numOut].v = vIn[0].v + interp * (vIn[1].v - vIn[0].v);
      vOut[numOut].v.copyFrom(vIn[1].v).
          sub(vIn[0].v).scale(interp).add(vIn[0].v);
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

    final vec2 v = circle1.position;
    final vec2 pA = xfA.position + xfA.rotation * v;

    final vec2 v1 = circle2.position;
    final vec2 pB = xfB.position + xfB.rotation * v1;

    final vec2 d = pB - pA;

    final num radius = circle1.radius + circle2.radius;
    if (d.length2 > radius * radius)
      return;

    manifold.type = ManifoldType.CIRCLES;
    manifold.localPoint.copyFrom(circle1.position);
    manifold.localNormal.splat(0.0);
    manifold.pointCount = 1;

    manifold.points[0].localPoint.copyFrom(circle2.position);
    manifold.points[0].id.zero();
  }

  /**
   * Compute the collision manifold between a polygon and a circle.
   */
  void collidePolygonAndCircle(Manifold manifold, PolygonShape polygon,
      Transform xfA, CircleShape circle, Transform xfB) {
    manifold.pointCount = 0;
    vec2 v = circle.position;

    final vec2 c = xfB.position + xfB.rotation * v;
    final vec2 cd = c - xfA.position;
    // TODO: cleanup
    final vec2 cLocal = new vec2(cd.x * xfA.rotation.entry(0, 0) + cd.y * xfA.rotation.entry(1, 0),
                                 cd.x * xfA.rotation.entry(0, 1) + cd.y * xfA.rotation.entry(1, 1));

    // Find the min separating edge.
    int normalIndex = 0;
    num separation = Settings.SMALL_NUMBER;
    final num radius = polygon.radius + circle.radius;
    final int vertexCount = polygon.vertexCount;

    final List<vec2> vertices = polygon.vertices;
    final List<vec2> normals = polygon.normals;

    for (int i = 0; i < vertexCount; ++i) {
      final vec2 vertex = vertices[i];
      final vec2 temp = cLocal - vertex;
      final vec2 norm = normals[i];
      final num s = norm.dot(temp);

      // early out
      if (s > radius)
        return;

      if (s > separation) {
        separation = s;
        normalIndex = i;
      }
    }

    // Vertices that subtend the incident face.
    final int vertIndex1 = normalIndex;
    final int vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
    final vec2 v1 = vertices[vertIndex1];
    final vec2 v2 = vertices[vertIndex2];

    // If the center is inside the polygon ...
    if (separation < Settings.EPSILON) {
      manifold.pointCount = 1;
      manifold.type = ManifoldType.FACE_A;

      vec2 norm = normals[normalIndex];
      manifold.localNormal.makeCopy(norm);
      manifold.localNormal.makeCopy(norm);
      manifold.localPoint = (v1 + v2).scale(0.5);
      ManifoldPoint mpoint = manifold.points[0];
      mpoint.localPoint.makeCopy(circle.position);
      mpoint.id.zero();
      return;
    }

    // Compute barycentric coordinates
    final vec2 temp = cLocal - v1;
    final vec2 temp2 = v2 - v1;
    final num u1 = temp.dot(temp2);

    final vec2 temp3 = cLocal - v2;
    final vec2 temp4 = v1 - v2;
    final num u2 = temp3.dot(temp4);

    if (u1 <= 0) {
      final vec2 d = cLocal - v1;
      if ( d.length2 > radius * radius)
        return;

      manifold.pointCount = 1;
      manifold.type = ManifoldType.FACE_A;
      manifold.localNormal.makeCopy(d);
      manifold.localNormal.normalize();
      manifold.localPoint.copyFrom(v1);
      manifold.points[0].localPoint.copyFrom(circle.position);
      manifold.points[0].id.zero();
    } else if (u2 <= 0.0) {
      final vec2 d = cLocal - v2;
      if (d.length2 > radius * radius)
        return;

      manifold.pointCount = 1;
      manifold.type = ManifoldType.FACE_A;
      manifold.localNormal.makeCopy(d);
      manifold.localNormal.normalize();
      manifold.localPoint.copyFrom(v2);
      manifold.points[0].localPoint.copyFrom(circle.position);
      manifold.points[0].id.zero();
    } else {
      // vec2 faceCenter = 0.5 * (v1 + v2);
      // (temp is faceCenter)
      final vec2 fc = (v1 + v2).scale(0.5);
      final vec2 t = cLocal - fc;
      final vec2 norm = normals[vertIndex1];
      separation = t.dot(norm);
      if (separation > radius)
        return;

      manifold.pointCount = 1;
      manifold.type = ManifoldType.FACE_A;
      manifold.localNormal.copyFrom(normals[vertIndex1]);
      manifold.localPoint.makeCopy(fc);
      manifold.points[0].localPoint.copyFrom(circle.position);
      manifold.points[0].id.zero();
    }
  }

  /**
   * Find the separation between poly1 and poly2 for a given edge normal on
   * poly1.
   */
  num edgeSeparation(PolygonShape poly1, Transform xf1, int edge1,
      PolygonShape poly2, Transform xf2) {
    final int count1 = poly1.vertexCount;
    final List<vec2> vertices1 = poly1.vertices;
    final List<vec2> normals1 = poly1.normals;

    final int count2 = poly2.vertexCount;
    final List<vec2> vertices2 = poly2.vertices;

    assert (0 <= edge1 && edge1 < count1);
    // Convert normal from poly1's frame into poly2's frame.
    final mat2 R = xf1.rotation;
    final vec2 v = normals1[edge1];
    final vec2 normal1World = R * v;
    final mat2 R1 = xf2.rotation;
    // TODO: cleanup
    final vec2 normal1 = new vec2(normal1World.x * R1.entry(0, 0) + normal1World.y * R1.entry(0, 1),
                                  normal1World.x * R1.entry(1, 0) + normal1World.y * R1.entry(1, 1));

    // Find support vertex on poly2 for -normal.
    int index = 0;
    num minDot = Settings.BIG_NUMBER;

    for (int i = 0; i < count2; ++i) {
      final vec2 a = vertices2[i];
      final num dot_ = a.dot(normal1);
      if (dot_ < minDot) {
        minDot = dot_;
        index = i;
      }
    }

    final vec2 v3 = vertices1[edge1];
    final vec2 v1 = xf1.position + R * v3;
    final vec2 v4 = vertices2[index];
    final vec2 v2 = xf2.position + R1 * v4 - v1;

    return v2.dot(normal1World);
  }

  /**
   * Find the max separation between poly1 and poly2 using edge normals from
   * poly1.
   */
  void findMaxSeparation(EdgeResults results, PolygonShape poly1, Transform xf1,
      PolygonShape poly2, Transform xf2) {
    int count1 = poly1.vertexCount;
    final List<vec2> normals1 = poly1.normals;
    vec2 v = poly2.centroid;

    final vec2 pred = xf2.position + xf2.rotation * v;
    final vec2 v1 = poly1.centroid;
    final vec2 temp = xf1.position + xf1.rotation * v1;
    final vec2 d = pred - temp;

    final mat2 R = xf1.rotation;
    // TODO: cleanup
    final vec2 dLocal1 = new vec2(d.x * R.entry(0, 0) + d.y * R.entry(0, 1),
                                  d.x * R.entry(1, 0) + d.y * R.entry(1, 1));

    // Find edge normal on poly1 that has the largest projection onto d.
    int edge = 0;
    num maxDot = Settings.SMALL_NUMBER;
    for (int i = 0; i < count1; i++) {
      final vec2 norm = normals1[i];
      num dot_ = norm.dot(dLocal1);
      if (dot_ > maxDot) {
        maxDot = dot_;
        edge = i;
      }
    }

    // Get the separation for the edge normal.
    num s = edgeSeparation(poly1, xf1, edge, poly2, xf2);

    // Check the separation for the previous edge normal.
    int prevEdge = edge - 1 >= 0 ? edge - 1 : count1 - 1;
    num sPrev = edgeSeparation(poly1, xf1, prevEdge, poly2, xf2);

    // Check the separation for the next edge normal.
    int nextEdge = edge + 1 < count1 ? edge + 1 : 0;
    num sNext = edgeSeparation(poly1, xf1, nextEdge, poly2, xf2);

    // Find the best edge and the search direction.
    int bestEdge;
    num bestSeparation;
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
    final List<vec2> normals1 = poly1.normals;

    int count2 = poly2.vertexCount;
    final List<vec2> vertices2 = poly2.vertices;
    final List<vec2> normals2 = poly2.normals;

    assert (0 <= edge1 && edge1 < count1);

    // Get the normal of the reference edge in poly2's frame.
    xf1.rotation.transformed(normals1[edge1], normal1);
    xf2.rotation.transposed().transform(normal1);

    // Find the incident edge on poly2.
    int index = 0;
    num minDot = Settings.BIG_NUMBER;
    for (int i = 0; i < count2; ++i) {
      num dot_ = dot(normal1, normals2[i]);
      if (dot_ < minDot) {
        minDot = dot_;
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
    num totalRadius = polyA.radius + polyB.radius;

    findMaxSeparation(results1, polyA, xfA, polyB, xfB);
    if (results1.separation > totalRadius)
      return;

    findMaxSeparation(results2, polyB, xfB, polyA, xfA);
    if (results2.separation > totalRadius)
      return;

    PolygonShape poly1; // reference polygon
    PolygonShape poly2; // incident polygon
    Transform xf1, xf2;
    int edge1; // reference edge
    int flip;
    num k_relativeTol = 0.98;
    num k_absoluteTol = 0.001;

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
    List<vec2> vertices1 = poly1.vertices;

    v11.copyFrom(vertices1[edge1]);
    v12.copyFrom(edge1 + 1 < count1 ? vertices1[edge1 + 1] : vertices1[0]);

    localTangent.copyFrom(v12).sub(v11);
    localTangent.normalize();

    // Vector localNormal = Cross(dv, 1.0);
    cross(localTangent, 1.0, localNormal);

    // Vector planePoint = 0.5 * (v11 + v12)
    planePoint.copyFrom(v11).add(v12).scale(.5);

    // Vector sideNormal = Mul(xf1.rotation, v12 - v11);
    xf1.rotation.transformed(localTangent, tangent);

    // Vector frontNormal = Cross(sideNormal, 1.0);
    cross(tangent, 1.0, normal);

    // v11 = Mul(xf1, v11);
    // v12 = Mul(xf1, v12);
    Transform.mulToOut(xf1, v11, v11);
    Transform.mulToOut(xf1, v12, v12);

    // Face offset
    num frontOffset = dot(normal, v11);

    // Side offsets, extended by polytope skin thickness.
    num sideOffset1 = -dot(tangent, v11) + totalRadius;
    num sideOffset2 = dot(tangent, v12) + totalRadius;

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

    if (np < 2)
      return;

    // Clip to negative box side 1
    np = clipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2);

    if (np < 2)
      return;

    // Now clipPoints2 contains the clipped points.
    manifold.localNormal.copyFrom(localNormal);
    manifold.localPoint.copyFrom(planePoint);

    int pointCount = 0;
    for (int i = 0; i < Settings.MAX_MANIFOLD_POINTS; ++i) {
      num separation = dot(normal, clipPoints2[i].v) - frontOffset;

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
  vec2 v;
  ContactID id;

  ClipVertex() :
    v = new vec2.zero(),
    id = new ContactID() { }

  void setFrom(ClipVertex cv){
    v.copyFrom(cv.v);
    id.setFrom(cv.id);
  }
}

/**
 * Class for returning edge results
 */
class EdgeResults {
  num separation;
  int edgeIndex;

  EdgeResults() :
    separation = 0,
    edgeIndex = 0 { }
}
