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
 * A rigid body. Bodies are created using World.createBody.
 */

part of box2d;

class Body {
  /** Flags for different states the body can take on. */
  static const int ISLAND_FLAG = 0x0001;
  static const int AWAKE_FLAG = 0x0002;
  static const int AUTO_SLEEP_FLAG = 0x0004;
  static const int BULLET_FLAG = 0x0008;
  static const int FIXED_ROTATION_FLAG = 0x0010;
  static const int ACTIVE_FLAG = 0x0020;
  static const int TO_I_FLAG = 0x0040;

  /** Forces applied on the body. */
  final Vector2 _force = new Vector2.zero();

  /** The linear velocity of this body. */
  final Vector2 _linearVelocity;

  /** The body origin transform. */
  final Transform originTransform = new Transform();

  /** The swept motion for CCD. */
  final Sweep sweep = new Sweep();

  /** Private pool of objects for internal use. */
  final FixtureDef _fixDef = new FixtureDef();
  final MassData _pmd = new MassData();
  final Transform _pxf = new Transform();
  final Vector2 oldCenter = new Vector2.zero();
  final Vector2 tempCenter = new Vector2.zero();

  World world;

  int flags = 0;

  ContactEdge contactList = null;

  double sleepTime = 0.0;

  /** User can store what they want in here. */
  Object userData;


  /** The angular velocity of this body. */
  double _angularVelocity = 0.0;

  /** This body's mass. */
  double mass;

  /** The inverse of the body mass. */
  double invMass;

  /** For mantaining the linked list of bodies. */
  Body next = null;
  Body prev = null;

  Fixture fixtureList = null;
  int fixtureCount = 0;

  JointEdge jointList = null;

  double _torque = 0.0;

  /** Rotational intertia about the center of mass. */
  double _inertia = 0.0;

  /** The inverse of the intertia about the center of mass. */
  double invInertia = 0.0;

  double linearDamping;

  double angularDamping;

  /** This body's type. See BodyType.dart. */
  int _type;

  int islandIndex;

  Body(BodyDef bd, this.world)
      : _linearVelocity = new Vector2.copy(bd.linearVelocity),
        linearDamping = bd.linearDamping,
        angularDamping = bd.angularDamping,
        userData = bd.userData,
        _type = bd.type {
    if (bd.bullet) {
      flags |= BULLET_FLAG;
    }
    if (bd.fixedRotation) {
      flags |= FIXED_ROTATION_FLAG;
    }
    if (bd.allowSleep) {
      flags |= AUTO_SLEEP_FLAG;
    }
    if (bd.awake) {
      flags |= AWAKE_FLAG;
    }
    if (bd.active) {
      flags |= ACTIVE_FLAG;
    }

    originTransform.position.setFrom(bd.position);
    originTransform.rotation.setRotation(bd.angle);
    sweep.localCenter.setZero();
    Transform.mulToOut(originTransform, sweep.localCenter, sweep.centerZero);
    sweep.center.setFrom(sweep.centerZero);
    sweep.angle = bd.angle;
    sweep.angleZero = bd.angle;

    if (_type == BodyType.DYNAMIC) {
      mass = 1.0;
      invMass = 1.0;
    } else {
      mass = 0.0;
      invMass = 0.0;
    }
  }

  /**
   * Creates a fixture and attach it to this body. Use this function if you need
   * to set some fixture parameters, like friction. Otherwise you can create the
   * fixture directly from a shape.
   * If the density is non-zero, this function automatically updates the mass
   * of the body.
   * Contacts are not created until the next time step.
   */
  Fixture createFixture(FixtureDef def) {
    assert(world.locked == false);

    Fixture fixture = new Fixture();
    fixture.create(this, def);

    if ((flags & ACTIVE_FLAG) == ACTIVE_FLAG) {
      BroadPhase broadPhase = world._contactManager.broadPhase;
      fixture.createProxy(broadPhase, originTransform);
    }

    fixture.next = fixtureList;
    fixtureList = fixture;
    ++fixtureCount;

    fixture.body = this;

    // Adjust mass properties if needed.
    if (fixture.density > 0.0) {
      resetMassData();
    }

    // Let the world know we have a new fixture. This will cause new contacts
    // to be created at the beginning of the next time step.
    world._flags |= World.NEW_FIXTURE;

    return fixture;
  }

  /**
   * Creates a fixture from a shape and attach it to this body.
   * This is a convenience function. Use FixtureDef if you need to set
   * parameters like friction, restitution, user data, or filtering.
   * If the density is non-zero, this function automatically updates the mass
   * of the body.
   */
  Fixture createFixtureFromShape(Shape shape, [double density = 0.0]) {
    _fixDef.shape = shape;
    _fixDef.density = density;

    return createFixture(_fixDef);
  }

  /**
   * Destroy a fixture. This removes the fixture from the broad-phase and
   * destroys all contacts associated with this fixture. This will
   * automatically adjust the mass of the body if the body is dynamic and the
   * fixture has positive density.
   * All fixtures attached to a body are implicitly destroyed when the body is
   * destroyed.
   */
  void destroyFixture(Fixture fixture) {
    assert(world.locked == false);
    if (world.locked == true) {
      return;
    }

    assert(fixture.body == this);

    // Remove the fixture from this body's singly linked list.
    assert(fixtureCount > 0);
    Fixture node = fixtureList;
    Fixture last = null; // java change
    bool found = false;
    while (node != null) {
      if (node == fixture) {
        node = fixture.next;
        found = true;
        break;
      }
      last = node;
      node = node.next;
    }

    // You tried to remove a shape that is not attached to this body.
    assert(found);

    if (last == null) {
      fixtureList = fixture.next;
    } else {
      last.next = fixture.next;
    }

    // Destroy any contacts associated with the fixture.
    ContactEdge edge = contactList;
    while (edge != null) {
      Contact c = edge.contact;
      edge = edge.next;

      Fixture fixtureA = c.fixtureA;
      Fixture fixtureB = c.fixtureB;

      if (fixture == fixtureA || fixture == fixtureB) {
        // This destroys the contact and removes it from
        // this body's contact list.
        world._contactManager.destroy(c);
      }
    }

    if ((flags & ACTIVE_FLAG) == ACTIVE_FLAG) {
      assert(fixture.proxy != null);
      BroadPhase broadPhase = world._contactManager.broadPhase;
      fixture.destroyProxy(broadPhase);
    } else {
      assert(fixture.proxy == null);
    }

    fixture.destroy();
    fixture.body = null;
    fixture.next = null;
    fixture = null;

    --fixtureCount;

    // Reset the mass data.
    resetMassData();
  }

  /**
   * Set the position of the body's origin and rotation.
   * This breaks any contacts and wakes the other bodies.
   * Manipulating a body's transform may cause non-physical behavior.
   */
  void setTransform(Vector2 argPosition, double argAngle) {
    assert (world.locked == false);
    if (world.locked == true) {
      return;
    }

    originTransform.rotation.setRotation(argAngle);
    originTransform.position.setFrom(argPosition);

    Transform.mulToOut(originTransform, sweep.localCenter, sweep.centerZero);
    sweep.center.setFrom(sweep.centerZero);

    sweep.angleZero = argAngle;
    sweep.angle = argAngle;

    BroadPhase broadPhase = world._contactManager.broadPhase;
    for (Fixture f = fixtureList; f != null; f = f.next) {
      f.synchronize(broadPhase, originTransform, originTransform);
    }

    world._contactManager.findNewContacts();
  }

  /**
   * Get the world body origin position. Do not modify.
   */
  Vector2 get position => originTransform.position;

  /**
   * Get the angle in radians.
   */
  double get angle => sweep.angle;

  /**
   * Get the world position of the center of mass. Do not modify.
   */
  Vector2 get worldCenter => sweep.center;

  /**
   * Get the local position of the center of mass. Do not modify.
   */
  Vector2 get localCenter => sweep.localCenter;

  Vector2 get linearVelocity => _linearVelocity;

  void set linearVelocity(Vector2 v) {
    if (_type == BodyType.STATIC) {
      return;
    }

    if (v.dot(v) > 0.0) {
      awake = true;
    }

    _linearVelocity.setFrom(v);
  }

  double get angularVelocity => _angularVelocity;

  void set angularVelocity(double w) {
    if (_type != BodyType.STATIC) {
      // Set awake if want to set velocity to non-zero value.
      if (w * w > 0) {
        awake = true;
      }

      _angularVelocity = w;
    }
  }

  /**
   * Apply a force at a world point. If the force is not
   * applied at the center of mass, it will generate a torque and
   * affect the angular velocity. This wakes up the body.
   *
   * force
   *   the world force vector, usually in Newtons (N).
   * point
   *   the world position of the point of application.
   */
  void applyForce(Vector2 force, Vector2 point) {
    if (_type != BodyType.DYNAMIC) {
      return;
    }

    awake = true;

    _force.x += force.x;
    _force.y += force.y;

    _torque += (point.x - sweep.center.x) * force.y - (point.y - sweep.center.y)
        * force.x;
  }

  /**
   * Apply a torque. This affects the angular velocity
   * without affecting the linear velocity of the center of mass.
   * This wakes up the body.
   *
   * torque
   *   about the z-axis (out of the screen), usually in N-m.
   */
  void applyTorque(double torque) {
    if (_type != BodyType.DYNAMIC) {
      return;
    }

    awake = true;

    _torque += torque;
  }

  /**
   * Apply an impulse at a point. This immediately modifies the velocity.
   * It also modifies the angular velocity if the point of application
   * is not at the center of mass. This wakes up the body.
   *
   * impulse
   *   the world impulse vector, usually in N-seconds or kg-m/s.
   * point
   *   the world position of the point of application.
   */
  void applyLinearImpulse(Vector2 impulse, Vector2 point) {
    if (_type != BodyType.DYNAMIC) {
      return;
    }

    awake = true;

    _linearVelocity.x += impulse.x * invMass;
    _linearVelocity.y += impulse.y * invMass;

    _angularVelocity += invInertia * ((point.x - sweep.center.x) *
        impulse.y - (point.y - sweep.center.y) * impulse.x);
  }

  /**
   * Apply an angular impulse.
   *
   * impulse
   *   the angular impulse in units of kg*m*m/s
   */
  void applyAngularImpulse(double impulse) {
    if (_type != BodyType.DYNAMIC) {
      return;
    }

    awake = true;
    _angularVelocity += invInertia * impulse;
  }

  /**
   * Get the central rotational inertia of the body.
   *
   * returns the rotational inertia, usually in kg-m^2.
   */
  double get inertia {
    return _inertia + mass * (sweep.localCenter.x * sweep.localCenter.x +
        sweep.localCenter.y * sweep.localCenter.y);
  }

  /**
   * Get the mass data of the body. The rotational inertia is relative
   * to the center of mass. Result is returned through the given out parameter
   * data.
   */
  void getMassData(MassData data) {
    data.mass = mass;
    final Vector2 lc = sweep.localCenter;
    data.inertia = _inertia + mass * lc.length2;
    data.center.x = lc.x;
    data.center.y = lc.y;
  }

  /**
   * Set the mass properties to override the mass properties of the fixtures.
   * Note that this changes the center of mass position.
   * Note that creating or destroying fixtures can also alter the mass.
   * This function has no effect if the body isn't dynamic.
   *
   * data
   *   the mass properties.
   */
  void set massData(MassData data) {
    assert(world.locked == false);
    if (world.locked == true) {
      return;
    }

    if (_type != BodyType.DYNAMIC) {
      return;
    }

    invMass = 0.0;
    _inertia = 0.0;
    invInertia = 0.0;

    mass = data.mass;
    if (mass <= 0.0) mass = 1.0;

    invMass = 1.0 / mass;

    if (data.inertia > 0.0 && (flags & FIXED_ROTATION_FLAG) == 0) {
      _inertia = data.inertia - mass * data.center.dot(data.center);
      assert(_inertia > 0.0);
      invInertia = 1.0 / _inertia;
    }

    // Move center of mass.
    oldCenter.setFrom(sweep.center);
    sweep.localCenter.setFrom(data.center);
    Transform.mulToOut(originTransform, sweep.localCenter, sweep.centerZero);
    sweep.center.setFrom(sweep.centerZero);

    // Update center of mass velocity.
    final Vector2 temp = new Vector2.copy(sweep.center);
    temp.sub(oldCenter);
    temp.scaleOrthogonalInto(_angularVelocity, temp);
    _linearVelocity.add(temp);
  }

  /**
   * This resets the mass properties to the sum of the mass properties of the
   * fixtures.
   * This normally does not need to be called unless you called setMassData to
   * override the mass and you later want to reset the mass.
   */
  void resetMassData() {
    // Compute mass data from shapes. Each shape has its own density.
    mass = 0.0;
    invMass = 0.0;
    _inertia = 0.0;
    invInertia = 0.0;
    sweep.localCenter.setZero();

    // Static and kinematic bodies have zero mass.
    if (_type == BodyType.STATIC || _type == BodyType.KINEMATIC) {
      sweep.center.setFrom(originTransform.position);
      sweep.centerZero.setFrom(originTransform.position);
      return;
    }

    assert(_type == BodyType.DYNAMIC);

    // Accumulate mass over all fixtures.
    tempCenter.setZero();
    MassData massData = _pmd;
    for (Fixture f = fixtureList; f != null; f = f.next) {
      if (f.density == 0.0) {
        continue;
      }
      f.getMassData(massData);
      mass += massData.mass;
      final temp = new Vector2.copy(massData.center);
      temp.scale(massData.mass);
      tempCenter.add(temp);
      _inertia += massData.inertia;
    }

    // Compute center of mass.
    if (mass > 0.0) {
      invMass = 1.0 / mass;
      tempCenter.scale(invMass);
    } else {
      // Force all dynamic bodies to have a positive mass.
      mass = 1.0;
      invMass = 1.0;
    }

    if (_inertia > 0.0 && (flags & FIXED_ROTATION_FLAG) == 0) {
      // Center the inertia about the center of mass.
      _inertia -= mass * tempCenter.dot(tempCenter);
      assert(_inertia > 0.0);
      invInertia = 1.0 / _inertia;
    } else {
      _inertia = 0.0;
      invInertia = 0.0;
    }

    // Move center of mass.
    oldCenter.setFrom(sweep.center);
    sweep.localCenter.setFrom(tempCenter);
    Transform.mulToOut(originTransform, sweep.localCenter, sweep.centerZero);
    sweep.center.setFrom(sweep.centerZero);

    // Update center of mass velocity.
    final Vector2 temp = new Vector2.copy(sweep.center);
    temp.sub(oldCenter);
    temp.scaleOrthogonalInto(_angularVelocity, temp);
    _linearVelocity.add(temp);
  }

  /**
   * Get the world coordinates of a point given the local coordinates.
   *
   * localPoint
   *   a point on the body measured relative the the body's origin.
   * returns the same point expressed in world coordinates.
   */
  Vector2 getWorldPoint(Vector2 localPoint) {
    Vector2 v = new Vector2.zero();
    getWorldPointToOut(localPoint, v);
    return v;
  }

  /**
   * Get the world coordinates of a point given the local coordinates to the
   * given out parameter.
   */
  void getWorldPointToOut(Vector2 localPoint, Vector2 out) {
    Transform.mulToOut(originTransform, localPoint, out);
  }

  /**
   * Get the world coordinates of a vector given the local coordinates.
   *
   * localVector: a vector fixed in the body.
   * return the same vector expressed in world coordinates.
   */
  Vector2 getWorldVector2(Vector2 localVector) {
    Vector2 out = new Vector2.zero();
    getWorldVectorToOut(localVector, out);
    return out;
  }

  /**
   * Get the world coordinates of a vector given the local coordinates to the
   * given out paramater.
   */
  void getWorldVectorToOut(Vector2 localVector, Vector2 out) {
    originTransform.rotation.transformed(localVector, out);
  }

  /**
   * Gets a local point relative to the body's origin given a world point.
   * Returns this through the given out parameter.
   */
  void getLocalPointToOut(Vector2 worldPoint, Vector2 out) {
    Transform.mulTransToOut(originTransform, worldPoint, out);
  }

  /**
   * Gets a local point relative to the body's origin given a world point.
   *
   * worldPoint: point in world coordinates.
   * returns the corresponding local point relative to the body's origin.
   */
  Vector2 getLocalPoint(Vector2 worldPoint) {
    Vector2 out = new Vector2.zero();
    getLocalPointToOut(worldPoint, out);
    return out;
  }

  /**
   * Gets a local vector given a world vector.
   *
   * worldVector: vector in world coordinates.
   * returns the corresponding local vector.
   */
  Vector2 getLocalVector2(Vector2 worldVector) {
    Vector2 out = new Vector2.zero();
    getLocalVectorToOut(worldVector, out);
    return out;
  }

  /**
   * Gets a local vector given a world vector and stores the result in the given
   * out parameter.
   */
  void getLocalVectorToOut(Vector2 worldVector, Vector2 out) {
    originTransform.rotation.transposed().transformed(worldVector, out);
  }

  /**
   * Get the world linear velocity of a world point attached to this body.
   *
   * worldPoint: point in world coordinates.
   * returns the world velocity of a point.
   */
  Vector2 getLinearVelocityFromWorldPoint(Vector2 worldPoint) {
    Vector2 out = new Vector2.zero();
    getLinearVelocityFromWorldPointToOut(worldPoint, out);
    return out;
  }

  void getLinearVelocityFromWorldPointToOut(Vector2 worldPoint, Vector2 out) {
    out.setFrom(worldPoint).sub(sweep.center);
    out.scaleOrthogonalInto(_angularVelocity, out);
    out.add(_linearVelocity);
  }

  /**
   * Get the world velocity of a local point.
   *
   * localPoint: point in local coordinates.
   * returns the world velocity of a point.
   */
  Vector2 getLinearVelocityFromLocalPoint(Vector2 localPoint) {
    Vector2 out = new Vector2.zero();
    getLinearVelocityFromLocalPointToOut(localPoint, out);
    return out;
  }

  /**
   * Get the world velocity of a local point and store the result in the given
   * out parameter.
   */
  void getLinearVelocityFromLocalPointToOut(Vector2 localPoint, Vector2 out) {
    getWorldPointToOut(localPoint, out);
    getLinearVelocityFromWorldPointToOut(out, out);
  }

  /**
   * The type of this body. Either dynamic, static, or kinematic.
   */
  int get type => _type;

  /**
   * The type of this body. This may alter the mass and velocity.
   */
  void set type(int otherType) {
    if (_type == otherType) {
      return;
    }

    _type = otherType;

    resetMassData();

    if (_type == BodyType.STATIC) {
      _linearVelocity.setZero();
      _angularVelocity = 0.0;
    }

    awake = true;

    _force.setZero();
    _torque = 0.0;

    // Since the body type changed, we need to flag contacts for filtering.
    for (ContactEdge ce = contactList; ce != null; ce = ce.next) {
      ce.contact.flagForFiltering();
    }
  }

  /** Is this body treated like a bullet for continuous collision detection? */
  bool get bullet => (flags & BULLET_FLAG) == BULLET_FLAG;

  /**
   * Should this body be treated like a bullet for continuous collision
   * detection?
   */
  void set bullet(bool flag) {
    if (flag)
      flags |= BULLET_FLAG;
    else
      flags &= ~BULLET_FLAG;
  }

  /**
   * You can disable sleeping on this body. If you disable sleeping, the
   * body will be woken.
   */
  void set sleepingAllowed(bool flag) {
    if (flag) {
      flags |= AUTO_SLEEP_FLAG;
    } else {
      flags &= ~AUTO_SLEEP_FLAG;
      awake = true;
    }
  }

  /**
   * Is this body allowed to sleep?
   */
  bool get sleepingAllowed => (flags & AUTO_SLEEP_FLAG) == AUTO_SLEEP_FLAG;

  /**
   * The sleep state of the body. A sleeping body has very
   * low CPU cost.
   */
  void set awake(bool flag) {
    if (flag) {
      if ((flags & AWAKE_FLAG) == 0) {
        flags |= AWAKE_FLAG;
        sleepTime = 0.0;
      }
    } else {
      flags &= ~AWAKE_FLAG;
      sleepTime = 0.0;
      _linearVelocity.setZero();
      _angularVelocity = 0.0;
      _force.setZero();
      _torque = 0.0;
    }
  }

  bool get awake => (flags & AWAKE_FLAG) == AWAKE_FLAG;

  /**
   * Set the active state of the body. An inactive body is not
   * simulated and cannot be collided with or woken up.
   * If you pass a flag of true, all fixtures will be added to the
   * broad-phase.
   * If you pass a flag of false, all fixtures will be removed from
   * the broad-phase and all contacts will be destroyed.
   * Fixtures and joints are otherwise unaffected. You may continue
   * to create/destroy fixtures and joints on inactive bodies.
   * Fixtures on an inactive body are implicitly inactive and will
   * not participate in collisions, ray-casts, or queries.
   * Joints connected to an inactive body are implicitly inactive.
   * An inactive body is still owned by a World object and remains
   * in the body list.
   */
  void set active(bool flag) {
    if (flag == active) {
      return;
    }

    if (flag) {
      flags |= ACTIVE_FLAG;

      // Create all proxies.
      BroadPhase broadPhase = world._contactManager.broadPhase;
      for (Fixture f = fixtureList; f != null; f = f.next) {
        f.createProxy(broadPhase, originTransform);
      }

      // Contacts are created the next time step.
    } else {
      flags &= ~ACTIVE_FLAG;

      // Destroy all proxies.
      BroadPhase broadPhase = world._contactManager.broadPhase;
      for (Fixture f = fixtureList; f != null; f = f.next) {
        f.destroyProxy(broadPhase);
      }

      // Destroy the attached contacts.
      ContactEdge ce = contactList;
      while (ce != null) {
        ContactEdge ce0 = ce;
        ce = ce.next;
        world._contactManager.destroy(ce0.contact);
      }
      contactList = null;
    }
  }

  /**
   * Get the active state of the body.
   */
  bool get active => (flags & ACTIVE_FLAG) == ACTIVE_FLAG;

  /**
   * Set this body to have fixed rotation. This causes the mass
   * to be reset.
   */
  void set fixedRotation(bool flag) {
    if (flag)
      flags |= FIXED_ROTATION_FLAG;
    else
      flags &= ~FIXED_ROTATION_FLAG;

    resetMassData();
  }

  /**
   * Does this body have fixed rotation?
   */
  bool get fixedRotation {
    return (flags & FIXED_ROTATION_FLAG) == FIXED_ROTATION_FLAG;
  }

  void synchronizeFixtures() {
    final Transform xf1 = _pxf;
    xf1.rotation.setRotation(sweep.angleZero);
    xf1.rotation.transformed(sweep.localCenter, xf1.position);
    xf1.position.scale(-1.0);
    xf1.position.add(sweep.centerZero);

    BroadPhase broadPhase = world._contactManager.broadPhase;
    for (Fixture f = fixtureList; f != null; f = f.next)
      f.synchronize(broadPhase, xf1, originTransform);
  }

  void synchronizeTransform() {
    final double c = Math.cos(sweep.angle);
    final double s = Math.sin(sweep.angle);
    final Transform t = originTransform;
    final Matrix2 r = t.rotation;
    final Vector2 p = t.position;

    r.setValues(c, s, -s, c);

    p.x = (r.entry(0,0) * sweep.localCenter.x + r.entry(0,1) * sweep.localCenter.y) * -1 +
        sweep.center.x;
    p.y = (r.entry(1,0) * sweep.localCenter.x + r.entry(1,1) * sweep.localCenter.y) * -1 +
        sweep.center.y;
  }

  /**
   * This is used to prevent connected bodies from colliding.
   * It may lie, depending on the collideConnected flag.
   */
  bool shouldCollide(Body other) {
    // At least one body should be dynamic.
    return !(_type != BodyType.DYNAMIC && other._type != BodyType.DYNAMIC);
  }

  void advance(num t) {
    sweep.advance(t);
    sweep.center.setFrom(sweep.centerZero);
    sweep.angle = sweep.angleZero;
    synchronizeTransform();
  }
}
