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

/** Class for internal use by Distance.dart. */

part of box2d;

class Simplex {
  final SimplexVertex v1 = new SimplexVertex();
  final SimplexVertex v2 = new SimplexVertex();
  final SimplexVertex v3 = new SimplexVertex();
  final List<SimplexVertex> vertices = new List<SimplexVertex>(3);
  int count = 0;

  Simplex() {
    vertices[0] = v1;
    vertices[1] = v2;
    vertices[2] = v3;
  }

  /** Pooling. */
  final Vector2 e13 = new Vector2.zero();
  final Vector2 e23 = new Vector2.zero();
  final Vector2 e12 = new Vector2.zero();
  final Vector2 case2 = new Vector2.zero();
  final Vector2 case22 = new Vector2.zero();
  final Vector2 case3 = new Vector2.zero();
  final Vector2 case33 = new Vector2.zero();

  void readCache(SimplexCache cache, DistanceProxy proxyA,
      Transform transformA, DistanceProxy proxyB,
      Transform transformB) {
    assert (cache.count <= 3);

    // Copy data from cache.
    count = cache.count;

    for (int i = 0; i < count; ++i) {
      SimplexVertex v = vertices[i];
      v.indexA = cache.indexA[i];
      v.indexB = cache.indexB[i];
      Vector2 wALocal = proxyA.vertices[v.indexA];
      Vector2 wBLocal = proxyB.vertices[v.indexB];
      Transform.mulToOut(transformA, wALocal, v.wA);
      Transform.mulToOut(transformB, wBLocal, v.wB);
      v.w.setFrom(v.wB).sub(v.wA);
      v.a = 0.0;
    }

    // Compute the new simplex metric, if it is substantially different than
    // old metric then flush the simplex.
    if (count > 1) {
      double metric1 = cache.metric;
      double metric2 = getMetric();
      if (metric2 < 0.5 * metric1 || 2.0 * metric1 < metric2 || metric2 <
          Settings.EPSILON) {
        // Reset the simplex.
        count = 0;
      }
    }

    // If the cache is empty or invalid ...
    if (count == 0) {
      SimplexVertex v = vertices[0];
      v.indexA = 0;
      v.indexB = 0;
      Vector2 wALocal = proxyA.vertices[0];
      Vector2 wBLocal = proxyB.vertices[0];
      Transform.mulToOut(transformA, wALocal, v.wA);
      Transform.mulToOut(transformB, wBLocal, v.wB);
      v.w.setFrom(v.wB).sub(v.wA);
      count = 1;
    }
  }

  void writeCache(SimplexCache cache) {
    cache.metric = getMetric();
    cache.count = count;

    for (int i = 0; i < count; ++i) {
      cache.indexA[i] = (vertices[i].indexA);
      cache.indexB[i] = (vertices[i].indexB);
    }
  }

  void getSearchDirection(Vector2 out) {
    switch (count) {
      case 1:
        out.setFrom(v1.w).negate();
        return;
      case 2:
        e12.setFrom(v2.w).sub(v1.w);
        // use out for a temp variable real quick
        out.setFrom(v1.w).negate();
        double sgn = e12.cross(out);

        if (sgn > 0.0) {
          // Origin is left of e12.
          e12.scaleOrthogonalInto(1.0, out);
        } else {
          // Origin is right of e12.
          e12.scaleOrthogonalInto(1.0, out);
        }
        break;
      default:
        assert(false);
        out.setZero();
        return;
    }
  }


  /**
   * this returns pooled objects. don't keep or modify them
   */
  void getClosestPoint(Vector2 out) {
    switch (count) {
      case 0:
        assert(false);
        out.setZero();
        return;
      case 1:
        out.setFrom(v1.w);
        return;
      case 2:
        case22.setFrom(v2.w).scale(v2.a);
        case2.setFrom(v1.w).scale(v1.a).add(case22);
        out.setFrom(case2);
        return;
      case 3:
        out.setZero();
        return;
      default:
        assert(false);
        out.setZero();
        return;
    }
  }


  void getWitnessPoints(Vector2 pA, Vector2 pB) {
    switch (count) {
      case 0:
        assert(false);
        break;

      case 1:
        pA.setFrom(v1.wA);
        pB.setFrom(v1.wB);
        break;

      case 2:
        case2.setFrom(v1.wA).scale(v1.a);
        pA.setFrom(v2.wA).scale(v2.a).add(case2);
        case2.setFrom(v1.wB).scale(v1.a);
        pB.setFrom(v2.wB).scale(v2.a).add(case2);

        break;

      case 3:
        pA.setFrom(v1.wA).scale(v1.a);
        case3.setFrom(v2.wA).scale(v2.a);
        case33.setFrom(v3.wA).scale(v3.a);
        pA.add(case3).add(case33);
        pB.setFrom(pA);
        break;

      default:
        assert(false);
        break;
    }
  }

  double getMetric() {
    switch (count) {
      case 0:
        assert(false);
        return 0.0;

      case 1:
        return 0.0;

      case 2:
        return MathBox.distance(v1.w, v2.w);

      case 3:
        case3.setFrom(v2.w).sub(v1.w);
        case33.setFrom(v3.w).sub(v1.w);
        return case3.cross(case33);

      default:
        assert(false);
        return 0.0;
    }
  }

  /**
   * Solve a line segment using barycentric coordinates.
   */
  void solve2() {
    Vector2 w1 = v1.w;
    Vector2 w2 = v2.w;
    e12.setFrom(w2).sub(w1);

    // w1 region
    double d12_2 = -w1.dot(e12);
    if (d12_2 <= 0.0) {
      // a2 <= 0, so we clamp it to 0
      v1.a = 1.0;
      count = 1;
      return;
    }

    // w2 region
    double d12_1 = w2.dot(e12);
    if (d12_1 <= 0.0) {
      // a1 <= 0, so we clamp it to 0
      v2.a = 1.0;
      count = 1;
      v1.setFrom(v2);
      return;
    }

    // Must be in e12 region.
    double inv_d12 = 1.0 / (d12_1 + d12_2);
    v1.a = d12_1 * inv_d12;
    v2.a = d12_2 * inv_d12;
    count = 2;
  }

  /**
   * Solve a line segment using barycentric coordinates.<br/>
   * Possible regions:<br/>
   * - points[2]<br/>
   * - edge points[0]-points[2]<br/>
   * - edge points[1]-points[2]<br/>
   * - inside the triangle
   */
  void solve3() {
    Vector2 w1 = v1.w;
    Vector2 w2 = v2.w;
    Vector2 w3 = v3.w;

    // Edge12
    e12.setFrom(w2).sub(w1);
    double w1e12 = w1.dot(e12);
    double w2e12 = w2.dot(e12);
    double d12_1 = w2e12;
    double d12_2 = -w1e12;

    // Edge13
    e13.setFrom(w3).sub(w1);
    double w1e13 = w1.dot(e13);
    double w3e13 = w3.dot(e13);
    double d13_1 = w3e13;
    double d13_2 = -w1e13;

    // Edge23
    e23.setFrom(w3).sub(w2);
    double w2e23 = w2.dot(e23);
    double w3e23 = w3.dot(e23);
    double d23_1 = w3e23;
    double d23_2 = -w2e23;

    // Triangle123
    double n123 = e12.cross(e13);

    double d123_1 = n123 * w2.cross(w3);
    double d123_2 = n123 * w3.cross(w1);
    double d123_3 = n123 * w1.cross(w2);

    // w1 region
    if (d12_2 <= 0.0 && d13_2 <= 0.0) {
      v1.a = 1.0;
      count = 1;
      return;
    }

    // e12
    if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
      double inv_d12 = 1.0 / (d12_1 + d12_2);
      v1.a = d12_1 * inv_d12;
      v2.a = d12_2 * inv_d12;
      count = 2;
      return;
    }

    // e13
    if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
      double inv_d13 = 1.0 / (d13_1 + d13_2);
      v1.a = d13_1 * inv_d13;
      v3.a = d13_2 * inv_d13;
      count = 2;
      v2.setFrom(v3);
      return;
    }

    // w2 region
    if (d12_1 <= 0.0 && d23_2 <= 0.0) {
      v2.a = 1.0;
      count = 1;
      v1.setFrom(v2);
      return;
    }

    // w3 region
    if (d13_1 <= 0.0 && d23_1 <= 0.0) {
      v3.a = 1.0;
      count = 1;
      v1.setFrom(v3);
      return;
    }

    // e23
    if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
      double inv_d23 = 1.0 / (d23_1 + d23_2);
      v2.a = d23_1 * inv_d23;
      v3.a = d23_2 * inv_d23;
      count = 2;
      v1.setFrom(v3);
      return;
    }

    // Must be in triangle123
    double inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
    v1.a = d123_1 * inv_d123;
    v2.a = d123_2 * inv_d123;
    v3.a = d123_3 * inv_d123;
    count = 3;
  }
}
