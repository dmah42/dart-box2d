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
 *  Revolute joint definition. This requires defining an
 *  anchor point where the bodies are joined. The definition
 *  uses local anchor points so that the initial configuration
 *  can violate the constraint slightly. You also need to
 *  specify the initial relative angle for joint limits. This
 *  helps when saving and loading a game.
 *  The local anchor points are measured from the body's origin
 *  rather than the center of mass because...
 *  - You might not know where the center of mass will be.
 *  - If you add/remove shapes from a body and recompute the mass,
 *    the joints will be broken.
 */

part of box2d;

class RevoluteJointDef extends JointDef {
  /**
   *  The local anchor point relative to body1's origin.
   */
  Vector2 localAnchorA;

  /**
   *  The local anchor point relative to body2's origin.
   */
  Vector2 localAnchorB;

  /**
   *  The body2 angle minus body1 angle in the reference state (radians).
   */
  double referenceAngle;

  /**
   *  A flag to enable joint limits.
   */
  bool enableLimit;

  /**
   *  The lower angle for the joint limit (radians).
   */
  double lowerAngle;

  /**
   *  The upper angle for the joint limit (radians).
   */
  double upperAngle;

  /**
   *  A flag to enable the joint motor.
   */
  bool enableMotor;

  /**
   *  The desired motor speed. Usually in radians per second.
   */
  double motorSpeed;

  /**
   *  The maximum motor torque used to achieve the desired motor speed.
   *  Usually in N-m.
   */
  double maxMotorTorque;

  RevoluteJointDef() :
    super(),
    localAnchorA = new Vector2(0.0, 0.0),
    localAnchorB = new Vector2(0.0, 0.0),
    referenceAngle = 0.0,
    lowerAngle = 0.0,
    upperAngle = 0.0,
    maxMotorTorque = 0.0,
    motorSpeed = 0.0,
    enableLimit = false,
    enableMotor = false {
    type = JointType.REVOLUTE;
  }

  /**
   * Initialize the bodies, anchors, and reference angle using the world
   * anchor.
   */
  void initialize(Body b1, Body b2, Vector2 anchor) {
    bodyA = b1;
    bodyB = b2;
    bodyA.getLocalPointToOut(anchor, localAnchorA);
    bodyB.getLocalPointToOut(anchor, localAnchorB);
    referenceAngle = bodyA.angle - bodyB.angle;
  }
}
