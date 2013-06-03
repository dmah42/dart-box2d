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
  vec2 centerZero;
  final vec2 center;

  /** World angles. */
  double angleZero;
  double angle;

  /**
   * Constructs a new Sweep with centers initialized to the origin and angles
   * set to zero.
   */
  Sweep() :
    localCenter = new vec2.zero(),
    centerZero = new vec2.zero(),
    center = new vec2.zero(),
    angleZero = 0.0,
    angle = 0.0;

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
    localCenter.setFrom(other.localCenter);
    centerZero.setFrom(other.centerZero);
    center.setFrom(other.center);
    angleZero = other.angleZero;
    angle = other.angle;
  }

  void normalize() {
    double d = MathBox.TWO_PI * (angleZero / MathBox.TWO_PI).floor();
    angleZero -= d;
    angle -= d;
  }

  /**
   * Computes the interpolated transform at a specific time.
   * Time is the normalized time in [0,1].
   */
  void getTransform(Transform xf, double alpha) {
    assert(xf != null);

    xf.position = mix(centerZero, center, alpha);
    xf.rotation.setRotation(mix(angleZero, angle, alpha));

    // Shift to origin
    vec2 position_delta = xf.rotation * localCenter;
    xf.position.setFrom(xf.position - position_delta);
  }

  /**
   * Advances the sweep forward, resulting in a new initial state.
   * Time is the new initial time.
   */
  void advance(double time) {
    centerZero = mix(centerZero, center, time);
    angleZero = mix(angleZero, angle, time);
  }
}
