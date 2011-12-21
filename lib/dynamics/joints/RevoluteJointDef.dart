/*******************************************************************************
 * Copyright (c) 2011, Daniel Murphy
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 	* Redistributions of source code must retain the above copyright notice,
 * 	  this list of conditions and the following disclaimer.
 * 	* Redistributions in binary form must reproduce the above copyright notice,
 * 	  this list of conditions and the following disclaimer in the documentation
 * 	  and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 ******************************************************************************/

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
class RevoluteJointDef extends JointDef {
  /**
   *  The local anchor point relative to body1's origin.
   */
  Vector localAnchorA;

  /**
   *  The local anchor point relative to body2's origin.
   */
  Vector localAnchorB;

  /**
   *  The body2 angle minus body1 angle in the reference state (radians).
   */
  num referenceAngle;

  /**
   *  A flag to enable joint limits.
   */
  bool enableLimit;

  /**
   *  The lower angle for the joint limit (radians).
   */
  num lowerAngle;

  /**
   *  The upper angle for the joint limit (radians).
   */
  num upperAngle;

  /**
   *  A flag to enable the joint motor.
   */
  bool enableMotor;

  /**
   *  The desired motor speed. Usually in radians per second.
   */
  num motorSpeed;

  /**
   *  The maximum motor torque used to achieve the desired motor speed.
   *  Usually in N-m.
   */
  num maxMotorTorque;

  RevoluteJointDef() :
    super(),
    localAnchorA = new Vector(0.0, 0.0),
    localAnchorB = new Vector(0.0, 0.0),
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
  void initialize(Body b1, Body b2, Vector anchor) {
    bodyA = b1;
    bodyB = b2;
    bodyA.getLocalPointToOut(anchor, localAnchorA);
    bodyB.getLocalPointToOut(anchor, localAnchorB);
    referenceAngle = bodyA.angle - bodyB.angle;
  }
}
