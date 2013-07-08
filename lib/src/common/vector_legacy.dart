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

/**
 * The following functions previously were implementend as methods
 * in the Vector and Matrix classes.
 *
 * Since we use the vector_math library these methods are not available anymore.
 */


/**
 * Has the effect of swapping the x and y coordinates of the vector,
 * multiplying both by the given number, and then flipping the sign of the new
 * y coordinate. Returns the result through the out parameter.
 */
void Vector2_crossVectorAndNumToOut(Vector2 a, double s, Vector2 out) {
  double tempy = -s * a.x;
  out.x = s * a.y;
  out.y = tempy;
}

/**
 * Take the minimum of each coordinate from the two given vectors and store
 * the result in the given out vector.
 */
void Vector2_minToOut(Vector2 a, Vector2 b, Vector2 out) {
  out.x = Math.min(a.x, b.x);
  out.y = Math.min(a.y, b.y);
}

/**
 * Take the maximum of each coordinate from the two given vectors and store
 * the result in the given out vector.
 */
void Vector2_maxToOut(Vector2 a, Vector2 b, Vector2 out) {
  out.x = Math.max(a.x, b.x);
  out.y = Math.max(a.y, b.y);
}

void Matrix2_solveToOut(Matrix2 a, Vector2 b, Vector2 out) {
  final double a11 = a.getColumn(0).x;
  final double a12 = a.getColumn(1).x;
  final double a21 = a.getColumn(0).y;
  final double a22 = a.getColumn(1).y;
  double det = a11 * a22 - a12 * a21;

  if (det != 0.0){
    det = 1.0 / det;
  }
  final double tempy =  det * (a11 * b.y - a21 * b.x) ;
  out.x = det * (a22 * b.x - a12 * b.y);
  out.y = tempy;
}

/**
 * Solve A * x = b, where b is a column vector. This is more efficient
 * than computing the inverse in one-shot cases.
 */
void Matrix3_solve22ToOut(Matrix3 a, Vector2 b, Vector2 out) {
  final double a11 = a.getColumn(0).x;
  final double a12 = a.getColumn(1).x;
  final double a21 = a.getColumn(0).y;
  final double a22 = a.getColumn(1).y;
  double det = a11 * a22 - a12 * a21;

  if (det != 0.0){
    det = 1.0 / det;
  }
  out.x = det * (a22 * b.x - a12 * b.y);
  out.y = det * (a11 * b.y - a21 * b.x);
}

/**
 * Solve A * x = b, where b is a column vector. This is more efficient
 * than computing the inverse in one-shot cases.
 * out: the result
 */
void Matrix3_solve33ToOut(Matrix3 a, Vector3 b, Vector3 out) {
  a.getColumn(1).crossInto(a.getColumn(2), out);
  double det = a.getColumn(0).dot(out);
  if (det != 0.0){
    det = 1.0 / det;
  }

  a.getColumn(1).crossInto(a.getColumn(2), out);
  final double x = det * b.dot(out);
  b.crossInto(a.getColumn(2), out);
  final double y = det * a.getColumn(0).dot(out);
  a.getColumn(1).crossInto(b, out);
  double z = det * a.getColumn(0).dot(out);
  out.x = x;
  out.y = y;
  out.z = z;
}
