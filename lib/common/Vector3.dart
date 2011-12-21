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

/** A three dimensional vector. */
class Vector3 {
  // Each vector is defined as the vector originating from (0,0) to the point
  // defined by these values.
  num x;
  num y;
  num z;

  Vector3([this.x = 0, this.y = 0, this.z = 0]) { }

  Vector3.copy(Vector3 argCopy) {
    x = argCopy.x;
    y = argCopy.y;
    z = argCopy.z;
  }

  bool operator == (other) {
    if (other != null && other is Vector3) {
      return x == other.x && y == other.y && z == other.z;
    } else {
      return false;
    }
  }

  /** Sets this vector equal to the given vector. */
  Vector3 setFrom(Vector3 argVec) {
    x = argVec.x;
    y = argVec.y;
    z = argVec.z;
    return this;
  }

  /** Sets the vectors coordinate values to those given. */
  Vector3 setCoords(num argX, num argY, num argZ) {
    x = argX;
    y = argY;
    z = argZ;
    return this;
  }

  Vector3 addLocal(Vector3 argVec) {
    x += argVec.x;
    y += argVec.y;
    z += argVec.z;
    return this;
  }

  Vector3 add(Vector3 argVec) {
    return new Vector3(x + argVec.x, y + argVec.y, z + argVec.z);
  }

  Vector3 subLocal(Vector3 argVec) {
    x -= argVec.x;
    y -= argVec.y;
    z -= argVec.z;
    return this;
  }

  Vector3 sub(Vector3 argVec) {
    return new Vector3(x - argVec.x, y - argVec.y, z - argVec.z);
  }

  Vector3 mulLocal(num argScalar) {
    x *= argScalar;
    y *= argScalar;
    z *= argScalar;
    return this;
  }

  Vector3 mul(num argScalar) {
    return new Vector3(x * argScalar, y * argScalar, z * argScalar);
  }

  Vector3 negateLocal() {
    x = -x;
    y = -y;
    z = -z;
    return this;
  }

  void setZero() {
    x = 0;
    y = 0;
    z = 0;
  }

  String toString() {
    return "(" + x + "," + y + "," + z + ")";
  }

  static num dot(Vector3 a, Vector3 b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  static Vector3 cross(Vector3 a, Vector3 b) {
    return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z,
        a.x * b.y - a.y * b.x);
  }

  static void crossToOut(Vector3 a, Vector3 b, Vector3 out) {
    final num tempy = a.z * b.x - a.x * b.z;
    final num tempz = a.x * b.y - a.y * b.x;
    out.x = a.y * b.z - a.z * b.y;
    out.y = tempy;
    out.z = tempz;
  }
}
