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
 * A shape commonly known as the circle.
 */

part of box2d;

class CircleShape extends Shape {
  /**
   * The current position of the center of this circle.
   */
  final vec2 position;

  /**
   * A constructor for internal use only. Instead use Body.createShape with a
   * CircleDef.
   */
  CircleShape() :
    super(ShapeType.CIRCLE, 0),
    position = new vec2() {
  }

  /**
   * Constructs a new CircleShape equal to the given CircleShape.
   */
  CircleShape.copy(CircleShape other) :
    super(other.type, other.radius),
    position = new vec2.copy(other.position) { }


  /**
   * Returns true if the point is contained in the given shape when the given
   * rotation transform is applied. Implements superclass abstract method of
   * the same name.
   */
  bool testPoint(Transform transform, vec2 point) {
    vec2 center = new vec2.copy(position);
    transform.rotation.transformDirect(center);
    center.selfAdd(transform.position);

    vec2 d = center.selfSub(point).selfNegate();
    return dot(d, d) <= radius * radius;
  }

  /**
   * Compute the axis aligned box for this Shape when the given transform is
   * applied. Stores the result in the given box.
   */
  void computeAxisAlignedBox(AxisAlignedBox argBox, Transform argTransform) {
    vec2 p = new vec2.copy(position);
    argTransform.rotation.transformDirect(p);
    p.selfAdd(argTransform.position);

    argBox.lowerBound.x = p.x - radius;
    argBox.lowerBound.y = p.y - radius;
    argBox.upperBound.x = p.x + radius;
    argBox.upperBound.y = p.y + radius;
  }

  /** Returns a clone of this circle. */
  Shape clone() => new CircleShape.copy(this);

  /**
   * Computes the mass properties of this Circle at the given density and stores
   * the result in the given MassData object.
   */
  void computeMass(MassData massData, num density) {
    massData.mass = density * Math.PI * radius * radius;
    massData.center.copyFromVector(position);

    // Store inertia above the local origin.
    massData.inertia = massData.mass * (.5 * radius * radius +
        dot(position, position));
  }
}
