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
 * A manifold point is a contact point belonging to a contact manifold. It holds
 * the details of the geometry and dynamics of the contact points.
 */
class ManifoldPoint {
  /**
   * Usage depends on manifold type. For circles, is the local center of
   * circleB. For faceA, is the local center of CircleB or the clip point of
   * polygonB. For faceB, is the clip point of polygonA.
   */
  final Vector localPoint;

  /** The non-penetration impulse. */
  num normalImpulse;

  /** The friction impulse. */
  num tangentImpulse;

  /** Unique identifier for a contact point between two shapes. */
  final ContactID id;

  /**
   * Constructs a new ManifoldPoint.
   */
  ManifoldPoint() :
    localPoint = new Vector(),
    tangentImpulse = 0,
    normalImpulse = 0,
    id = new ContactID() { }

  /**
   * Constructs a new ManifoldPoint that is a copy of the given point.
   */
  ManifoldPoint.copy(ManifoldPoint other) :
    localPoint = new Vector.copy(other.localPoint),
    normalImpulse = other.normalImpulse,
    tangentImpulse = other.tangentImpulse,
    id = new ContactID.copy(other.id) { }

  /**
   * Sets this ManifoldPoint to be equal to the given point.
   */
  void setFrom(ManifoldPoint other) {
    localPoint.setFrom(other.localPoint);
    normalImpulse = other.normalImpulse;
    tangentImpulse = other.tangentImpulse;
    id.setFrom(other.id);
  }
}
