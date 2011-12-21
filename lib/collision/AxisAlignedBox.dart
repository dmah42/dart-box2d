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
 * An axis-aligned bounding box.
 */
class AxisAlignedBox {
  /** Bottom left vertex of bounding box. */
  Vector lowerBound;

  /** Top right vertex of bounding box. */
  Vector upperBound;

  /**
   * Constructs a new box with the given lower and upper bounds. If no bounds
   * are specified, constructs the box with both bounds at the origin.
   */
  AxisAlignedBox([this.lowerBound = null, this.upperBound = null]) {
    if (lowerBound == null) {
      lowerBound = new Vector();
    }
    if (upperBound == null) {
      upperBound = new Vector();
    }
  }

  /**
   * Sets this box to be a combination of the two given boxes.
   * The combination is determined by picking and choosing the lowest x and y
   * values from the lowerBounds to form a new lower bound and picking and
   * choosing the largest x and y values from the upperBounds to form a new
   * upperBound.
   */
  void setFromCombination(AxisAlignedBox boxOne, AxisAlignedBox boxTwo) {
    lowerBound.x = Math.min(boxOne.lowerBound.x, boxTwo.lowerBound.x);
    lowerBound.y = Math.min(boxOne.lowerBound.y, boxTwo.lowerBound.y);
    upperBound.x = Math.max(boxOne.upperBound.x, boxTwo.upperBound.x);
    upperBound.y = Math.max(boxOne.upperBound.y, boxTwo.upperBound.y);
  }

  /**
   * Sets the bounds to the given values.
   */
  AxisAlignedBox setBounds(Vector lower, Vector upper) {
    lowerBound.setFrom(lower);
    upperBound.setFrom(upper);
    return this;
  }

  /**
   * Returns true if the given box overlaps with this box.
   */
 static bool testOverlap(AxisAlignedBox a, AxisAlignedBox b) {
   if (b.lowerBound.x > a.upperBound.x || b.lowerBound.y > a.upperBound.y) {
     return false;
   }

   if (a.lowerBound.x > b.upperBound.x || a.lowerBound.y > b.upperBound.y) {
     return false;
   }

   return true;
 }

  /**
   * Returns true if the lower bound is strictly less than the upper bound and
   * both bounds are themselves valid (Vector.isValid() returns true).
   */
  bool isValid() {
    return lowerBound.isValid() && upperBound.isValid()
        && lowerBound.x < upperBound.x && lowerBound.y < upperBound.y;
  }

  /**
   * Returns the center of this box.
   */
  Vector get center() {
    Vector c = new Vector.copy(lowerBound);
    c.addLocal(upperBound);
    c.mulLocal(.5);
    return c;
  }

  /**
   * Returns true if this box contains the given box.
   */
  bool contains(AxisAlignedBox aabb) {
    return lowerBound.x > aabb.lowerBound.x &&
        lowerBound.y > aabb.lowerBound.y && upperBound.y < aabb.upperBound.y
        && upperBound.x < aabb.upperBound.x;
  }

  /**
   * Sets this box to be a copy of the given box.
   */
  void setFrom(AxisAlignedBox other) {
    lowerBound.setFrom(other.lowerBound);
    upperBound.setFrom(other.upperBound);
  }

  String toString() {
    return lowerBound.toString() + ", " + upperBound.toString();
  }
}
