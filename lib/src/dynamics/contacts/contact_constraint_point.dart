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

class ContactConstraintPoint {
  final Vector2 localPoint = new Vector2.zero();
  //TODO(gregbglw): Find out what rA and rB mean and change the names.
  final Vector2 rA = new Vector2.zero();
  final Vector2 rB = new Vector2.zero();

  double normalImpulse = 0.0;
  double tangentImpulse = 0.0;
  double normalMass = 0.0;
  double tangentMass = 0.0;
  double velocityBias = 0.0;

  /** Constructs a new ContactConstraintPoint. */
  ContactConstraintPoint();

  /** Sets this point equal to the given point. */
  void setFrom(ContactConstraintPoint cp) {
    localPoint.setFrom(cp.localPoint);
    rA.setFrom(cp.rA);
    rB.setFrom(cp.rB);
    normalImpulse = cp.normalImpulse;
    tangentImpulse = cp.tangentImpulse;
    normalMass = cp.normalMass;
    tangentMass = cp.tangentMass;
    velocityBias = cp.velocityBias;
  }

  String toString() {
    return "normal impulse: $normalImpulse, tangentImpulse: $tangentImpulse"
        ", normalMass: $normalMass, tangentMass: $tangentMass"
        ", velocityBias: $velocityBias, localPoint: $localPoint"
        ", rA: $rA, rB: $rB";
  }
}
