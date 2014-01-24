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

  int get hashCode {
    int result = 17;
    result = 37 * result + position.x.hashCode;
    result = 37 * result + position.y.hashCode;
    result = 37 * result + rotation.entry(0, 0).hashCode;
    result = 37 * result + rotation.entry(0, 1).hashCode;
    result = 37 * result + rotation.entry(1, 0).hashCode;
    result = 37 * result + rotation.entry(1, 1).hashCode;
    return result;
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
    return T.position + T.rotation * v;
  }

  /**
   * Multiplies the given transform and the given vector and places the result
   * in the given out parameter.
   */
  static void mulToOut(Transform transform, Vector2 vector, Vector2 out) {
    assert(out != null);
    final Vector2 v1 = mul(transform, vector);
    // Set values, don't copy the reference.
    out.x = v1.x;
    out.y = v1.y;
  }

  static void mulTransToOut(Transform T, Vector2 v, Vector2 out) {
    final Vector2 v1 = v - T.position;
    final Vector2 b = T.rotation.getColumn(0);
    final Vector2 b1 = T.rotation.getColumn(1);
    double tempy = v1.dot(b1);
    out.x = v1.dot(b);
    out.y = tempy;
  }
}
