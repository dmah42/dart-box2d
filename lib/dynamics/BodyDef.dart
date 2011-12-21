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
 * Defines a rigid body. Manipulate the properties of the definition in order
 * to create bodies with those properties. BodyDefinitions can be reused.
 */
class BodyDef {
  /**
   * The body type: static, kinematic, or dynamic.
   * Note: if a dynamic body would have zero mass, the mass is set to one.
   */
  int type;

  /**
   * The world angle of the body in radians.
   */
  num angle;

  /** User can store whatever they wish in here. */
  Object userData;

  /** The world position of the body. */
  Vector position;

  /** Linear velocity of the body in world coordinates. */
  Vector linearVelocity;

  /** Angular velocity of the body. */
  num angularVelocity;

  /**
   * If true, the body will be allowed to rotate. Otherwise, its rotation will
   * be fixed.
   */
  bool fixedRotation;

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
  bool bullet;

  /** Set to false to prevent a body from ever falling asleep. */
  bool allowSleep;

  /**
   * Linear damping is used to reduce the linear velocity. The damping
   * parameter can be larger than 1.0 but the damping effect becomes
   * sensitive to the time step when the damping parameter is large.
   */
  num linearDamping;

  /**
   * Angular damping is used to reduce the angular velocity. The
   * damping parameter can be larger than 1.0 but the damping effect
   * becomes sensitive to time step when the damping parameter is large.
   */
  num angularDamping;

  /** Is this body initially awake or asleep? */
  bool awake;

  /** If true, this body starts out active. */
  bool active;

  /**
   * Constructs a new BodyDef with default values.
   */
  BodyDef() :
    userData = null,
    bullet = false,
    type = BodyType.STATIC,
    position = new Vector(),
    angle = 0,
    linearDamping = 0,
    angularDamping = 0,
    allowSleep = true,
    awake = true,
    fixedRotation = false,
    active = true,
    linearVelocity = new Vector(),
    angularVelocity = 0 { }
}
