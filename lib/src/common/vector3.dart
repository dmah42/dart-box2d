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

/** A three dimensional vector. */

part of box2d;

class Vector3 {
  final _f = new Float64List(3);
  static const int X = 0;
  static const int Y = 1;
  static const int Z = 2;

  Vector3(double x, double y, double z) {
    _f[X] = x;
    _f[Y] = y;
    _f[Z] = z;
  }

  Vector3.zero() {
    _f[X] = _f[Y] = _f[Z] = 0.0;
  }

  Vector3.copy(Vector3 argCopy) {
    _f[X] = argCopy.x;
    _f[Y] = argCopy.y;
    _f[Z] = argCopy.z;
  }

  double get x => _f[X];
  double get y => _f[Y];
  double get z => _f[Z];

  set x(double v) { _f[X] = v; }
  set y(double v) { _f[Y] = v; }
  set z(double v) { _f[Z] = v; }

  bool operator ==(other) {
    return other is Vector3 && x == other.x && _f[Y] == other.y && _f[Z] == other.z;
  }

  /** Sets this vector equal to the given vector. */
  Vector3 setFrom(Vector3 argVec) {
    _f[X] = argVec._f[X];
    _f[Y] = argVec._f[Y];
    _f[Z] = argVec._f[Z];
    return this;
  }

  /** Sets the vectors coordinate values to those given. */
  Vector3 setCoords(double argX, double argY, double argZ) {
    _f[X] = argX;
    _f[Y] = argY;
    _f[Z] = argZ;
    return this;
  }

  Vector3 addLocal(Vector3 argVec) {
    _f[X] += argVec._f[X];
    _f[Y] += argVec._f[Y];
    _f[Z] += argVec._f[Z];
    return this;
  }

  Vector3 add(Vector3 argVec) =>
      new Vector3(_f[X] + argVec._f[X], _f[Y] + argVec._f[Y], _f[Z] + argVec._f[Z]);

  Vector3 subLocal(Vector3 argVec) {
    _f[X] -= argVec._f[X];
    _f[Y] -= argVec._f[Y];
    _f[Z] -= argVec._f[Z];
    return this;
  }

  Vector3 sub(Vector3 argVec) =>
      new Vector3(_f[X] - argVec._f[X], _f[Y] - argVec._f[Y], _f[Z] - argVec._f[Z]);

  Vector3 mulLocal(double argScalar) {
    _f[X] *= argScalar;
    _f[Y] *= argScalar;
    _f[Z] *= argScalar;
    return this;
  }

  Vector3 mul(double argScalar) =>
      new Vector3(_f[X] * argScalar, _f[Y] * argScalar, _f[Z] * argScalar);

  Vector3 negateLocal() {
    _f[X] = -_f[X];
    _f[Y] = -_f[Y];
    _f[Z] = -_f[Z];
    return this;
  }

  void setZero() {
    _f[X] = _f[Y] = _f[Z] = 0.0;
  }

  String toString() => "($x, $y, $z)";

  static double dot(Vector3 a, Vector3 b) => a.x * b.x + a.y * b.y + a.z * b.z;

  static Vector3 cross(Vector3 a, Vector3 b) =>
      new Vector3(a.y * b.z - a.z * b.y,
                  a.z * b.x - a.x * b.z,
                  a.x * b.y - a.y * b.x);

  static void crossToOut(Vector3 a, Vector3 b, Vector3 out) {
    final double tempy = a.z * b.x - a.x * b.z;
    final double tempz = a.x * b.y - a.y * b.x;
    out._f[X] = a.y * b.z - a.z * b.y;
    out._f[Y] = tempy;
    out._f[Z] = tempz;
  }
}
