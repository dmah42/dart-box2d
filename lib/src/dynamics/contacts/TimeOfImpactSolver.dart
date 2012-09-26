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
 * This is a pure position solver for a single movable body in contact with
 * multiple non-moving bodies.
 */

part of box2d;

class TimeOfImpactSolver {
  List<TimeOfImpactConstraint> constraints;
  int count;
  Body toiBody;

  /** Pooling. */
  final TimeOfImpactSolverManifold psm;
  final vec2 rA;
  final vec2 rB;
  final vec2 P;
  final vec2 temp;

  TimeOfImpactSolver() :
    count = 0,
    toiBody = null,
    constraints = new List<TimeOfImpactConstraint>(4),

    // Initialize pool variables.
    psm = new TimeOfImpactSolverManifold(),
    rA = new vec2(),
    rB = new vec2(),
    P = new vec2(),
    temp = new vec2() {
    for (int i = 0; i<constraints.length; i++){
      constraints[i] = new TimeOfImpactConstraint();
    }
  }

  void initialize(List<Contact> contacts, int argCount, Body argToiBody) {
    count = argCount;
    toiBody = argToiBody;

    if(count >= constraints.length){
      List<TimeOfImpactConstraint> old = constraints;
      int newLen = Math.max(count, old.length*2);
      constraints = new List<TimeOfImpactConstraint>(newLen);
      constraints.setRange(0, old.length, old);
      for(int i=old.length; i<constraints.length; i++){
        constraints[i] = new TimeOfImpactConstraint();
      }
    }

    for (int i=0; i<count; i++) {
      Contact contact = contacts[i];

      Fixture fixtureA = contact.fixtureA;
      Fixture fixtureB = contact.fixtureB;
      Shape shapeA = fixtureA.shape;
      Shape shapeB = fixtureB.shape;
      num radiusA = shapeA.radius;
      num radiusB = shapeB.radius;
      Body bodyA = fixtureA.body;
      Body bodyB = fixtureB.body;
      Manifold manifold = contact.manifold;

      assert(manifold.pointCount > 0);

      TimeOfImpactConstraint constraint = constraints[i];
      constraint.bodyA = bodyA;
      constraint.bodyB = bodyB;
      constraint.localNormal.copyFrom(manifold.localNormal);
      constraint.localPoint.copyFrom(manifold.localPoint);
      constraint.type = manifold.type;
      constraint.pointCount = manifold.pointCount;
      constraint.radius = radiusA + radiusB;

      for (int j = 0; j < constraint.pointCount; ++j){
        ManifoldPoint cp = manifold.points[j];
        constraint.localPoints[j] = cp.localPoint;
      }
    }
  }

  /**
   * Perform one solver iteration. Returns true if converged.
   */
  bool solve(num baumgarte){
    num minSeparation = 0;

    for (int i = 0; i < count; ++i){
      TimeOfImpactConstraint c = constraints[i];
      Body bodyA = c.bodyA;
      Body bodyB = c.bodyB;

      num massA = bodyA.mass;
      num massB = bodyB.mass;

      // Only the TimeOfImpact body should move.
      if (bodyA == toiBody){
        massB = 0.0;
      } else{
        massA = 0.0;
      }

      num invMassA = massA * bodyA.invMass;
      num invIA = massA * bodyA.invInertia;
      num invMassB = massB * bodyB.invMass;
      num invIB = massB * bodyB.invInertia;

      // Solve normal constraints
      for (int j = 0; j < c.pointCount; ++j){
        psm.initialize(c, j);
        vec2 normal = psm.normal;

        vec2 point = psm.point;
        num separation = psm.separation;

        rA.copyFrom(point).sub(bodyA.sweep.center);
        rB.copyFrom(point).sub(bodyB.sweep.center);

        // Track max constraint error.
        minSeparation = Math.min(minSeparation, separation);

        // Prevent large corrections and allow slop.
        num C = clamp(baumgarte * (separation + Settings.LINEAR_SLOP),
                      -Settings.MAX_LINEAR_CORRECTION, 0.0);

        // Compute the effective mass.
        num rnA = cross(rA, normal);
        num rnB = cross(rB, normal);
        num K = invMassA + invMassB + invIA * rnA * rnA + invIB * rnB * rnB;

        // Compute normal impulse
        num impulse = K > 0.0 ? - C / K : 0.0;

        P.copyFrom(normal).scale(impulse);

        temp.copyFrom(P).scale(invMassA);
        bodyA.sweep.center.sub(temp);
        bodyA.sweep.angle -= invIA * cross(rA, P);
        bodyA.synchronizeTransform();

        temp.copyFrom(P).scale(invMassB);
        bodyB.sweep.center.add(temp);
        bodyB.sweep.angle += invIB * cross(rB, P);
        bodyB.synchronizeTransform();
      }
    }

    // We can't expect minSpeparation >= -_LINEAR_SLOP because we don't
    // push the separation above -_LINEAR_SLOP.
    return minSeparation >= -1.5 * Settings.LINEAR_SLOP;
  }
}

class TimeOfImpactSolverManifold {
  final vec2 normal;
  final vec2 point;
  num separation;

  /** Pooling */
  final vec2 pointA;
  final vec2 pointB;
  final vec2 temp;
  final vec2 planePoint;
  final vec2 clipPoint;

  /** constructor that initiliazes everything. */
  TimeOfImpactSolverManifold() :
    normal = new vec2(),
    point = new vec2(),
    separation = 0,
    pointA = new vec2(),
    pointB = new vec2(),
    temp = new vec2(),
    planePoint = new vec2(),
    clipPoint = new vec2() { }

  void initialize(TimeOfImpactConstraint cc, int index) {
    assert(cc.pointCount > 0);

    switch (cc.type) {
      case ManifoldType.CIRCLES:
        pointA.copyFrom(cc.bodyA.getWorldPoint(cc.localPoint));
        pointB.copyFrom(cc.bodyB.getWorldPoint(cc.localPoints[0]));
        if (distance2(pointA, pointB) > Settings.EPSILON * Settings.EPSILON) {
          normal.copyFrom(pointB).sub(pointA);
          normal.normalize();
        } else {
          normal.splat(0);
        }

        point.copyFrom(pointA).add(pointB).scale(.5);
        temp.copyFrom(pointB).sub(pointA);
        separation = dot(temp, normal) - cc.radius;
        break;

      case ManifoldType.FACE_A:
        normal.copyFrom(cc.bodyA.getWorldVector(cc.localNormal));
        planePoint.copyFrom(cc.bodyA.getWorldPoint(cc.localPoint));

        clipPoint.copyFrom(cc.bodyB.getWorldPoint(cc.localPoints[index]));
        temp.copyFrom(clipPoint).sub(planePoint);
        separation = dot(temp, normal) - cc.radius;
        point.copyFrom(clipPoint);
        break;

      case ManifoldType.FACE_B:
        normal.copyFrom(cc.bodyB.getWorldVector(cc.localNormal));
        planePoint.copyFrom(cc.bodyB.getWorldPoint(cc.localPoint));

        clipPoint.copyFrom(cc.bodyA.getWorldPoint(cc.localPoints[index]));
        temp.copyFrom(clipPoint).sub(planePoint);
        separation = dot(temp, normal) - cc.radius;
        point.copyFrom(clipPoint);

        // Ensure normal points from A to B
        normal.negate();
        break;
    }
  }
}
