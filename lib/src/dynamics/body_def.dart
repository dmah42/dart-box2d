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
 * Defines a rigid body. Manipulate the properties of the definition in order
 * to create bodies with those properties. BodyDefinitions can be reused.
 */

part of box2d;

class BodyDef {
  /**
   * The body type: static, kinematic, or dynamic.
   * Note: if a dynamic body would have zero mass, the mass is set to one.
   */
  int type = BodyType.STATIC;

  /**
   * The world angle of the body in radians.
   */
  double angle = 0.0;

  /** User can store whatever they wish in here. */
  Object userData = null;

  /** The world position of the body. */
  Vector2 position = new Vector2.zero();

  /** Linear velocity of the body in world coordinates. */
  Vector2 linearVelocity = new Vector2.zero();

  /** Angular velocity of the body. */
  double angularVelocity = 0.0;

  /**
   * If true, the body will be allowed to rotate. Otherwise, its rotation will
   * be fixed.
   */
  bool fixedRotation = false;

  /** If true, this body is initially sleeping. */
  bool isSleeping;

  /**
   * Is this a fast moving body that should be prevented from tunneling
   * through other moving bodies? Note that all bodies are prevented from
   * tunneling through kinematic and static bodies. This setting is only
   * considered on dynamic bodies.
   *
   * You should use this flag sparingly since it increases processing time.
   */
  bool bullet = false;

  /** Set to false to prevent a body from ever falling asleep. */
  bool allowSleep = true;

  /**
   * Linear damping is used to reduce the linear velocity. The damping
   * parameter can be larger than 1.0 but the damping effect becomes
   * sensitive to the time step when the damping parameter is large.
   */
  double linearDamping = 0.0;

  /**
   * Angular damping is used to reduce the angular velocity. The
   * damping parameter can be larger than 1.0 but the damping effect
   * becomes sensitive to time step when the damping parameter is large.
   */
  double angularDamping = 0.0;

  /** Is this body initially awake or asleep? */
  bool awake = true;

  /** If true, this body starts out active. */
  bool active = true;

  /**
   * Constructs a new BodyDef with default values.
   */
  BodyDef();
}
