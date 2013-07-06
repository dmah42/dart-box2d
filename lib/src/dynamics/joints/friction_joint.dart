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

class FrictionJoint extends Joint {
  final Vector2 _localAnchorA;
  final Vector2 _localAnchorB;

  Vector2 _linearImpulse;
  double _angularImpulse;
  double _maxForce;
  double _maxTorque;

  FrictionJoint(FrictionJointDef def)
      : _localAnchorA = new Vector2.copy(def.localAnchorA),
        _localAnchorB = new Vector2.copy(def.localAnchorB),
        _linearImpulse = new Vector2.zero(),
        _angularImpulse = 0.0,
        _maxForce = def.maxForce,
        _maxTorque = def.maxTorque,
        super(def);

  Vector2 getLocalAnchorA(Vector2 argOut) {
    bodyA.getWorldPointToOut(_localAnchorA, argOut);
  }

  Vector2 getLocalAnchorB(Vector2 argOut) {
    bodyB.getWorldPointToOut(_localAnchorB, argOut);
  }

  void getReactionForce(num inv_dt, Vector2 argOut) {
    argOut.setFrom(_linearImpulse).scale(inv_dt);
  }

  double getReactionTorque(num inv_dt) => inv_dt * _angularImpulse;

  void set maxForce(num force) {
    assert(force >= 0.0);
    _maxForce = force;
  }

  double get maxForce => _maxForce;

  void set maxTorque(num torque) {
    assert(torque >= 0.0);
    _maxTorque = torque;
  }

  double get maxTorque => _maxTorque;

  void initVelocityConstraints(TimeStep step) {
    // Compute the effective mass matrix.
    Vector2 r1 = new Vector2.zero();
    Vector2 r2 = new Vector2.zero();

    r1.setFrom(_localAnchorA).sub(bodyA.localCenter);
    r2.setFrom(_localAnchorB).sub(bodyB.localCenter);
    Matrix2_mulMatrixAndVectorToOut(bodyA.originTransform.rotation, r1, r1);
    Matrix2_mulMatrixAndVectorToOut(bodyB.originTransform.rotation, r2, r2);

    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]

    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]

    Matrix2 K = new Matrix2(bodyA.invMass + bodyB.invMass +
        bodyA.invInertia * r1.y * r1.y + bodyB.invInertia * r2.y * r2.y,
        -bodyA.invInertia * r1.x * r1.y - bodyB.invInertia * r2.x * r2.y,
        -bodyA.invInertia * r1.x * r1.y - bodyB.invInertia * r2.x * r2.y,
        bodyA.invMass + bodyB.invMass +
        bodyA.invInertia * r1.x * r1.x + bodyB.invInertia * r2.x * r2.x);

    Matrix2 linearMass = new Matrix2.copy(K);
    linearMass.invert();

    num angularMass = bodyA.invInertia + bodyB.invInertia;
    if (angularMass > 0.0) {
      angularMass = 1.0 / angularMass;
    }

    if (step.warmStarting) {
      // Scale impulses.
      _linearImpulse.scale(step.dtRatio);
      _angularImpulse *= step.dtRatio;

      Vector2 P = new Vector2.zero();
      P.setFrom(_linearImpulse);

      bodyA.linearVelocity.x -= bodyA.invMass * P.x;
      bodyA.linearVelocity.y -= bodyA.invMass * P.y;
      bodyA.angularVelocity -= bodyA.invInertia * (r1.cross(P) + _angularImpulse);

      bodyB.linearVelocity.x += bodyB.invMass * P.x;
      bodyB.linearVelocity.y += bodyB.invMass * P.y;
      bodyB.angularVelocity += bodyB.invInertia * (r2.cross(P) + _angularImpulse);
    } else {
      _linearImpulse.setZero();
      _angularImpulse = 0.0;
    }
  }

  void solveVelocityConstraints(TimeStep step) {
    // Solve angular friction
    {
      final num Cdot = bodyB.angularVelocity - bodyA.angularVelocity;
      num angularMass = bodyA.invInertia + bodyB.invInertia;
      if (angularMass > 0.0) {
        angularMass = 1.0 / angularMass;
      }
      num impulse = -angularMass * Cdot;

      final num oldImpulse = _angularImpulse;
      final num maxImpulse = step.dt * _maxTorque;
      _angularImpulse = MathBox.clamp(_angularImpulse + impulse, -maxImpulse, maxImpulse);
      impulse = _angularImpulse - oldImpulse;

      bodyA.angularVelocity -= bodyA.invInertia * impulse;
      bodyB.angularVelocity += bodyB.invInertia * impulse;
    }

    // Solve linear friction
    {
      Vector2 r1 = new Vector2.zero();
      Vector2 r2 = new Vector2.zero();

      r1.setFrom(_localAnchorA).sub(bodyA.localCenter);
      r2.setFrom(_localAnchorB).sub(bodyB.localCenter);
      Matrix2_mulMatrixAndVectorToOut(bodyA.originTransform.rotation, r1, r1);
      Matrix2_mulMatrixAndVectorToOut(bodyB.originTransform.rotation, r2, r2);

      Vector2 temp = new Vector2.zero();
      Vector2 Cdot = new Vector2.zero();

      Vector2_crossVectorAndNumToOut(r1, -bodyA.angularVelocity, temp);
      Vector2_crossVectorAndNumToOut(r2, -bodyB.angularVelocity, Cdot);

      Cdot.add(bodyB.linearVelocity).sub(bodyA.linearVelocity).sub(temp);

      Matrix2 K = new Matrix2(
          bodyA.invMass + bodyB.invMass +
          bodyA.invInertia * r1.y * r1.y + bodyB.invInertia * r2.y * r2.y,
          -bodyA.invInertia * r1.x * r1.y - bodyB.invInertia * r2.x * r2.y,
          -bodyA.invInertia * r1.x * r1.y - bodyB.invInertia * r2.x * r2.y,
          bodyA.invMass + bodyB.invMass +
          bodyA.invInertia * r1.x * r1.x + bodyB.invInertia * r2.x * r2.x
      );

      Matrix2 linearMass = new Matrix2.copy(K);
      linearMass.invert();

      Vector2 impulse = new Vector2.zero();
      Matrix2_mulMatrixAndVectorToOut(linearMass, Cdot, impulse);
      impulse.negate();

      Vector2 oldImpulse = new Vector2.zero();
      oldImpulse.setFrom(_linearImpulse);
      _linearImpulse.add(impulse);

      num maxImpulse = step.dt * _maxForce;
      if (_linearImpulse.length2 > maxImpulse * maxImpulse) {
        _linearImpulse.normalize();
        _linearImpulse.scale(maxImpulse);
      }

      impulse.setFrom(_linearImpulse).sub(oldImpulse);

      bodyA.linearVelocity.x -= impulse.x * bodyA.invMass;
      bodyA.linearVelocity.y -= impulse.y * bodyA.invMass;
      bodyA.angularVelocity -= bodyA.invInertia * r1.cross(impulse);

      bodyB.linearVelocity.x += impulse.x * bodyB.invMass;
      bodyB.linearVelocity.y += impulse.y * bodyB.invMass;
      bodyB.angularVelocity += bodyB.invInertia * r2.cross(impulse);
    }
  }

  bool solvePositionConstraints(num baumgarte) => true;
}
