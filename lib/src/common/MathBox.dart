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
}
