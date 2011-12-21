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

class ContactConstraintPoint {
  final Vector localPoint;
  //TODO(gregbglw): Find out what rA and rB mean and change the names.
  final Vector rA;
  final Vector rB;

  num normalImpulse;
  num tangentImpulse;
  num normalMass;
  num tangentMass;
  num velocityBias;

  /** Constructs a new ContactConstraintPoint. */
  ContactConstraintPoint()
    : localPoint = new Vector(),
    rA = new Vector(),
    rB = new Vector(),
    normalImpulse = 0,
    tangentImpulse = 0,
    normalMass = 0,
    tangentMass = 0,
    velocityBias = 0 {}

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
    return "normal impulse: " + normalImpulse + ", tangentImpulse: " +
        tangentImpulse + ", normalMass: " + normalMass + ", tangentMass: " +
        tangentMass + ", velocityBias: " + velocityBias + ", localPoint " +
        localPoint + ", rA: " + rA + ", rB: " + rB;
  }
}
