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

class FrictionJointDef extends JointDef {
  /** The local anchor point relative to bodyA's origin. */
  final vec2 localAnchorA;

  /** The local anchor point relative to bodyB's origin. */
  final vec2 localAnchorB;

  /** The maximum friction force in N. */
  num maxForce;

  /** The maximum friction torque in N-m. */
  num maxTorque;

  FrictionJointDef()
      : super(),
        localAnchorA = new vec2(0.0, 0.0),
        localAnchorB = new vec2(0.0, 0.0),
        maxForce = 0.0,
        maxTorque = 0.0 {
    type = JointType.FRICTION;
  }

  void initialize(Body bA, Body bB, vec2 anchor) {
    bodyA = bA;
    bodyB = bB;
    bA.getLocalPointToOut(anchor, localAnchorA);
    bB.getLocalPointToOut(anchor, localAnchorB);
  }
}
