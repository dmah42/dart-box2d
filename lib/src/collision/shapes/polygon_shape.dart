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
 * Convex Polygon Shape. Create using Body.createShape(ShapeDef) rather than the
 * constructor here, which is off-limits to the likes of you.
 */

part of box2d;

class PolygonShape extends Shape {
  /**
   * Local position of the shape centroid in parent body frame.
   */
  final vec2 centroid;

  /**
   * The vertices of the shape. Note: Use getVertexCount() rather than
   * vertices.length to get the number of active vertices.
   */
  final List<vec2> vertices;

  /**
   * The normals of the shape. Note: Use getVertexCount() rather than
   * normals.length to get the number of active normals.
   */
  final List<vec2> normals;

  int vertexCount;

  /**
   * Constructs a new PolygonShape.
   */
  PolygonShape() :
      super(ShapeType.POLYGON, Settings.POLYGON_RADIUS),
      vertexCount = 0,
      vertices = new List<vec2>.generate(
          Settings.MAX_POLYGON_VERTICES, (i) => new vec2.zero()),
      normals = new List<vec2>.generate(
          Settings.MAX_POLYGON_VERTICES, (i) => new vec2.zero()),
      centroid = new vec2.zero();

  /**
   * Constructs a new PolygonShape equal to the given shape.
   */
  PolygonShape.copy(PolygonShape other) :
      super(ShapeType.POLYGON, other.radius),
      vertexCount = other.vertexCount,
      vertices = new List<vec2>(Settings.MAX_POLYGON_VERTICES),
      normals = new List<vec2>(Settings.MAX_POLYGON_VERTICES),
      centroid = new vec2.copy(other.centroid) {
    // Copy the vertices and normals from the other polygon shape.
    for (int i = 0; i < other.vertices.length; ++i)
      vertices[i] = new vec2.copy(other.vertices[i]);

    for (int i = 0; i < other.normals.length; ++i)
      normals[i] = new vec2.copy(other.normals[i]);
  }

  /**
   * Get the supporting vertex index in the given direction.
   */
  int getSupport(vec2 d) {
    int bestIndex = 0;
    double bestValue = dot(vertices[0], d);
    for (int i = 1; i < vertexCount; ++i) {
      double value = dot(vertices[i], d);
      if (value > bestValue) {
        bestIndex = i;
        bestValue = value;
      }
    }
    return bestIndex;
  }

  Shape clone() => new PolygonShape.copy(this);

  /**
   * Get the supporting vertex in the given direction.
   */
  vec2 getSupportVertex(vec2 d) => vertices[getSupport(d)];

  /**
   * Copy vertices. This assumes the vertices define a convex polygon.
   * It is assumed that the exterior is the the right of each edge.
   * TODO(dominich): Consider removing [count].
   */
  void setFrom(List<vec2> otherVertices, int count) {
    assert (2 <= count && count <= Settings.MAX_POLYGON_VERTICES);
    vertexCount = count;

    // Copy vertices.
    for (int i = 0; i < vertexCount; ++i) {
      assert(vertices[i] != null);
      vertices[i].copyFrom(otherVertices[i]);
    }

    vec2 edge = new vec2.zero();

    // Compute normals. Ensure the edges have non-zero length.
    for (int i = 0; i < vertexCount; ++i) {
      final int i1 = i;
      final int i2 = i + 1 < vertexCount ? i + 1 : 0;
      edge.copyFrom(vertices[i2]).sub(vertices[i1]);

      assert (edge.length2 > Settings.EPSILON * Settings.EPSILON);
      cross(edge, 1, normals[i]);
      normals[i].normalize();
    }

    // Compute the polygon centroid.
    computeCentroidToOut(vertices, vertexCount, centroid);
  }

  /**
   * Build vertices to represent an axis-aligned box.
   * hx is the half-width of the body and hy is the half height.
   */
  void setAsBox(num hx, num hy) {
    vertexCount = 4;
    vertices[0].setComponents(-hx, -hy);
    vertices[1].setComponents(hx, -hy);
    vertices[2].setComponents(hx, hy);
    vertices[3].setComponents(-hx, hy);
    normals[0].setComponents(0.0, -1.0);
    normals[1].setComponents(1.0, 0.0);
    normals[2].setComponents(0.0, 1.0);
    normals[3].setComponents(-1.0, 0.0);
    centroid.splat(0.0);
  }

  /**
   * Build vertices to represent an oriented box. hx is the halfwidth, hy the
   * half-height, center is the center of the box in local coordinates and angle
   * is the rotation of the box in local coordinates.
   */
  void setAsBoxWithCenterAndAngle(num hx, num hy, vec2 center, num angle) {
    setAsBox(hx, hy);
    centroid.copyFrom(center);

    Transform xf = new Transform();
    xf.position.copyFrom(center);
    xf.rotation.setRotation(angle);

    // Transform vertices and normals.
    for (int i = 0; i < vertexCount; ++i) {
      Transform.mulToOut(xf, vertices[i], vertices[i]);
      xf.rotation.transform(normals[i]);
    }
  }

  /** Set this as a single edge. */
  void setAsEdge(vec2 v1, vec2 v2) {
    vertexCount = 2;
    vertices[0].copyFrom(v1);
    vertices[1].copyFrom(v2);
    centroid.copyFrom(v1).add(v2).scale(0.5);
    normals[0].copyFrom(v2).sub(v1);
    cross(normals[0], 1, normals[0]);
    normals[0].normalize();
    normals[1].copyFrom(normals[0]).negate();
  }

  /** See Shape.testPoint(Transform, vec2). */
  bool testPoint(Transform xf, vec2 p) {
    vec2 pLocal = (new vec2.copy(p)).sub(xf.position);
    xf.rotation.transposed().transform(pLocal);

    vec2 temp = new vec2.zero();

    for (int i = 0; i < vertexCount; ++i) {
      temp.copyFrom(pLocal).sub(vertices[i]);
      if (dot(normals[i], temp) > 0)
        return false;
    }

    return true;
  }

  /**
   * See Shape.computeAxisAlignedBox(AABB, Transform).
   */
  void computeAxisAlignedBox(AxisAlignedBox argAabb, Transform argXf) {
    final vec2 lower = new vec2.zero();
    final vec2 upper = new vec2.zero();
    final vec2 v = new vec2.zero();

    Transform.mulToOut(argXf, vertices[0], lower);
    upper.copyFrom(lower);

    for (int i = 1; i < vertexCount; ++i) {
      Transform.mulToOut(argXf, vertices[i], v);
      min(v, lower, lower);
      max(v, upper, upper);
    }

    argAabb.lowerBound.x = lower.x - radius;
    argAabb.lowerBound.y = lower.y - radius;
    argAabb.upperBound.x = upper.x + radius;
    argAabb.upperBound.y = upper.y + radius;
  }

  /**
   * Get a vertex by index.
   */
  vec2 getVertex(int index) => vertices[index];

  /**
   * Compute the centroid and store the value in the given out parameter.
   */
  void computeCentroidToOut(List<vec2> vs, int count, vec2 out) {
    assert (count >= 3);

    out.splat(0.0);
    num area = 0.0;

    if (count == 2) {
      out.copyFrom(vs[0]).add(vs[1]).scale(.5);
      return;
    }

    // pRef is the reference point for forming triangles.
    // It's location doesn't change the result (except for rounding error).
    final vec2 pRef = new vec2.zero();

    final vec2 e1 = new vec2.zero();
    final vec2 e2 = new vec2.zero();

    final num inv3 = 1.0 / 3.0;

    for (int i = 0; i < count; ++i) {
      // Triangle vertices.
      final vec2 p1 = pRef;
      final vec2 p2 = vs[i];
      final vec2 p3 = i + 1 < count ? vs[i + 1] : vs[0];

      e1.copyFrom(p2).sub(p1);
      e2.copyFrom(p3).sub(p1);

      final num triangleArea = 0.5 * cross(e1, e2);
      area += triangleArea;

      // Area weighted centroid
      out.add(p1).add(p2).add(p3).scale(triangleArea * inv3);
    }

    // Centroid
    assert (area > Settings.EPSILON);
    out.scale(1.0 / area);
  }

  /** See Shape.computeMass(MassData) */
  void computeMass(MassData massData, num density) {
    // Polygon mass, centroid, and inertia.
    // Let rho be the polygon density in mass per unit area.
    // Then:
    // mass = rho * int(dA)
    // centroid.x = (1/mass) * rho * int(x * dA)
    // centroid.y = (1/mass) * rho * int(y * dA)
    // I = rho * int((x*x + y*y) * dA)
    //
    // We can compute these integrals by summing all the integrals
    // for each triangle of the polygon. To evaluate the integral
    // for a single triangle, we make a change of variables to
    // the (u,v) coordinates of the triangle:
    // x = x0 + e1x * u + e2x * v
    // y = y0 + e1y * u + e2y * v
    // where 0 <= u && 0 <= v && u + v <= 1.
    //
    // We integrate u from [0,1-v] and then v from [0,1].
    // We also need to use the Jacobian of the transformation:
    // D = cross(e1, e2)
    //
    // Simplification: triangle centroid = (1/3) * (p1 + p2 + p3)
    //
    // The rest of the derivation is handled by computer algebra.

    assert (vertexCount >= 2);

    // A line segment has zero mass.
    if (vertexCount == 2) {
      // massData.center = 0.5 * (vertices[0] + vertices[1]);
      massData.center.copyFrom(vertices[0]).add(vertices[1]).scale(0.5);
      massData.mass = 0.0;
      massData.inertia = 0.0;
      return;
    }

    final vec2 center = new vec2.zero();
    num area = 0.0;
    num I = 0.0;

    // pRef is the reference point for forming triangles.
    // It's location doesn't change the result (except for rounding error).
    final vec2 pRef = new vec2.zero();

    final num k_inv3 = 1.0 / 3.0;

    final vec2 e1 = new vec2.zero();
    final vec2 e2 = new vec2.zero();

    for (int i = 0; i < vertexCount; ++i) {
      // Triangle vertices.
      final vec2 p1 = pRef;
      final vec2 p2 = vertices[i];
      final vec2 p3 = i + 1 < vertexCount ? vertices[i + 1] : vertices[0];

      e1.copyFrom(p2).sub(p1);
      e2.copyFrom(p3).sub(p1);

      final num D = cross(e1, e2);
      final num triangleArea = 0.5 * D;
      area += triangleArea;

      // Area weighted centroid
      center.x += triangleArea * k_inv3 * (p1.x + p2.x + p3.x);
      center.y += triangleArea * k_inv3 * (p1.y + p2.y + p3.y);

      final num px = p1.x;
      final num py = p1.y;
      final num ex1 = e1.x;
      final num ey1 = e1.y;
      final num ex2 = e2.x;
      final num ey2 = e2.y;

      final num intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) +
          (px * ex1 + px * ex2)) + 0.5 * px * px;
      final num inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) +
          (py * ey1 + py * ey2)) + 0.5 * py * py;

      I += D * (intx2 + inty2);
    }

    // Total mass
    massData.mass = density * area;

    // Center of mass
    assert (area > Settings.EPSILON);
    center.scale(1.0 / area);
    massData.center.copyFrom(center);

    // Inertia tensor relative to the local origin.
    massData.inertia = I * density;
  }

  /**
   * Get the centroid and apply the supplied transform.
   */
  vec2 applyTransformToCentroid(Transform xf) => Transform.mul(xf, centroid);

  /**
   * Get the centroid and apply the supplied transform. Return the result
   * through the return parameter out.
   */
  vec2 centroidToOut(Transform xf, vec2 out) {
    Transform.mulToOut(xf, centroid, out);
    return out;
  }
}
