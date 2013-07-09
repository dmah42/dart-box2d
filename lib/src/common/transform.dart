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

/**
 * A transform is a translation and a rotation. It represents the position and
 * orientation of rigid frames.
 */

part of box2d;

class Transform {
  /** The translation caused by a transform. */
  final Vector2 position;

  /** A matrix representing a rotation. */
  final Matrix2 rotation;

  /**
   * Constructs a new transform with a vector at the origin and no rotation.
   */
  Transform() : position = new Vector2.zero(), rotation = new Matrix2.zero();

  /**
   * Constructs a new transform equal to the given transform.
   */
  Transform.copy(Transform other)
      : position = new Vector2.copy(other.position),
        rotation = new Matrix2.copy(other.rotation);

  bool operator ==(other) {
    return position == other.position && rotation == other.rotation;
  }

  /**
   * Sets this transform with the given position and rotation.
   */
  void setFromPositionAndRotation(Vector2 argPosition, Matrix2 argRotation) {
    position.setFrom(argPosition);
    rotation.setFrom(argRotation);
  }

  /**
   * Sets this transform equal to the given transform.
   */
  void setFrom(Transform other) {
    position.setFrom(other.position);
    rotation.setFrom(other.rotation);
  }

  /**
   * Multiply the given transform and given vector and return a new Vector2 with
   * the result.
   */
  static Vector2 mul(Transform T, Vector2 v) {
    return new Vector2(T.position.x + T.rotation.entry(0,0) * v.x +
        T.rotation.entry(0,1) * v.y, T.position.y + T.rotation.entry(1,0) * v.x +
        T.rotation.entry(1,1) * v.y);
  }

  /**
   * Multiplies the given transform and the given vector and places the result
   * in the given out parameter.
   */
  static void mulToOut(Transform transform, Vector2 vector, Vector2 out) {
    assert(out != null);
    double tempY = transform.position.y + transform.rotation.entry(1,0) *
        vector.x + transform.rotation.entry(1,1) * vector.y;
    out.x = transform.position.x + transform.rotation.entry(0,0) * vector.x +
        transform.rotation.entry(0,1) * vector.y;
    out.y = tempY;
  }

  static void mulTransToOut(Transform T, Vector2 v, Vector2 out) {
    double v1x = v.x - T.position.x;
    double v1y = v.y - T.position.y;
    final double bx = T.rotation.entry(0,0);
    final double by = T.rotation.entry(1,0);
    final double b1x = T.rotation.entry(0,1);
    final double b1y = T.rotation.entry(1,1);
    double tempy = v1x * b1x + v1y * b1y;
    out.x = v1x * bx + v1y * by;
    out.y = tempy;
  }
}
