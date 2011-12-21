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
 * A 3-by-3 matrix. Stored in column-major order.
 */
class Matrix33 {
  final Vector3 col1;
  final Vector3 col2;
  final Vector3 col3;

  Matrix33() :
    col1 = new Vector3(),
    col2 = new Vector3(),
    col3 = new Vector3() { }

  Matrix33.setCols(Vector3 argCol1, Vector3 argCol2, Vector3 argCol3) :
    col1 = new Vector3.copy(argCol1),
    col2 = new Vector3.copy(argCol2),
    col3 = new Vector3.copy(argCol3) { }

  void setZero() {
    col1.setZero();
    col2.setZero();
    col3.setZero();
  }

  // Multiply a matrix times a vector.
  static Vector3 mul(Matrix33 A, Vector3 v){
    return new Vector3(v.x * A.col1.x + v.y * A.col2.x + v.z + A.col3.x,
        v.x * A.col1.y + v.y * A.col2.y + v.z * A.col3.y,
        v.x * A.col1.z + v.y * A.col2.z + v.z * A.col3.z);
  }

  static void mulToOut(Matrix33 A, Vector3 v, Vector3 out){
    final num tempy = v.x * A.col1.y + v.y * A.col2.y + v.z * A.col3.y;
    final num tempz = v.x * A.col1.z + v.y * A.col2.z + v.z * A.col3.z;
    out.x = v.x * A.col1.x + v.y * A.col2.x + v.z + A.col3.x;
    out.y = tempy;
    out.z = tempz;
  }

  /**
   * Solve A * x = b, where b is a column vector. This is more efficient
   * than computing the inverse in one-shot cases.
   */
  Vector solve22(Vector b) {
    Vector x = new Vector();
    solve22ToOut(b, x);
    return x;
  }

  /**
   * Solve A * x = b, where b is a column vector. This is more efficient
   * than computing the inverse in one-shot cases.
   */
  void solve22ToOut(Vector b, Vector out) {
    final num a11 = col1.x, a12 = col2.x, a21 = col1.y, a22 = col2.y;
    num det = a11 * a22 - a12 * a21;
    if (det != 0.0){
      det = 1.0 / det;
    }
    out.x = det * (a22 * b.x - a12 * b.y);
    out.y = det * (a11 * b.y - a21 * b.x);
  }

  /**
   * Solve A * x = b, where b is a column vector. This is more efficient
   * than computing the inverse in one-shot cases.
   */
  Vector3 solve33(Vector3 b) {
    Vector3 x = new Vector3();
    solve33ToOut(b, x);
    return x;
  }

  /**
   * Solve A * x = b, where b is a column vector. This is more efficient
   * than computing the inverse in one-shot cases.
   * out: the result
   */
  void solve33ToOut(Vector3 b, Vector3 out) {
    Vector3.crossToOut(col2, col3, out);
    num det = Vector3.dot(col1, out);
    if (det != 0.0){
      det = 1.0 / det;
    }

    Vector3.crossToOut(col2, col3, out);
    final num x = det * Vector3.dot(b, out);
    Vector3.crossToOut(b, col3, out);
    final num y = det * Vector3.dot(col1, out);
    Vector3.crossToOut(col2, b, out);
    num z = det * Vector3.dot(col1, out);
    out.x = x;
    out.y = y;
    out.z = z;
  }
}
