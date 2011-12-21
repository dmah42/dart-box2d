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

class Sweep {
  /** Local center of mass position. */
  final Vector localCenter;

  /** Center world positions. */
  final Vector centerZero;
  final Vector center;

  /** World angles. */
  num angleZero;
  num angle;

  /**
   * Constructs a new Sweep with centers initialized to the origin and angles
   * set to zero.
   */
  Sweep() :
    localCenter = new Vector(),
    centerZero = new Vector(),
    center = new Vector(),
    angleZero = 0,
    angle = 0 { }

  /**
   * Constructs a new sweep that is a copy of the given Sweep.
   */
  Sweep.copy(Sweep other) :
    localCenter = new Vector.copy(other.localCenter),
    centerZero = new Vector.copy(other.centerZero),
    center = new Vector.copy(other.center),
    angleZero = other.angleZero,
    angle = other.angle { }

  /**
   * Returns true if given object is equal to this sweep. Two sweeps are equal
   * if their fields are equal.
   */
  bool operator == (other) {
    return localCenter == other.localCenter && centerZero == other.centerZero
        && center == other.center && angleZero == other.angleZero &&
        angle == other.angle;
  }

  /**
   * Sets this Sweep equal to the given Sweep.
   */
  void setFrom(Sweep other) {
    localCenter.setFrom(other.localCenter);
    centerZero.setFrom(other.centerZero);
    center.setFrom(other.center);
    angleZero = other.angleZero;
    angle = other.angle;
  }

  void normalize() {
    num d = MathBox._2PI * (angleZero / MathBox._2PI).floor();
    angleZero -= d;
    angle -= d;
  }

  /**
   * Computes the interpolated transform at a specific time.
   * Time is the normalized time in [0,1].
   */
  void getTransform(Transform xf, num alpha) {
    assert (xf != null);

    xf.position.x = (1.0 - alpha) * centerZero.x + alpha * center.x;
    xf.position.y = (1.0 - alpha) * centerZero.y + alpha * center.y;
    xf.rotation.setAngle((1.0 - alpha) * angleZero + alpha * angle);

    // Shift to origin
    xf.position.x -= xf.rotation.col1.x * localCenter.x + xf.rotation.col2.x
        * localCenter.y;
    xf.position.y -= xf.rotation.col1.y * localCenter.x + xf.rotation.col2.y
        * localCenter.y;
  }

  /**
   * Advances the sweep forward, resulting in a new initial state.
   * Time is the new initial time.
   */
  void advance(num time) {
    centerZero.x = (1 - time) * centerZero.x + time * center.x;
    centerZero.y = (1 - time) * centerZero.y + time * center.y;
    angleZero = (1 - time) * angleZero + time * angle;
  }
}
