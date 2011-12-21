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

//TODO(gregbglw): Pull what is shared from here and in touch/Math.dart into a
// common util.
class MathBox {
  static final num _2PI = Math.PI * 2;

  MathBox() { }

  /**
   * Return the distance between the two given vectors, but squared.
   */
  static num distanceSquared(Vector v1, Vector v2) {
    num dx = (v1.x - v2.x);
    num dy = (v1.y - v2.y);
    return dx * dx + dy * dy;
  }

  /**
   * Return the distance between the two given vectors.
   */
  static num distance(Vector v1, Vector v2) {
    return Math.sqrt(distanceSquared(v1, v2));
  }

  /** Returns the closest value to 'a' that is in between 'low' and 'high' */
  static num clamp(num a, num low, num high) {
    return Math.max(low, Math.min(a, high));
  }

  /**
   * Given a value within the range specified by fromMin and fromMax, returns a
   * value with the same relative position in the range specified from toMin and
   * toMax. For example, given a val of 2 in the "from range" of 0-4, and a
   * "to range" of 10-20, would return 15.
   */
  static num translateAndScale(num val, num fromMin, num fromMax, num toMin,
      num toMax) {
    final num mult = (val - fromMin) / (fromMax - fromMin);
    final num res = toMin + mult * (toMax - toMin);
    return res;
  }
}
