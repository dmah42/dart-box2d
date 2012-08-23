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
  final vec2 _localAnchorA;
  final vec2 _localAnchorB;

  vec2 _linearImpulse;
  num _angularImpulse;
  num _maxForce;
  num _maxTorque;

  FrictionJoint(FrictionJointDef def)
      : super(def),
        _localAnchorA = new vec2.copy(def.localAnchorA),
        _localAnchorB = new vec2.copy(def.localAnchorB),
        _linearImpulse = new vec2(),
        _angularImpulse = 0.0,
        _maxForce = def.maxForce,
        _maxTorque = def.maxTorque { }

  vec2 getLocalAnchorA(vec2 argOut) {
    bodyA.getWorldPointToOut(_localAnchorA, argOut);
    return argOut;
  }

  vec2 getLocalAnchorB(vec2 argOut) {
    bodyB.getWorldPointToOut(_localAnchorB, argOut);
    return argOut;
  }

  void getReactionForce(num inv_dt, vec2 argOut) {
    argOut.copyFrom(_linearImpulse).scale(inv_dt);
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

  void initVelocityConstraints(TimeStep time_step) {
    // Compute the effective mass matrix.
    vec2 r1 = _localAnchorA - bodyA.localCenter;
    vec2 r2 = _localAnchorB - bodyB.localCenter;

    bodyA.originTransform.rotation.transform(r1);
    bodyB.originTransform.rotation.transform(r2);

    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]

    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]

    mat2 K = new mat2();
    K.col0.x = bodyA.invMass + bodyB.invMass +
               bodyA.invInertia * r1.y * r1.y + bodyB.invInertia * r2.y * r2.y;
    K.col0.y = -bodyA.invInertia * r1.x * r1.y - bodyB.invInertia * r2.x * r2.y;
    K.col1.x = K.col0.y;
    K.col1.y = bodyA.invMass + bodyB.invMass +
               bodyA.invInertia * r1.x * r1.x + bodyB.invInertia * r2.x * r2.x;

    mat2 linearMass = new mat2.copy(K);
    linearMass.invert();

    num angularMass = bodyA.invInertia + bodyB.invInertia;
    if (angularMass > 0.0) {
      angularMass = 1.0 / angularMass;
    }

    if (time_step.warmStarting) {
      // Scale impulses.
      _linearImpulse.scale(time_step.dtRatio);
      _angularImpulse *= time_step.dtRatio;

      vec2 P = new vec2.copy(_linearImpulse);

      bodyA.linearVelocity.x -= bodyA.invMass * P.x;
      bodyA.linearVelocity.y -= bodyA.invMass * P.y;
      bodyA.angularVelocity -= bodyA.invInertia * (cross(r1, P) + _angularImpulse);

      bodyB.linearVelocity.x += bodyB.invMass * P.x;
      bodyB.linearVelocity.y += bodyB.invMass * P.y;
      bodyB.angularVelocity += bodyB.invInertia * (cross(r2, P) + _angularImpulse);
    } else {
      _linearImpulse.splat(0);
      _angularImpulse = 0.0;
    }
  }

  void solveVelocityConstraints(TimeStep time_step) {
    // Solve angular friction
    {
      final num Cdot = bodyB.angularVelocity - bodyA.angularVelocity;
      num angularMass = bodyA.invInertia + bodyB.invInertia;
      if (angularMass > 0.0) {
        angularMass = 1.0 / angularMass;
      }
      num impulse = -angularMass * Cdot;

      final num oldImpulse = _angularImpulse;
      final num maxImpulse = time_step.dt * _maxTorque;
      _angularImpulse = clamp(_angularImpulse + impulse, -maxImpulse, maxImpulse);
      impulse = _angularImpulse - oldImpulse;

      bodyA.angularVelocity -= bodyA.invInertia * impulse;
      bodyB.angularVelocity += bodyB.invInertia * impulse;
    }

    // Solve linear friction
    {
      final vec2 r1 = _localAnchorA - bodyA.localCenter;
      final vec2 r2 = _localAnchorB - bodyB.localCenter;

      bodyA.originTransform.rotation.transform(r1);
      bodyB.originTransform.rotation.transform(r2);

      vec2 temp = cross(bodyA.angularVelocity, r1);
      vec2 Cdot = cross(bodyB.angularVelocity, r2);

      Cdot.add(bodyB.linearVelocity).sub(bodyA.linearVelocity).sub(temp);

      mat2 K = new mat2();
      K.col0.x = bodyA.invMass + bodyB.invMass +
                 bodyA.invInertia * r1.y * r1.y + bodyB.invInertia * r2.y * r2.y;
      K.col0.y = -bodyA.invInertia * r1.x * r1.y - bodyB.invInertia * r2.x * r2.y;
      K.col1.x = K.col0.y;
      K.col1.y = bodyA.invMass + bodyB.invMass +
                 bodyA.invInertia * r1.x * r1.x + bodyB.invInertia * r2.x * r2.x;

      mat2 linearMass = new mat2.copy(K);
      linearMass.invert();

      vec2 impulse = new vec2.copy(Cdot);
      linearMass.transform(impulse);
      impulse.negate_();

      vec2 oldImpulse = new vec2.copy(_linearImpulse);
      _linearImpulse.add(impulse);

      num maxImpulse = time_step.dt * _maxForce;
      if (_linearImpulse.length2 > maxImpulse * maxImpulse) {
        _linearImpulse.normalize();
        _linearImpulse.scale(maxImpulse);
      }

      impulse.copyFrom(_linearImpulse).sub(oldImpulse);

      bodyA.linearVelocity.x -= impulse.x * bodyA.invMass;
      bodyA.linearVelocity.y -= impulse.y * bodyA.invMass;
      bodyA.angularVelocity -= bodyA.invInertia * cross(r1, impulse);

      bodyB.linearVelocity.x += impulse.x * bodyB.invMass;
      bodyB.linearVelocity.y += impulse.y * bodyB.invMass;
      bodyB.angularVelocity += bodyB.invInertia * cross(r2, impulse);
    }
  }

  bool solvePositionConstraints(num baumgarte) => true;
}
