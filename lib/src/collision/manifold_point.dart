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
 * A manifold point is a contact point belonging to a contact manifold. It holds
 * the details of the geometry and dynamics of the contact points.
 */

part of box2d;

class ManifoldPoint {
  /**
   * Usage depends on manifold type. For circles, is the local center of
   * circleB. For faceA, is the local center of CircleB or the clip point of
   * polygonB. For faceB, is the clip point of polygonA.
   */
  final Vector2 localPoint;

  /** The non-penetration impulse. */
  double normalImpulse = 0.0;

  /** The friction impulse. */
  double tangentImpulse = 0.0;

  /** Unique identifier for a contact point between two shapes. */
  final ContactID id;

  /**
   * Constructs a new ManifoldPoint.
   */
  ManifoldPoint() :
    id = new ContactID(),
    localPoint = new Vector2.zero();

  /**
   * Constructs a new ManifoldPoint that is a copy of the given point.
   */
  ManifoldPoint.copy(ManifoldPoint other) :
    localPoint = new Vector2.copy(other.localPoint),
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
