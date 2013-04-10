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
 * A distance joint constrains two points on two bodies
 * to remain at a fixed distance from each other. You can view
 * this as a massless, rigid rod.
 */

part of box2d;

class DistanceJoint extends Joint {
  final vec2 localAnchor1;
  final vec2 localAnchor2;
  final vec2 u;
  num impulse;

  /** Effective mass for the constraint. */
  num mass;
  num length;
  num frequencyHz;
  num dampingRatio;
  num gamma;
  num bias;

  DistanceJoint(DistanceJointDef def) :
    super(def),
    localAnchor1 = new vec2.copy(def.localAnchorA),
    localAnchor2 = new vec2.copy(def.localAnchorB),
    length = def.length,
    impulse = 0.0,
    u = new vec2.zero(),
    frequencyHz = def.frequencyHz,
    dampingRatio = def.dampingRatio,
    gamma = 0.0,
    bias = 0.0 { }

  void getAnchorA(vec2 argOut) {
    bodyA.getWorldPointToOut(localAnchor1, argOut);
  }

  void getAnchorB(vec2 argOut) {
    bodyB.getWorldPointToOut(localAnchor2, argOut);
  }

  void getReactionForce(num inv_dt, vec2 argOut) {
    // TODO(dominic): vector cleanup
    argOut.x = impulse * u.x * inv_dt;
    argOut.y = impulse * u.y * inv_dt;
  }

  num getReactionTorque(num inv_dt) {
    return 0.0;
  }

  void initVelocityConstraints(TimeStep time_step) {
    final Body b1 = bodyA;
    final Body b2 = bodyB;

    vec2 r1 = new vec2.zero();
    vec2 r2 = new vec2.zero();

    // Compute the effective mass matrix.
    r1.copyFrom(localAnchor1).sub(b1.localCenter);
    r2.copyFrom(localAnchor2).sub(b2.localCenter);
    b1.originTransform.rotation.transform(r1);
    b2.originTransform.rotation.transform(r2);

    u.copyFrom(b2.sweep.center).add(r2).sub(b1.sweep.center).sub(r1);

    // Handle singularity.
    num len = u.length;
    if (len > Settings.LINEAR_SLOP) {
      u.scale(1.0 / len);
    } else {
      u.splat(0.0);
    }

    num cr1u = cross(r1, u);
    num cr2u = cross(r2, u);

    num invMass = b1.invMass + b1.invInertia * cr1u * cr1u + b2.invMass
        + b2.invInertia * cr2u * cr2u;
    assert (invMass > Settings.EPSILON);
    mass = 1.0 / invMass;

    if (frequencyHz > 0.0) {
      num C = len - length;

      // Frequency
      num omega = MathBox.TWO_PI * frequencyHz;

      // Damping coefficient
      num d = 2.0 * mass * dampingRatio * omega;

      // Spring stiffness
      num k = mass * omega * omega;

      // magic formulas
      gamma = time_step.dt * (d + time_step.dt * k);
      gamma = gamma != 0.0 ? 1.0 / gamma : 0.0;
      bias = C * time_step.dt * k * gamma;

      mass = invMass + gamma;
      mass = mass != 0.0 ? 1.0 / mass : 0.0;
    }

    if (time_step.warmStarting) {
      // Scale the impulse to support a variable time time_step.
      impulse *= time_step.dtRatio;

      vec2 P = new vec2.zero();
      P.copyFrom(u).scale(impulse);

      b1.linearVelocity.x -= b1.invMass * P.x;
      b1.linearVelocity.y -= b1.invMass * P.y;
      b1.angularVelocity -= b1.invInertia * cross(r1, P);

      b2.linearVelocity.x += b2.invMass * P.x;
      b2.linearVelocity.y += b2.invMass * P.y;
      b2.angularVelocity += b2.invInertia * cross(r2, P);
    } else {
      impulse = 0.0;
    }
  }

  void solveVelocityConstraints(TimeStep time_step) {
    final Body b1 = bodyA;
    final Body b2 = bodyB;

    final vec2 r1 = localAnchor1 - b1.localCenter;
    final vec2 r2 = localAnchor2 - b2.localCenter;

    b1.originTransform.rotation.transform(r1);
    b2.originTransform.rotation.transform(r2);

    final v1 = cross(b1.angularVelocity, r1);
    final v2 = cross(b2.angularVelocity, r2);
    v1.add(b1.linearVelocity);
    v2.add(b2.linearVelocity);

    num Cdot = dot(u, v2.sub(v1));

    num imp = -mass * (Cdot + bias + gamma * impulse);
    impulse += imp;

    num Px = imp * u.x;
    num Py = imp * u.y;
    b1.linearVelocity.x -= b1.invMass * Px;
    b1.linearVelocity.y -= b1.invMass * Py;
    b1.angularVelocity -= b1.invInertia * (r1.x * Py - r1.y * Px);
    b2.linearVelocity.x += b2.invMass * Px;
    b2.linearVelocity.y += b2.invMass * Py;
    b2.angularVelocity += b2.invInertia * (r2.x * Py - r2.y * Px);
  }

  bool solvePositionConstraints(num baumgarte) {
    if (frequencyHz > 0.0) {
      return true;
    }

    final b1 = bodyA;
    final b2 = bodyB;

    final vec2 r1 = localAnchor1 - b1.localCenter;
    final vec2 r2 = localAnchor2 - b2.localCenter;

    b1.originTransform.rotation.transform(r1);
    b2.originTransform.rotation.transform(r2);

    final vec2 d = b2.sweep.center + r2 - (b1.sweep.center + r1);

    num len = d.length;
    d.normalize();
    num C = len - length;
    C = clamp(C, -Settings.MAX_LINEAR_CORRECTION, Settings.MAX_LINEAR_CORRECTION);

    num imp = -mass * C;
    u.copyFrom(d);
    num Px = imp * u.x;
    num Py = imp * u.y;

    b1.sweep.center.x -= b1.invMass * Px;
    b1.sweep.center.y -= b1.invMass * Py;
    b1.sweep.angle -= b1.invInertia * (r1.x * Py - r1.y * Px);

    b2.sweep.center.x += b2.invMass * Px;
    b2.sweep.center.y += b2.invMass * Py;
    b2.sweep.angle += b2.invInertia * (r2.x * Py - r2.y * Px);

    b1.synchronizeTransform();
    b2.synchronizeTransform();

    return C.abs() < Settings.LINEAR_SLOP;
  }
}
