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
  static const double TWO_PI = math.PI * 2.0;

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

  /** Solve [matrix]x = [b] without calculating the inverse of [matrix]. */
  static vec3 solve33(mat3 matrix, vec3 b) {
    vec3 col0 = matrix.getColumn(0);
    vec3 col1 = matrix.getColumn(1);
    vec3 col2 = matrix.getColumn(2);

    vec3 out = cross(col1, col2);
    num det = dot(col0, out);
    if (det != 0.0) det = 1.0 / det;

    out = cross(col1, col2);
    num x = det * dot(b, out);
    out = cross(b, col2);
    num y = det * dot(col0, out);
    out = cross(col1, b);
    num z = det * dot(col0, out);
    out.setValues(x, y, z);
    return out;
  }

  /** Solve [matrix]x = [b] without calculating the inverse of [matrix].
   *  [matrix] must be a 2x2 or 3x3 matrix, and in the latter case the top-left
   *  2x2 elements will be used. [b] must be a vec2. */
  static vec2 solve22(dynamic matrix, vec2 b) {
    assert(matrix is mat2 || matrix is mat3);
    double a11 = matrix.entry(0, 0);
    double a12 = matrix.entry(0, 1);
    double a21 = matrix.entry(1, 0);
    double a22 = matrix.entry(1, 1);
    double det = a11 * a22 - a12 * a21;
    if (det != 0.0) det = 1.0 / det;
    final vec2 out = new vec2(a22 * b.x - a12 * b.y, a11 * b.y - a21 * b.x);
    out.scale(det);
    return out;
  }
}
