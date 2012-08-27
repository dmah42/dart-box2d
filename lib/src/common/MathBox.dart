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

part of box2d;

class MathBox {
  static const double TWO_PI = Math.PI * 2.0;

  MathBox();

  /**
   * Given a value within the range specified by [fromMin] and [fromMax],
   * returns a value with the same relative position in the range specified
   * from [toMin] and [toMax]. For example, given a [val] of 2 in the
   * "from range" of 0-4, and a "to range" of 10-20, would return 15.
   */
  static num translateAndScale(num val, num fromMin, num fromMax, num toMin,
      num toMax) {
    final num mult = (val - fromMin) / (fromMax - fromMin);
    final num res = toMin + mult * (toMax - toMin);
    return res;
  }

  // Solve Ax = b without calculating the inverse of A.
  static vec3 solve33(mat3 A, vec3 b) {
    vec3 out = cross(A.col1, A.col2);
    num det = dot(A.col0, out);
    if (det != 0.0) det = 1.0 / det;

    out = cross(A.col1, A.col2);
    num x = det * dot(b, out);
    out = cross(b, A.col2);
    num y = det * dot(A.col0, out);
    out = cross(A.col1, b);
    num z = det * dot(A.col0, out);
    out.setComponents(x, y, z);
    return out;
  }

  // Solve Ax = b without calculating the inverse of A.
  static vec2 solve22(Dynamic A, vec2 b) {
    assert(A is mat2 || A is mat3);
    num a11 = A.col0.x, a12 = A.col1.x, a21 = A.col0.y, a22 = A.col1.y;
    num det = a11 * a22 - a12 * a21;
    if (det != 0.0) det = 1.0 / det;
    final vec2 out = new vec2(a22 * b.x - a12 * b.y, a11 * b.y - a21 * b.x);
    out.scale(det);
    return out;
  }
}
