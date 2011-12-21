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
 * A shape commonly known as the circle.
 */
class CircleShape extends Shape {
  /**
   * The current position of the center of this circle.
   */
  final Vector position;

  /** Used internally to avoid constructing while running. */
  final Vector pool1;
  final Vector pool2;
  final Vector pool3;

  /**
   * A constructor for internal use only. Instead use Body.createShape with a
   * CircleDef.
   */
  CircleShape() :
    super(ShapeType.CIRCLE, 0),
    position = new Vector(),
    pool1 = new Vector(),
    pool2 = new Vector(),
    pool3 = new Vector() {
  }

  /**
   * Constructs a new CircleShape equal to the given CircleShape.
   */
  CircleShape.copy(CircleShape other) :
    super(other.type, other.radius),
    position = new Vector.copy(other.position),
    pool1 = new Vector(),
    pool2 = new Vector(),
    pool3 = new Vector() { }


  /**
   * Returns true if the point is contained in the given shape when the given
   * rotation transform is applied. Implements superclass abstract method of
   * the same name.
   */
  bool testPoint(Transform transform, Vector point) {
    Vector center = pool1;
    transform.rotation.multiplyVectorToOut(position, center);
    center.addLocal(transform.position);

    Vector d = center.subLocal(point).negateLocal();
    return Vector.dot(d, d) <= radius * radius;
  }

  /**
   * Compute the axis aligned box for this Shape when the given transform is
   * applied. Stores the result in the given box.
   */
  void computeAxisAlignedBox(AxisAlignedBox argBox, Transform argTransform) {
    Vector p = pool1;
    Matrix22.mulMatrixAndVectorToOut(argTransform.rotation, position, p);
    p.addLocal(argTransform.position);

    argBox.lowerBound.setCoords(p.x - radius, p.y - radius);
    argBox.upperBound.setCoords(p.x + radius, p.y + radius);
  }

  /** Returns a clone of this circle. */
  Shape clone() {
    return new CircleShape.copy(this);
  }

  /**
   * Computes the mass properties of this Circle at the given density and stores
   * the result in the given MassData object.
   */
  void computeMass(MassData massData, num density) {
    massData.mass = density * Math.PI * radius * radius;
    massData.center.setFrom(position);

    // Store inertia above the local origin.
    massData.inertia = massData.mass * (.5 * radius * radius +
        Vector.dot(position, position));
  }
}
