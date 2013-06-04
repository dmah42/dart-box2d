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
   * Return the distance between the two given vectors, but squared.
   */
  static double distanceSquared(Vector v1, Vector v2) {
    double dx = (v1.x - v2.x);
    double dy = (v1.y - v2.y);
    return dx * dx + dy * dy;
  }

  /**
   * Return the distance between the two given vectors.
   */
  static double distance(Vector v1, Vector v2) {
    return Math.sqrt(distanceSquared(v1, v2));
  }

  /** Returns the closest value to [a] that is in between [low] and [high] */
  static double clamp(double a, double low, double high) {
    return Math.max(low, Math.min(a, high));
  }

  /**
   * Given a value within the range specified by [fromMin] and [fromMax],
   * returns a value with the same relative position in the range specified
   * from [toMin] and [toMax]. For example, given a [val] of 2 in the
   * "from range" of 0-4, and a "to range" of 10-20, would return 15.
   */
  static double translateAndScale(double val, double fromMin, double fromMax,
                                  double toMin, double toMax) {
    final double mult = (val - fromMin) / (fromMax - fromMin);
    final double res = toMin + mult * (toMax - toMin);
    return res;
  }

  /** Convert from [deg] degrees to radians. */
  static double degToRad(double deg) => (Math.PI / 180.0) * deg;
  /** Convert from [rad] radians to degrees. */
  static double radToDeg(double rad) => (180.0 / Math.PI) * rad;
}
