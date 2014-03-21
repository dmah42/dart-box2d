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
 * A revolute joint constrains two bodies to share a common point while they
 * are free to rotate about the point. The relative rotation about the shared
 * point is the joint angle. You can limit the relative rotation with
 * a joint limit that specifies a lower and upper angle. You can use a motor
 * to drive the relative rotation about the shared point. A maximum motor torque
 * is provided so that infinite forces are not generated.
 */

part of box2d;

class RevoluteJoint extends Joint {
  final Vector2 localAnchor1 = new Vector2.zero();
  final Vector2 localAnchor2 = new Vector2.zero();

  final Vector3 impulse = new Vector3.zero();

  double _motorImpulse = 0.0;

  // Effective mass for point-to-point constraint.
  final Matrix3 mass = new Matrix3.zero();

  // Effective mass for motor/limit angular constraint.
  double motorMass;

  bool _enableMotor;

  double _maxMotorTorque;

  double _motorSpeed;

  bool _enableLimit;

  double referenceAngle;

  /** Limits on the relative rotation of the joint. */
  double lowerAngle;
  double upperAngle;

  int limitState;

  RevoluteJoint(RevoluteJointDef def): super(def) {
    localAnchor1.setFrom(def.localAnchorA);
    localAnchor2.setFrom(def.localAnchorB);
    referenceAngle = def.referenceAngle;
    lowerAngle = def.lowerAngle;
    upperAngle = def.upperAngle;
    _maxMotorTorque = def.maxMotorTorque;
    _motorSpeed = def.motorSpeed;
    _enableLimit = def.enableLimit;
    _enableMotor = def.enableMotor;
  }

  void initVelocityConstraints(TimeStep step) {
    final Body b1 = bodyA;
    final Body b2 = bodyB;

    if (_enableMotor || _enableLimit) {
      // You cannot create a rotation limit between bodies that
      // both have fixed rotation.
      assert(b1.invInertia > 0.0 || b2.invInertia > 0.0);
    }

    final Vector2 r1 = new Vector2.zero();
    final Vector2 r2 = new Vector2.zero();

    // Compute the effective mass matrix.
    r1..setFrom(localAnchor1)..sub(b1.localCenter);
    r2..setFrom(localAnchor2)..sub(b2.localCenter);
    b1.originTransform.rotation.transformed(r1, r1);
    b2.originTransform.rotation.transformed(r2, r2);

    num m1 = b1.invMass, m2 = b2.invMass;
    num i1 = b1.invInertia, i2 = b2.invInertia;

    mass.setValues(
      m1 + m2 + r1.y * r1.y * i1 + r2.y * r2.y * i2,
      -r1.y * r1.x * i1 - r2.y * r2.x * i2,
      -r1.y * i1 - r2.y * i2,

      -r1.y * r1.x * i1 - r2.y * r2.x * i2,
      m1 + m2 + r1.x * r1.x * i1 + r2.x * r2.x * i2,
      r1.x * i1 + r2.x * i2,

      -r1.y * i1 - r2.y * i2,
      r1.x * i1 + r2.x * i2,
      i1 + i2
    );

    motorMass = i1 + i2;
    if (motorMass > 0.0) {
      motorMass = 1.0 / motorMass;
    }

    if (_enableMotor == false) {
      _motorImpulse = 0.0;
    }

    if (_enableLimit) {
      num jointAngle = b2.sweep.angle - b1.sweep.angle - referenceAngle;
      if ((upperAngle - lowerAngle).abs() < 2.0 * Settings.ANGULAR_SLOP) {
        limitState = LimitState.EQUAL;
      } else if (jointAngle <= lowerAngle) {
        if (limitState != LimitState.AT_LOWER) {
          impulse.z = 0.0;
        }
        limitState = LimitState.AT_LOWER;
      } else if (jointAngle >= upperAngle) {
        if (limitState != LimitState.AT_UPPER) {
          impulse.z = 0.0;
        }
        limitState = LimitState.AT_UPPER;
      } else {
        limitState = LimitState.INACTIVE;
        impulse.z = 0.0;
      }
    } else {
      limitState = LimitState.INACTIVE;
    }

    if (step.warmStarting) {
      // Scale impulses to support a variable time step.
      impulse.scale(step.dtRatio);
      _motorImpulse *= step.dtRatio;

      Vector2 temp = new Vector2.zero();
      Vector2 P = new Vector2.zero();
      P.setValues(impulse.x, impulse.y);

      temp..setFrom(P)..scale(m1);
      b1.linearVelocity.sub(temp);
      b1.angularVelocity -= i1 * (r1.cross(P) + _motorImpulse + impulse.z);

      temp..setFrom(P)..scale(m2);
      b2.linearVelocity.add(temp);
      b2.angularVelocity += i2 * (r2.cross(P) + _motorImpulse + impulse.z);

    } else {
      impulse.setZero();
      _motorImpulse = 0.0;
    }
  }

  void solveVelocityConstraints(final TimeStep step) {
    final Body b1 = bodyA;
    final Body b2 = bodyB;

    final Vector2 v1 = b1.linearVelocity;
    num w1 = b1.angularVelocity;
    final Vector2 v2 = b2.linearVelocity;
    num w2 = b2.angularVelocity;

    num m1 = b1.invMass, m2 = b2.invMass;
    num i1 = b1.invInertia, i2 = b2.invInertia;

    // Solve motor constraint.
    if (_enableMotor && limitState != LimitState.EQUAL) {
      num Cdot = w2 - w1 - _motorSpeed;
      num imp = motorMass * (-Cdot);
      num oldImpulse = _motorImpulse;
      num maxImpulse = step.dt * _maxMotorTorque;
      _motorImpulse = MathBox.clamp(_motorImpulse + imp, -maxImpulse,
          maxImpulse);
      imp = _motorImpulse - oldImpulse;

      w1 -= i1 * imp;
      w2 += i2 * imp;
    }

    final Vector2 temp = new Vector2.zero();
    final Vector2 r1 = new Vector2.zero();
    final Vector2 r2 = new Vector2.zero();

    // Solve limit constraint.
    if (_enableLimit && limitState != LimitState.INACTIVE) {

      r1..setFrom(localAnchor1)..sub(b1.localCenter);
      r2..setFrom(localAnchor2)..sub(b2.localCenter);
      b1.originTransform.rotation.transformed(r1, r1);
      b2.originTransform.rotation.transformed(r2, r2);

      final Vector2 Cdot1 = new Vector2.zero();
      final Vector3 Cdot = new Vector3.zero();

      // Solve point-to-point constraint
      r1.scaleOrthogonalInto(w1, temp);
      r2.scaleOrthogonalInto(w2, Cdot1);
      Cdot1..add(v2)..sub(v1)..sub(temp);
      num Cdot2 = w2 - w1;
      Cdot.setValues(Cdot1.x, Cdot1.y, Cdot2);

      Vector3 imp = new Vector3.zero();
      Matrix3.solve(mass, imp, Cdot..negate());

      if (limitState == LimitState.EQUAL) {
        impulse.add(imp);
      } else if (limitState == LimitState.AT_LOWER) {
        num newImpulse = impulse.z + imp.z;
        if (newImpulse < 0.0) {
          Matrix3.solve2(mass, temp, Cdot1..negate());
          imp.x = temp.x;
          imp.y = temp.y;
          imp.z = -impulse.z;
          impulse.x += temp.x;
          impulse.y += temp.y;
          impulse.z = 0.0;
        }
      } else if (limitState == LimitState.AT_UPPER) {
        num newImpulse = impulse.z + imp.z;
        if (newImpulse > 0.0) {
          Matrix3.solve2(mass, temp, Cdot1..negate());
          imp.x = temp.x;
          imp.y = temp.y;
          imp.z = -impulse.z;
          impulse.x += temp.x;
          impulse.y += temp.y;
          impulse.z = 0.0;
        }
      }
      final Vector2 P = new Vector2.zero();

      P.setValues(imp.x, imp.y);

      temp..setFrom(P)..scale(m1);
      v1.sub(temp);
      w1 -= i1 * (r1.cross(P) + imp.z);

      temp..setFrom(P)..scale(m2);
      v2.add(temp);
      w2 += i2 * (r2.cross(P) + imp.z);

    } else {
      r1..setFrom(localAnchor1)..sub(b1.localCenter);
      r2..setFrom(localAnchor2)..sub(b2.localCenter);
      b1.originTransform.rotation.transformed(r1, r1);
      b2.originTransform.rotation.transformed(r2, r2);

      // Solve point-to-point constraint
      Vector2 Cdot = new Vector2.zero();
      Vector2 imp = new Vector2.zero();

      r1.scaleOrthogonalInto(w1, temp);
      r2.scaleOrthogonalInto(w2, Cdot);
      Cdot..add(v2)..sub(v1)..sub(temp);
      Matrix3.solve2(mass, imp, Cdot..negate()); // just leave negated

      impulse.x += imp.x;
      impulse.y += imp.y;

      temp..setFrom(imp)..scale(m1);
      v1.sub(temp);
      w1 -= i1 * r1.cross(imp);

      temp..setFrom(imp)..scale(m2);
      v2.add(temp);
      w2 += i2 * r2.cross(imp);
    }

    b1.angularVelocity = w1;
    b2.angularVelocity = w2;
  }

  bool solvePositionConstraints(num baumgarte) {
    final Body b1 = bodyA;
    final Body b2 = bodyB;

    num angularError = 0.0;
    num positionError = 0.0;

    // Solve angular limit constraint.
    if (_enableLimit && limitState != LimitState.INACTIVE) {
      num angle = b2.sweep.angle - b1.sweep.angle - referenceAngle;
      num limitImpulse = 0.0;

      if (limitState == LimitState.EQUAL) {
        // Prevent large angular corrections
        num C = MathBox.clamp(angle - lowerAngle,
            -Settings.MAX_ANGULAR_CORRECTION, Settings.MAX_ANGULAR_CORRECTION);
        limitImpulse = -motorMass * C;
        angularError = C.abs();
      } else if (limitState == LimitState.AT_LOWER) {
        num C = angle - lowerAngle;
        angularError = -C;

        // Prevent large angular corrections and allow some slop.
        C = MathBox.clamp(C + Settings.ANGULAR_SLOP,
            -Settings.MAX_ANGULAR_CORRECTION, 0.0);
        limitImpulse = -motorMass * C;
      } else if (limitState == LimitState.AT_UPPER) {
        num C = angle - upperAngle;
        angularError = C;

        // Prevent large angular corrections and allow some slop.
        C = MathBox.clamp(C - Settings.ANGULAR_SLOP, 0.0,
            Settings.MAX_ANGULAR_CORRECTION);
        limitImpulse = -motorMass * C;
      }

      b1.sweep.angle -= b1.invInertia * limitImpulse;
      b2.sweep.angle += b2.invInertia * limitImpulse;

      b1.synchronizeTransform();
      b2.synchronizeTransform();
    }

    // Solve point-to-point constraint.
    {
      Vector2 imp = new Vector2.zero();

      Vector2 r1 = new Vector2.zero();
      Vector2 r2 = new Vector2.zero();
      Vector2 C = new Vector2.zero();

      r1..setFrom(localAnchor1)..sub(b1.localCenter);
      r2..setFrom(localAnchor2)..sub(b2.localCenter);
      b1.originTransform.rotation.transformed(r1, r1);
      b2.originTransform.rotation.transformed(r2, r2);

      C..setFrom(b2.sweep.center)..add(r2);
      C..sub(b1.sweep.center)..sub(r1);
      positionError = C.length;

      num invMass1 = b1.invMass, invMass2 = b2.invMass;
      num invI1 = b1.invInertia, invI2 = b2.invInertia;

      // Handle large detachment.
      final num k_allowedStretch = 10.0 * Settings.LINEAR_SLOP;
      if (C.length2 > k_allowedStretch * k_allowedStretch) {
        Vector2 u = new Vector2.zero();

        // Use a particle solution (no rotation).
        num m = invMass1 + invMass2;
        if (m > 0.0) {
          m = 1.0 / m;
        }
        imp..setFrom(C)..negate()..scale(m);
        final num k_beta = 0.5;
        // using u as temp variable
        u..setFrom(imp)..scale(k_beta * invMass1);
        b1.sweep.center.sub(u);
        u..setFrom(imp)..scale(k_beta * invMass2);
        b2.sweep.center.add(u);

        C..setFrom(b2.sweep.center)..add(r2);
        C..sub(b1.sweep.center)..sub(r1);
      }

      Matrix2 K1 = new Matrix2(
       invMass1 + invMass2,
       0.0,
       0.0,
       invMass1 + invMass2);

      Matrix2 K2 = new Matrix2(
       invI1 * r1.y * r1.y,
       -invI1 * r1.x * r1.y,
       -invI1 * r1.x * r1.y,
       invI1 * r1.x * r1.x);

      Matrix2 K3 = new Matrix2(
       invI2 * r2.y * r2.y,
       -invI2 * r2.x * r2.y,
       -invI2 * r2.x * r2.y,
       invI2 * r2.x * r2.x);

      K1..add(K2)..add(K3);
      Matrix2.solve(K1, imp, C..negate()); // just leave c negated

      // using C as temp variable
      C..setFrom(imp)..scale(b1.invMass);
      b1.sweep.center.sub(C);
      b1.sweep.angle -= b1.invInertia * r1.cross(imp);

      C..setFrom(imp)..scale(b2.invMass);
      b2.sweep.center.add(C);
      b2.sweep.angle += b2.invInertia * r2.cross(imp);

      b1.synchronizeTransform();
      b2.synchronizeTransform();
    }

    return positionError <= Settings.LINEAR_SLOP && angularError <=
        Settings.ANGULAR_SLOP;
  }

  void getAnchorA(Vector2 argOut) {
    bodyA.getWorldPointToOut(localAnchor1, argOut);
  }

  void getAnchorB(Vector2 argOut) {
    bodyB.getWorldPointToOut(localAnchor2, argOut);
  }

  void getReactionForce(num inv_dt, Vector2 argOut) {
    argOut..setValues(impulse.x, impulse.y)..scale(inv_dt);
  }

  num getReactionTorque(num inv_dt) {
    return inv_dt * impulse.z;
  }

  num get jointAngle {
    final Body b1 = bodyA;
    final Body b2 = bodyB;
    return b2.sweep.angle - b1.sweep.angle - referenceAngle;
  }

  num get jointSpeed {
    final Body b1 = bodyA;
    final Body b2 = bodyB;
    return b2.angularVelocity - b1.angularVelocity;
  }

  bool get motorEnabled => _enableMotor;

  void set motorEnabled(bool flag) {
    bodyA.awake = true;
    bodyB.awake = true;
    _enableMotor = flag;
  }

  num get motorTorque => _motorImpulse;

  void set motorSpeed(num speed) {
    bodyA.awake = true;
    bodyB.awake = true;
    _motorSpeed = speed;
  }

  num get motorSpeed => _motorSpeed;

  num get maxMotorTorque => _maxMotorTorque;

  void set maxMotorTorque(num torque) {
    bodyA.awake = true;
    bodyB.awake = true;
    _maxMotorTorque = torque;
  }

  bool get limitEnabled => _enableLimit;

  void set limitEnabled(bool flag) {
    bodyA.awake = true;
    bodyB.awake = true;
    _enableLimit = flag;
  }

  void setLimits(final num lower, final num upper) {
    assert(lower <= upper);
    bodyA.awake = true;
    bodyB.awake = true;
    lowerAngle = lower;
    upperAngle = upper;
  }
}

