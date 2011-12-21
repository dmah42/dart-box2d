/*******************************************************************************
 * Copyright (c) 2011, Daniel Murphy
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 	* Redistributions of source code must retain the above copyright notice,
 * 	  this list of conditions and the following disclaimer.
 * 	* Redistributions in binary form must reproduce the above copyright notice,
 * 	  this list of conditions and the following disclaimer in the documentation
 * 	  and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 ******************************************************************************/

/**
 * A transform is a translation and a rotation. It represents the position and
 * orientation of rigid frames.
 */
class Transform {
  /** The translation caused by a transform. */
  final Vector position;

  /** A matrix representing a rotation. */
  final Matrix22 rotation;

  /**
   * Constructs a new transform with a vector at the origin and no rotation.
   */
  Transform() :
    position = new Vector(),
    rotation = new Matrix22() { }

  /**
   * Constructs a new transform equal to the given transform.
   */
  Transform.copy(Transform other) :
    position = new Vector.copy(other.position),
    rotation = new Matrix22.copy(other.rotation) { }

  bool operator == (other) {
    if (other == null) {
      return false;
    } else {
      return position == other.position && rotation == other.rotation;
    }
  }

  /**
   * Sets this transform with the given position and rotation.
   */
  void setFromPositionAndRotation(Vector argPosition,
      Matrix22 argRotation) {
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
   * Multiply the given transform and given vector and return a new Vector with
   * the result.
   */
  static Vector mul(Transform T, Vector v) {
    return new Vector(T.position.x + T.rotation.col1.x * v.x +
        T.rotation.col2.x * v.y, T.position.y + T.rotation.col1.y * v.x +
        T.rotation.col2.y * v.y);
  }

  /**
   * Multiplies the given transform and the given vector and places the result
   * in the given out parameter.
   */
  static void mulToOut(Transform transform, Vector vector, Vector out) {
    assert(out != null);
    num tempY = transform.position.y + transform.rotation.col1.y *
        vector.x + transform.rotation.col2.y * vector.y;
    out.x = transform.position.x + transform.rotation.col1.x * vector.x +
        transform.rotation.col2.x * vector.y;
    out.y = tempY;
  }

  static void mulTransToOut(Transform T, Vector v, Vector out) {
    num v1x = v.x - T.position.x;
    num v1y = v.y - T.position.y;
    Vector b = T.rotation.col1;
    Vector b1 = T.rotation.col2;
    num tempy = v1x * b1.x + v1y * b1.y;
    out.x = v1x * b.x + v1y * b.y;
    out.y = tempy;
  }
}
