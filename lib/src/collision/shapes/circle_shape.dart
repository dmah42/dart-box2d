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
  final Vector2 position;

  /**
   * A constructor for internal use only. Instead use Body.createShape with a
   * CircleDef.
   */
  CircleShape() :
    super(ShapeType.CIRCLE, 0.0),
    position = new Vector2.zero();

  /**
   * Constructs a new CircleShape equal to the given CircleShape.
   */
  CircleShape.copy(CircleShape other) :
    super(other.type, other.radius),
    position = new Vector2.copy(other.position);


  /**
   * Returns true if the point is contained in the given shape when the given
   * rotation transform is applied. Implements superclass abstract method of
   * the same name.
   */
  bool testPoint(Transform transform, Vector2 point) {
    Vector2 center = new Vector2.zero();
    transform.rotation.transformed(position, center);
    center.add(transform.position);

    Vector2 d = center.sub(point).negate();
    return d.dot(d) <= radius * radius;
  }

  bool raycast(RayCastOutput output, RayCastInput input, Transform transform,
      int childIndex) {
    Vector2 center = new Vector2.zero();
    transform.rotation.transformed(position, center);
    center.add(transform.position);

    Vector2 s = input.p1.sub(center);
    double b = s.dot(s) - (radius * radius);

    // Solve quadratic equation
    Vector2 r = input.p2.sub(input.p1);
    double c = s.dot(r);
    double rr = r.dot(r);
    double sigma = c * c - rr * b;

    if (sigma < 0.0 || rr < Settings.EPSILON)
      return false;

    double a = -(c + Math.sqrt(sigma));

    if (0.0 <= a && a <= input.maxFraction * rr) {
      a /= rr;
      output.fraction = a;
      output.normal = (r.scale(a)).add(s);
      output.normal.normalize();
      return true;
    }
    return false;
  }

  /**
   * Compute the axis aligned box for this Shape when the given transform is
   * applied. Stores the result in the given box.
   */
  void computeAxisAlignedBox(Aabb2 argBox, Transform argTransform) {
    Vector2 p = new Vector2.zero();
    argTransform.rotation.transformed(position, p);
    p.add(argTransform.position);

    argBox.min.setValues(p.x - radius, p.y - radius);
    argBox.max.setValues(p.x + radius, p.y + radius);
  }

  /** Returns a clone of this circle. */
  Shape clone() => new CircleShape.copy(this);

  /**
   * Computes the mass properties of this Circle at the given density and stores
   * the result in the given MassData object.
   */
  void computeMass(MassData massData, double density) {
    massData.mass = density * Math.PI * radius * radius;
    massData.center.setFrom(position);

    // Store inertia above the local origin.
    massData.inertia = massData.mass * (.5 * radius * radius +
        position.dot(position));
  }
}
