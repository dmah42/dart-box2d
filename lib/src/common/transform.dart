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
  vec2 position;

  /** A matrix representing a rotation. */
  final mat2 rotation;

  /**
   * Constructs a new transform with a vector at the origin and no rotation.
   */
  Transform()
      : position = new vec2.zero(),
        rotation = new mat2.zero();

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
   * Multiply the given transform [T] and given vector [v] and return a new vec2
   * with the result.
   */
  static vec2 mul(Transform T, vec2 v) {
    vec2 out = T.rotation * v;
    out += T.position;
    return out;
  }

  /**
   * Multiplies the given [transform] and the [vector] and places the result
   * in the [out] parameter.
   */
  static void mulToOut(Transform transform, vec2 vector, vec2 out) {
    // NOTE: This still creates a new vector.
    out.makeCopy(mul(transform, vector));
  }

  static void mulTransToOut(Transform T, vec2 v, vec2 out) {
    // NOTE: This still creates a new vector.
    out.makeCopy(T.rotation * (v - T.position));
  }
}
