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

/** A 2-dimensional vector class. */
//TODO(gregbglw): Consider if/how should reconcile this with touch/vector.

part of box2d;

class Vector2 {
  final _f = new Float64List(2);
  static const int X = 0;
  static const int Y = 1;

  Vector2(double x, double y) {
    _f[X] = x;
    _f[Y] = y;
  }

  Vector2.zero() {
    _f[X] = 0.0;
    _f[Y] = 0.0;
  }

  /**
   * Constructs a new vector with the same coordinates as the given vector.
   */
  Vector2.copy(Vector2 other) {
    _f[X] = other._f[X];
    _f[Y] = other._f[Y];
  }

  double get x => _f[X];
  double get y => _f[Y];

  set x(double v) { _f[X] = v; }
  set y(double v) { _f[Y] = v; }

  /**
   * Returns true if given object is a Vector2 with the same x and y values as
   * this vector. Returns false otherwise.
   */
  bool operator ==(other) => x == other.x && y == other.y;

  /**
   * Update the current vector by adding v.
   */
  Vector2 addLocal(Vector2 v) {
    _f[X] += v._f[X];
    _f[Y] += v._f[Y];
    return this;
  }

  /**
   * Subtracts the given vector from this vector.
   */
  Vector2 subLocal(Vector2 other) {
    _f[X] -= other._f[X];
    _f[Y] -= other._f[Y];
    return this;
  }

  Vector2 setCoords(double xCoord, double yCoord) {
    _f[X] = xCoord;
    _f[Y] = yCoord;
    return this;
  }

  /** Return the cross product of the twe given vectors. */
  static double crossVectors(Vector2 v1, Vector2 v2) => (v1.x * v2.y - v1.y * v2.x);

  /** Return the dot product of the two given vectors. */
  static double dot(Vector2 one, Vector2 two) => (one.x * two.x + one.y * two.y);

  /**
   * Has the effect of swapping the x and y coordinates of the vector,
   * multiplying both by the given number, and then flipping the sign of the new
   * x coordinate. Returns the result through the out parameter.
   */
  static void crossNumAndVectorToOut(double s, Vector2 a, Vector2 out) {
    double tempY = s * a._f[X];
    out._f[X] = -s * a._f[Y];
    out._f[Y] = tempY;
  }

  /**
   * Has the effect of swapping the x and y coordinates of the vector,
   * multiplying both by the given number, and then flipping the sign of the new
   * y coordinate. Returns the result through the out parameter.
   */
  static void crossVectorAndNumToOut(Vector2 a, double s, Vector2 out) {
    double tempy = -s * a._f[X];
    out._f[X] = s * a._f[Y];
    out._f[Y] = tempy;
  }

  /**
   * Sets this vector to be a copy of the given vector.
   */
  Vector2 setFrom(Vector2 v) {
    _f[X] = v._f[X];
    _f[Y] = v._f[Y];
    return this;
  }

  /**
   * Multiplies this vector by the given number.
   */
  Vector2 mulLocal(double d) {
    _f[X] *= d;
    _f[Y] *= d;
    return this;
  }

  Vector2 setZero() {
    _f[X] = _f[Y] = 0.0;
    return this;
  }

  double get length => Math.sqrt(this.lengthSquared);

  /**
   * Take the minimum of each coordinate from the two given vectors and store
   * the result in the given out vector.
   */
  static void minToOut(Vector2 a, Vector2 b, Vector2 out) {
    out._f[X] = a.x < b.x ? a.x : b.x;
    out._f[Y] = a.y < b.y ? a.y : b.y;
  }

  /**
   * Take the maximum of each coordinate from the two given vectors and store
   * the result in the given out vector.
   */
  static void maxToOut(Vector2 a, Vector2 b, Vector2 out) {
    out._f[X] = a.x > b.x ? a.x : b.x;
    out._f[Y] = a.y > b.y ? a.y : b.y;
  }

  /**
   * Returns the length of this vector, squared.
   */
  double get lengthSquared => x * x + y * y;

  /**
   * Set the x and y coordinates of this vector to absolute values.
   */
  void absLocal() {
    _f[X] = _f[X].abs();
    _f[Y] = _f[Y].abs();
  }

  /**
   * Normalizes this vector and returns the length before normalization.
   */
  double normalize() {
    double len = length;
    if (len < Settings.EPSILON) {
      return 0.0;
    }

    double invLength = 1.0 / len;
    _f[X] *= invLength;
    _f[Y] *= invLength;
    return len;
  }

  /**
   * Returns the distance between the point defined by this vector and the given
   * vector.
   */
  double distanceBetween(Vector2 v) {
    double xDelta = x - v.x;
    double yDelta = y - v.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
  }

  /**
   * Returns a vector that is the result of rotating the original vector by
   * angle degrees counter-clockwise.
   */
  Vector2 rotate(double angle) {
    Matrix22 mtx = new Matrix22();
    mtx.setAngle(angle);
    Vector2 temp = new Vector2.zero();
    mtx.multiplyVectorToOut(this, temp);
    return temp;
  }

  /** Flips this vector such that the +/- of each x and y are reversed. */
  Vector2 negateLocal() {
    _f[X] = -_f[X];
    _f[Y] = -_f[Y];
    return this;
  }

  /** Returns if the values of coordinates within the MAX_INTEGER. */
  bool isValid() => !x.isInfinite && !x.isNaN && !y.isInfinite && !y.isNaN;

  /** Returns a String representation of the given vector. */
  String toString() => "($x, $y)";
}
