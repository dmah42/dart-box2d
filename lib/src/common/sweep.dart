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

class Sweep {
  /** Local center of mass position. */
  final vec2 localCenter;

  /** Center world positions. */
  final vec2 centerZero;
  final vec2 center;

  /** World angles. */
  num angleZero;
  num angle;

  /**
   * Constructs a new Sweep with centers initialized to the origin and angles
   * set to zero.
   */
  Sweep() :
    localCenter = new vec2.zero(),
    centerZero = new vec2.zero(),
    center = new vec2.zero(),
    angleZero = 0,
    angle = 0;

  /**
   * Constructs a new sweep that is a copy of the given Sweep.
   */
  Sweep.copy(Sweep other)
      : localCenter = new vec2.copy(other.localCenter),
        centerZero = new vec2.copy(other.centerZero),
        center = new vec2.copy(other.center),
        angleZero = other.angleZero,
        angle = other.angle;

  /**
   * Returns true if given object is equal to this sweep. Two sweeps are equal
   * if their fields are equal.
   */
  bool operator ==(other) {
    return localCenter == other.localCenter &&
           centerZero == other.centerZero &&
           center == other.center &&
           angleZero == other.angleZero &&
           angle == other.angle;
  }

  /**
   * Sets this Sweep equal to the given Sweep.
   */
  void setFrom(Sweep other) {
    localCenter.copyFrom(other.localCenter);
    centerZero.copyFrom(other.centerZero);
    center.copyFrom(other.center);
    angleZero = other.angleZero;
    angle = other.angle;
  }

  void normalize() {
    num d = MathBox.TWO_PI * (angleZero / MathBox.TWO_PI).floor();
    angleZero -= d;
    angle -= d;
  }

  /**
   * Computes the interpolated transform at a specific time.
   * Time is the normalized time in [0,1].
   */
  void getTransform(Transform xf, num alpha) {
    assert(xf != null);

    xf.position.x = (1.0 - alpha) * centerZero.x + alpha * center.x;
    xf.position.y = (1.0 - alpha) * centerZero.y + alpha * center.y;
    xf.rotation.setRotation((1.0 - alpha) * angleZero + alpha * angle);

    // Shift to origin
    xf.position.x -= xf.rotation.col0.x * localCenter.x + xf.rotation.col1.x
        * localCenter.y;
    xf.position.y -= xf.rotation.col0.y * localCenter.x + xf.rotation.col1.y
        * localCenter.y;
  }

  /**
   * Advances the sweep forward, resulting in a new initial state.
   * Time is the new initial time.
   */
  void advance(num time) {
    centerZero.x = (1 - time) * centerZero.x + time * center.x;
    centerZero.y = (1 - time) * centerZero.y + time * center.y;
    angleZero = (1 - time) * angleZero + time * angle;
  }
}
