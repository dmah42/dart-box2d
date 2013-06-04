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
  final Vector _localAnchorA;
  final Vector _localAnchorB;

  Vector _linearImpulse;
  num _angularImpulse;
  num _maxForce;
  num _maxTorque;

  FrictionJoint(FrictionJointDef def)
      : _localAnchorA = new Vector.copy(def.localAnchorA),
        _localAnchorB = new Vector.copy(def.localAnchorB),
        _linearImpulse = new Vector.zero(),
        _angularImpulse = 0.0,
        _maxForce = def.maxForce,
        _maxTorque = def.maxTorque,
        super(def);

  Vector getLocalAnchorA(Vector argOut) {
    bodyA.getWorldPointToOut(_localAnchorA, argOut);
  }

  Vector getLocalAnchorB(Vector argOut) {
    bodyB.getWorldPointToOut(_localAnchorB, argOut);
  }

  void getReactionForce(num inv_dt, Vector argOut) {
    argOut.setFrom(_linearImpulse).mulLocal(inv_dt);
  }

  num getReactionTorque(num inv_dt) => inv_dt * _angularImpulse;

  void set maxForce(num force) {
    assert(force >= 0.0);
    _maxForce = force;
  }

  num get maxForce => _maxForce;

  void set maxTorque(num torque) {
    assert(torque >= 0.0);
    _maxTorque = torque;
  }

  num get maxTorque => _maxTorque;

  void initVelocityConstraints(TimeStep step) {
    // Compute the effective mass matrix.
    Vector r1 = new Vector.zero();
    Vector r2 = new Vector.zero();

    r1.setFrom(_localAnchorA).subLocal(bodyA.localCenter);
    r2.setFrom(_localAnchorB).subLocal(bodyB.localCenter);
    Matrix22.mulMatrixAndVectorToOut(bodyA.originTransform.rotation, r1, r1);
    Matrix22.mulMatrixAndVectorToOut(bodyB.originTransform.rotation, r2, r2);

    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]

    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]

    Matrix22 K = new Matrix22();
    K.col1.x = bodyA.invMass + bodyB.invMass +
               bodyA.invInertia * r1.y * r1.y + bodyB.invInertia * r2.y * r2.y;
    K.col1.y = -bodyA.invInertia * r1.x * r1.y - bodyB.invInertia * r2.x * r2.y;
    K.col2.x = K.col1.y;
    K.col2.y = bodyA.invMass + bodyB.invMass +
               bodyA.invInertia * r1.x * r1.x + bodyB.invInertia * r2.x * r2.x;

    Matrix22 linearMass = new Matrix22();
    linearMass.setFrom(K);
    linearMass.invertLocal();

    num angularMass = bodyA.invInertia + bodyB.invInertia;
    if (angularMass > 0.0) {
      angularMass = 1.0 / angularMass;
    }

    if (step.warmStarting) {
      // Scale impulses.
      _linearImpulse.mulLocal(step.dtRatio);
      _angularImpulse *= step.dtRatio;

      Vector P = new Vector.zero();
      P.setFrom(_linearImpulse);

      bodyA.linearVelocity.x -= bodyA.invMass * P.x;
      bodyA.linearVelocity.y -= bodyA.invMass * P.y;
      bodyA.angularVelocity -= bodyA.invInertia * (Vector.crossVectors(r1, P) + _angularImpulse);

      bodyB.linearVelocity.x += bodyB.invMass * P.x;
      bodyB.linearVelocity.y += bodyB.invMass * P.y;
      bodyB.angularVelocity += bodyB.invInertia * (Vector.crossVectors(r2, P) + _angularImpulse);
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
      Vector r1 = new Vector.zero();
      Vector r2 = new Vector.zero();

      r1.setFrom(_localAnchorA).subLocal(bodyA.localCenter);
      r2.setFrom(_localAnchorB).subLocal(bodyB.localCenter);
      Matrix22.mulMatrixAndVectorToOut(bodyA.originTransform.rotation, r1, r1);
      Matrix22.mulMatrixAndVectorToOut(bodyB.originTransform.rotation, r2, r2);

      Vector temp = new Vector.zero();
      Vector Cdot = new Vector.zero();

      Vector.crossNumAndVectorToOut(bodyA.angularVelocity, r1, temp);
      Vector.crossNumAndVectorToOut(bodyB.angularVelocity, r2, Cdot);

      Cdot.addLocal(bodyB.linearVelocity).subLocal(bodyA.linearVelocity).subLocal(temp);

      Matrix22 K = new Matrix22();
      K.col1.x = bodyA.invMass + bodyB.invMass +
                 bodyA.invInertia * r1.y * r1.y + bodyB.invInertia * r2.y * r2.y;
      K.col1.y = -bodyA.invInertia * r1.x * r1.y - bodyB.invInertia * r2.x * r2.y;
      K.col2.x = K.col1.y;
      K.col2.y = bodyA.invMass + bodyB.invMass +
                 bodyA.invInertia * r1.x * r1.x + bodyB.invInertia * r2.x * r2.x;

      Matrix22 linearMass = new Matrix22();
      linearMass.setFrom(K);
      linearMass.invertLocal();

      Vector impulse = new Vector.zero();
      Matrix22.mulMatrixAndVectorToOut(linearMass, Cdot, impulse);
      impulse.negateLocal();

      Vector oldImpulse = new Vector.zero();
      oldImpulse.setFrom(_linearImpulse);
      _linearImpulse.addLocal(impulse);

      num maxImpulse = step.dt * _maxForce;
      if (_linearImpulse.lengthSquared > maxImpulse * maxImpulse) {
        _linearImpulse.normalize();
        _linearImpulse.mulLocal(maxImpulse);
      }

      impulse.setFrom(_linearImpulse).subLocal(oldImpulse);

      bodyA.linearVelocity.x -= impulse.x * bodyA.invMass;
      bodyA.linearVelocity.y -= impulse.y * bodyA.invMass;
      bodyA.angularVelocity -= bodyA.invInertia * Vector.crossVectors(r1, impulse);

      bodyB.linearVelocity.x += impulse.x * bodyB.invMass;
      bodyB.linearVelocity.y += impulse.y * bodyB.invMass;
      bodyB.angularVelocity += bodyB.invInertia * Vector.crossVectors(r2, impulse);
    }
  }

  bool solvePositionConstraints(num baumgarte) => true;
}
