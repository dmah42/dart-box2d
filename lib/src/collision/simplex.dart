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
  final List<SimplexVertex> vertices;
  int count;

  Simplex() :
    count = 0,
    vertices = new List<SimplexVertex>.generate(3, (i) => new SimplexVertex()),
    e13 = new vec2.zero(),
    e12 = new vec2.zero(),
    e23 = new vec2.zero(),
    case2 = new vec2.zero(),
    case22 = new vec2.zero(),
    case3 = new vec2.zero(),
    case33 = new vec2.zero();

  /** Pooling. */
  final vec2 e13;
  final vec2 e23;
  final vec2 e12;
  final vec2 case2;
  final vec2 case22;
  final vec2 case3;
  final vec2 case33;

  void readCache(SimplexCache cache, DistanceProxy proxyA,
                  Transform transformA, DistanceProxy proxyB,
                  Transform transformB) {
    assert(cache.count <= 3);

    // Copy data from cache.
    count = cache.count;

    for (int i = 0; i < count; ++i) {
      SimplexVertex v = vertices[i];
      v.indexA = cache.indexA[i];
      v.indexB = cache.indexB[i];
      vec2 wALocal = proxyA.vertices[v.indexA];
      vec2 wBLocal = proxyB.vertices[v.indexB];
      Transform.mulToOut(transformA, wALocal, v.wA);
      Transform.mulToOut(transformB, wBLocal, v.wB);
      v.w.setFrom(v.wB).sub(v.wA);
      v.a = 0.0;
    }

    // Compute the new simplex metric, if it is substantially different than
    // old metric then flush the simplex.
    if (count > 1) {
      num metric1 = cache.metric;
      num metric2 = getMetric();
      if (metric2 < 0.5 * metric1 ||
          2.0 * metric1 < metric2 ||
          metric2 < Settings.EPSILON) {
        // Reset the simplex.
        count = 0;
      }
    }

    // If the cache is empty or invalid ...
    if (count == 0) {
      SimplexVertex v = vertices[0];
      v.indexA = 0;
      v.indexB = 0;
      vec2 wALocal = proxyA.vertices[0];
      vec2 wBLocal = proxyB.vertices[0];
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
      cache.indexA[i] = vertices[i].indexA;
      cache.indexB[i] = vertices[i].indexB;
    }
  }

  void getSearchDirection(vec2 out) {
    switch (count) {
      case 1:
        out.setFrom(vertices[0].w).negate();
        break;
      case 2:
        e12.setFrom(vertices[1].w).sub(vertices[0].w);
        // use out for a temp variable real quick
        out.setFrom(vertices[0].w).negate();
        num sgn = cross(e12, out);

        if (sgn > 0) {
          // Origin is left of e12.
          out = cross(1.0, e12);
        } else {
          // Origin is right of e12.
          out = cross(e12, 1.0);
        }
        break;
      default:
        assert(false);
        break;
    }
  }


  /**
   * this returns pooled objects. don't keep or modify them
   */
  void getClosestPoint(vec2 out) {
    switch (count) {
      case 0:
        assert(false);
        break;
      case 1:
        out.setFrom(vertices[0].w);
        break;
      case 2:
        case22.setFrom(vertices[1].w).scale(vertices[1].a);
        case2.setFrom(vertices[0].w).scale(vertices[0].a).add(case22);
        out.setFrom(case2);
        break;
      case 3:
        out.splat(0.0);
        break;
      default :
        assert(false);
        break;
    }
  }


  void getWitnessPoints(vec2 pA, vec2 pB) {
    switch (count) {
      case 0:
        assert(false);
        break;
      case 1:
        pA.setFrom(vertices[0].wA);
        pB.setFrom(vertices[0].wB);
        break;
      case 2 :
        case2.setFrom(vertices[0].wA).scale(vertices[0].a);
        pA.setFrom(vertices[1].wA).scale(vertices[1].a).add(case2);
        case2.setFrom(vertices[0].wB).scale(vertices[0].a);
        pB.setFrom(vertices[1].wB).scale(vertices[1].a).add(case2);
        break;

      case 3 :
        pA.setFrom(vertices[0].wA).scale(vertices[0].a);
        case3.setFrom(vertices[1].wA).scale(vertices[1].a);
        case33.setFrom(vertices[2].wA).scale(vertices[2].a);
        pA.add(case3).add(case33);
        pB.setFrom(pA);
        break;

      default :
        assert(false);
        break;
    }
  }

  num getMetric() {
    switch (count) {
      case 0:
        assert(false);
        break;

      case 1:
        return 0.0;

      case 2:
        return distance(vertices[0].w, vertices[1].w);

      case 3:
        case3.setFrom(vertices[1].w).sub(vertices[0].w);
        case33.setFrom(vertices[2].w).sub(vertices[0].w);
        return cross(case3, case33);

      default:
        assert(false);
        break;
    }
  }

  /** Solve a line segment using barycentric coordinates. */
  void solve2() {
    vec2 w1 = vertices[0].w;
    vec2 w2 = vertices[1].w;
    e12.setFrom(w2).sub(w1);

    // w1 region
    num d12_2 = -dot(w1, e12);
    if (d12_2 <= 0.0) {
      // a2 <= 0, so we clamp it to 0
      vertices[0].a = 1.0;
      count = 1;
      return;
    }

    // w2 region
    num d12_1 = dot(w2, e12);
    if (d12_1 <= 0.0) {
      // a1 <= 0, so we clamp it to 0
      vertices[1].a = 1.0;
      count = 1;
      vertices[0].setFrom(vertices[1]);
      return;
    }

    // Must be in e12 region.
    num inv_d12 = 1.0 / (d12_1 + d12_2);
    vertices[0].a = d12_1 * inv_d12;
    vertices[1].a = d12_2 * inv_d12;
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
    vec2 w1 = vertices[0].w;
    vec2 w2 = vertices[1].w;
    vec2 w3 = vertices[2].w;

    // Edge12
    e12.setFrom(w2).sub(w1);
    num w1e12 = dot(w1, e12);
    num w2e12 = dot(w2, e12);
    num d12_1 = w2e12;
    num d12_2 = -w1e12;

    // Edge13
    e13.setFrom(w3).sub(w1);
    num w1e13 = dot(w1, e13);
    num w3e13 = dot(w3, e13);
    num d13_1 = w3e13;
    num d13_2 = -w1e13;

    // Edge23
    e23.setFrom(w3).sub(w2);
    num w2e23 = dot(w2, e23);
    num w3e23 = dot(w3, e23);
    num d23_1 = w3e23;
    num d23_2 = -w2e23;

    // Triangle123
    num n123 = cross(e12, e13);

    num d123_1 = n123 * cross(w2, w3);
    num d123_2 = n123 * cross(w3, w1);
    num d123_3 = n123 * cross(w1, w2);

    // w1 region
    if (d12_2 <= 0.0 && d13_2 <= 0.0) {
      vertices[0].a = 1.0;
      count = 1;
      return;
    }

    // e12
    if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
      num inv_d12 = 1.0 / (d12_1 + d12_2);
      vertices[0].a = d12_1 * inv_d12;
      vertices[1].a = d12_2 * inv_d12;
      count = 2;
      return;
    }

    // e13
    if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
      num inv_d13 = 1.0 / (d13_1 + d13_2);
      vertices[0].a = d13_1 * inv_d13;
      vertices[2].a = d13_2 * inv_d13;
      count = 2;
      vertices[1].setFrom(vertices[2]);
      return;
    }

    // w2 region
    if (d12_1 <= 0.0 && d23_2 <= 0.0) {
      vertices[1].a = 1.0;
      count = 1;
      vertices[0].setFrom(vertices[1]);
      return;
    }

    // w3 region
    if (d13_1 <= 0.0 && d23_1 <= 0.0) {
      vertices[2].a = 1.0;
      count = 1;
      vertices[0].setFrom(vertices[2]);
      return;
    }

    // e23
    if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
      num inv_d23 = 1.0 / (d23_1 + d23_2);
      vertices[1].a = d23_1 * inv_d23;
      vertices[2].a = d23_2 * inv_d23;
      count = 2;
      vertices[0].setFrom(vertices[2]);
      return;
    }

    // Must be in triangle123
    num inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
    vertices[0].a = d123_1 * inv_d123;
    vertices[1].a = d123_2 * inv_d123;
    vertices[2].a = d123_3 * inv_d123;
    count = 3;
  }
}
