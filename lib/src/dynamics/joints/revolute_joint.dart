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
  final vec2 localAnchor1;
  final vec2 localAnchor2;

  final vec3 impulse;

  num _motorImpulse;

  // Effective mass for point-to-point constraint.
  final mat3 mass;

  // Effective mass for motor/limit angular constraint.
  num motorMass;

  bool _enableMotor;

  num _maxMotorTorque;

  num _motorSpeed;

  bool _enableLimit;

  num referenceAngle;

  /** Limits on the relative rotation of the joint. */
  num lowerAngle;
  num upperAngle;

  int limitState;

  RevoluteJoint(RevoluteJointDef def) :
    super(def),
    localAnchor1 = new vec2.zero(),
    localAnchor2 = new vec2.zero(),
    impulse = new vec3.zero(),
    _motorImpulse = 0,
    mass = new mat3.zero() {
    localAnchor1.setFrom(def.localAnchorA);
    localAnchor2.setFrom(def.localAnchorB);
    referenceAngle = def.referenceAngle;

    _motorImpulse = 0;

    lowerAngle = def.lowerAngle;
    upperAngle = def.upperAngle;
    _maxMotorTorque = def.maxMotorTorque;
    _motorSpeed = def.motorSpeed;
    _enableLimit = def.enableLimit;
    _enableMotor = def.enableMotor;
  }

  void initVelocityConstraints(TimeStep time_step) {
    final Body b1 = bodyA;
    final Body b2 = bodyB;

    if (_enableMotor || _enableLimit) {
      // You cannot create a rotation limit between bodies that
      // both have fixed rotation.
      assert (b1.invInertia > 0.0 || b2.invInertia > 0.0);
    }

    // Compute the effective mass matrix.
    final vec2 r1 = localAnchor1 - b1.localCenter;
    final vec2 r2 = localAnchor2 - b2.localCenter;
    b1.originTransform.rotation.transform(r1);
    b2.originTransform.rotation.transform(r2);

    num m1 = b1.invMass, m2 = b2.invMass;
    num i1 = b1.invInertia, i2 = b2.invInertia;

    // TODO: uninline this mess.
    mass.setValues(m1 + m2 + r1.y * r1.y * i1 + r2.y * r2.y * i2,
                   -r1.y * r1.x * i1 - r2.y * r2.x * i2,
                   -r1.y * i1 - r2.y * i2,
                   -r1.y * r1.x * i1 - r2.y * r2.x * i2,
                   m1 + m2 + r1.x * r1.x * i1 + r2.x * r2.x * i2,
                   r1.x * i1 + r2.x * i2,
                   -r1.y * i1 - r2.y * i2,
                   r1.x * i1 + r2.x * i2,
                   i1 + i2);

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
      }
      else if (jointAngle <= lowerAngle) {
        if (limitState != LimitState.AT_LOWER) {
          impulse.z = 0.0;
        }
        limitState = LimitState.AT_LOWER;
      }
      else if (jointAngle >= upperAngle) {
        if (limitState != LimitState.AT_UPPER) {
          impulse.z = 0.0;
        }
        limitState = LimitState.AT_UPPER;
      }
      else {
        limitState = LimitState.INACTIVE;
        impulse.z = 0.0;
      }
    }
    else {
      limitState = LimitState.INACTIVE;
    }

    if (time_step.warmStarting) {
      // Scale impulses to support a variable time time_step.
      impulse.scale(time_step.dtRatio);
      _motorImpulse *= time_step.dtRatio;

      vec2 P = new vec2.copy(impulse.xy);

      vec2 temp = new vec2.copy(P);
      temp.scale(m1);
      b1.linearVelocity.sub(temp);
      b1.angularVelocity -= i1 * (cross(r1, P) + _motorImpulse + impulse.z);

      temp.setFrom(P).scale(m2);
      b2.linearVelocity.add(temp);
      b2.angularVelocity += i2 * (cross(r2, P) + _motorImpulse + impulse.z);

    } else {
      impulse.splat(0.0);
      _motorImpulse = 0.0;
    }
  }

  void solveVelocityConstraints(final TimeStep time_step) {
    final Body b1 = bodyA;
    final Body b2 = bodyB;

    final vec2 v1 = b1.linearVelocity;
    num w1 = b1.angularVelocity;
    final vec2 v2 = b2.linearVelocity;
    num w2 = b2.angularVelocity;

    num m1 = b1.invMass, m2 = b2.invMass;
    num i1 = b1.invInertia, i2 = b2.invInertia;

    // Solve motor constraint.
    if (_enableMotor && limitState != LimitState.EQUAL) {
      num Cdot = w2 - w1 - _motorSpeed;
      num imp = motorMass * (-Cdot);
      num oldImpulse = _motorImpulse;
      num maxImpulse = time_step.dt * _maxMotorTorque;
      _motorImpulse = clamp(_motorImpulse + imp, -maxImpulse, maxImpulse);
      imp = _motorImpulse - oldImpulse;

      w1 -= i1 * imp;
      w2 += i2 * imp;
    }

    vec2 temp = new vec2.zero();

    // Solve limit constraint.
    if (_enableLimit && limitState != LimitState.INACTIVE) {

      final vec2 r1 = localAnchor1 - b1.localCenter;
      final vec2 r2 = localAnchor2 - b2.localCenter;
      b1.originTransform.rotation.transform(r1);
      b2.originTransform.rotation.transform(r2);

      // Solve point-to-point constraint
      cross(w1, r1, temp);
      final vec2 Cdot1 = cross(w2, r2);
      Cdot1.add(v2).sub(v1).sub(temp);
      num Cdot2 = w2 - w1;
      vec3 Cdot = new vec3(Cdot1.x, Cdot1.y, Cdot2);

      vec3 imp = MathBox.solve33(mass, Cdot.negate());

      if (limitState == LimitState.EQUAL) {
        impulse.add(imp);
      }
      else if (limitState == LimitState.AT_LOWER) {
        num newImpulse = impulse.z + imp.z;
        if (newImpulse < 0.0) {
          temp = MathBox.solve22(mass, Cdot1.negate());
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
          temp = MathBox.solve22(mass, Cdot1.negate());
          imp.x = temp.x;
          imp.y = temp.y;
          imp.z = -impulse.z;
          impulse.x += temp.x;
          impulse.y += temp.y;
          impulse.z = 0.0;
        }
      }
      final vec2 P = new vec2.copy(imp.xy);

      temp.setFrom(P).scale(m1);
      v1.sub(temp);
      w1 -= i1 * (cross(r1, P) + imp.z);

      temp.setFrom(P).scale(m2);
      v2.add(temp);
      w2 += i2 * (cross(r2, P) + imp.z);

    } else {
      final vec2 r1 = localAnchor1 - b1.localCenter;
      final vec2 r2 = localAnchor2 - b2.localCenter;
      b1.originTransform.rotation.transform(r1);
      b2.originTransform.rotation.transform(r2);

      // Solve point-to-point constraint
      cross(w1, r1, temp);
      vec2 Cdot = cross(w2, r2);
      Cdot.add(v2).sub(v1).sub(temp);
      vec2 imp = MathBox.solve22(mass, Cdot.negate()); // just leave negated

      impulse.x += imp.x;
      impulse.y += imp.y;

      temp.setFrom(imp).scale(m1);
      v1.sub(temp);
      w1 -= i1 * cross(r1, imp);

      temp.setFrom(imp).scale(m2);
      v2.add(temp);
      w2 += i2 * cross(r2, imp);
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
        num C = clamp(angle - lowerAngle, -Settings.MAX_ANGULAR_CORRECTION, Settings.MAX_ANGULAR_CORRECTION);
        limitImpulse = -motorMass * C;
        angularError = C.abs();
      } else if (limitState == LimitState.AT_LOWER) {
        num C = angle - lowerAngle;
        angularError = -C;

        // Prevent large angular corrections and allow some slop.
        C = clamp(C + Settings.ANGULAR_SLOP, -Settings.MAX_ANGULAR_CORRECTION, 0.0);
        limitImpulse = -motorMass * C;
      } else if (limitState == LimitState.AT_UPPER) {
        num C = angle - upperAngle;
        angularError = C;

        // Prevent large angular corrections and allow some slop.
        C = clamp(C - Settings.ANGULAR_SLOP, 0.0, Settings.MAX_ANGULAR_CORRECTION);
        limitImpulse = -motorMass * C;
      }

      b1.sweep.angle -= b1.invInertia * limitImpulse;
      b2.sweep.angle += b2.invInertia * limitImpulse;

      b1.synchronizeTransform();
      b2.synchronizeTransform();
    }

    // Solve point-to-point constraint.
    {
      vec2 imp = new vec2.zero();

      final vec2 r1 = localAnchor1 - b1.localCenter;
      final vec2 r2 = localAnchor2 - b2.localCenter;
      b1.originTransform.rotation.transform(r1);
      b2.originTransform.rotation.transform(r2);

      final vec2 C = b2.sweep.center + r2 - (b1.sweep.center + r1);
      positionError = C.length;

      num invMass1 = b1.invMass, invMass2 = b2.invMass;
      num invI1 = b1.invInertia, invI2 = b2.invInertia;

      // Handle large detachment.
      final num k_allowedStretch = 10.0 * Settings.LINEAR_SLOP;
      if (C.length2 > k_allowedStretch * k_allowedStretch) {
        vec2 u = new vec2.zero();

        // Use a particle solution (no rotation).
        num m = invMass1 + invMass2;
        if (m > 0.0) {
          m = 1.0 / m;
        }
        imp.setFrom(C).negate().scale(m);
        final num k_beta = 0.5;
        // using u as temp variable
        u.setFrom(imp).scale(k_beta * invMass1);
        b1.sweep.center.sub(u);
        u.setFrom(imp).scale(k_beta * invMass2);
        b2.sweep.center.add(u);

        C.setFrom(b2.sweep.center).add(r2);
        C.sub(b1.sweep.center).sub(r1);
      }

      mat2 K1 = new mat2(invMass1 + invMass2,
                         0.0,
                         0.0,
                         invMass1 + invMass2);

      mat2 K2 = new mat2( invI1 * r1.y * r1.y,
                         -invI1 * r1.x * r1.y,
                         -invI1 * r1.x * r1.y,
                          invI1 * r1.x * r1.x);

      mat2 K3 = new mat2( invI2 * r2.y * r2.y,
                         -invI2 * r2.x * r2.y,
                         -invI2 * r2.x * r2.y,
                          invI2 * r2.x * r2.x);

      K1.add(K2).add(K3);
      imp = MathBox.solve22(K1, C.negate()); // just leave c negated

      // using C as temp variable
      C.setFrom(imp).scale(b1.invMass);
      b1.sweep.center.sub(C);
      b1.sweep.angle -= b1.invInertia * cross(r1, imp);

      C.setFrom(imp).scale(b2.invMass);
      b2.sweep.center.add(C);
      b2.sweep.angle += b2.invInertia * cross(r2, imp);

      b1.synchronizeTransform();
      b2.synchronizeTransform();
    }

    return positionError <= Settings.LINEAR_SLOP && angularError <=
        Settings.ANGULAR_SLOP;
  }

  void getAnchorA(vec2 argOut) {
    bodyA.getWorldPointToOut(localAnchor1, argOut);
  }

  void getAnchorB(vec2 argOut) {
    bodyB.getWorldPointToOut(localAnchor2, argOut);
  }

  void getReactionForce(num inv_dt, vec2 argOut) {
    argOut.setValues(impulse.x, impulse.y).scale(inv_dt);
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
    assert (lower <= upper);
    bodyA.awake = true;
    bodyB.awake = true;
    lowerAngle = lower;
    upperAngle = upper;
  }
}

