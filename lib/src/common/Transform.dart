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
  final vec2 position;

  /** A matrix representing a rotation. */
  final mat2 rotation;

  /**
   * Constructs a new transform with a vector at the origin and no rotation.
   */
  Transform() : position = new vec2(), rotation = new mat2();

  /**
   * Constructs a new transform equal to the given transform.
   */
  Transform.copy(Transform other)
      : position = new vec2.copy(other.position),
        rotation = new mat2.copy(other.rotation);

  bool operator ==(other) {
    return position == other.position && rotation == other.rotation;
  }

  /**
   * Sets this transform with the given position and rotation.
   */
  void setFromPositionAndRotation(vec2 argPosition, mat2 argRotation) {
    position.copyFrom(argPosition);
    rotation.copyFrom(argRotation);
  }

  /**
   * Sets this transform equal to the given transform.
   */
  void setFrom(Transform other) {
    position.copyFrom(other.position);
    rotation.copyFrom(other.rotation);
  }

  /**
   * Multiply the given transform and given vector and return a new vec2 with
   * the result.
   */
  static vec2 mul(Transform T, vec2 v) {
    return new vec2(T.position.x + T.rotation.col0.x * v.x +
        T.rotation.col1.x * v.y, T.position.y + T.rotation.col0.y * v.x +
        T.rotation.col1.y * v.y);
  }

  /**
   * Multiplies the given transform and the given vector and places the result
   * in the given out parameter.
   */
  static void mulToOut(Transform transform, vec2 vector, vec2 out) {
    assert(out != null);
    num tempY = transform.position.y + transform.rotation.col0.y *
        vector.x + transform.rotation.col1.y * vector.y;
    out.x = transform.position.x + transform.rotation.col0.x * vector.x +
        transform.rotation.col1.x * vector.y;
    out.y = tempY;
  }

  static void mulTransToOut(Transform T, vec2 v, vec2 out) {
    vec2 v1 = v - T.position;
    vec2 b = T.rotation.col0;
    vec2 b1 = T.rotation.col1;
    num tempy = v1.x * b1.x + v1.y * b1.y;
    out.x = v1.x * b.x + v1.y * b.y;
    out.y = tempy;
  }
}
