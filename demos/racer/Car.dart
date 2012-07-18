class Car {
  Body _body;
  final List<Tire> _tires;
  RevoluteJoint _flJoint, _frJoint;

  Car(World world) : _tires = new List<Tire>(4) {
    BodyDef def = new BodyDef();
    def.type = BodyType.DYNAMIC;
    _body = world.createBody(def);
    _body.angularDamping = 3;

    List<Vector> vertices = new List<Vector>(8);
    vertices[0] = new Vector( 1.5, 0.0);
    vertices[1] = new Vector( 3.0, 2.5);
    vertices[2] = new Vector( 2.8, 5.5);
    vertices[3] = new Vector( 1.0, 10.0);
    vertices[4] = new Vector(-1.0, 10.0);
    vertices[5] = new Vector(-2.8, 5.5);
    vertices[6] = new Vector(-3.0, 2.5);
    vertices[7] = new Vector(-1.5, 0.0);

    PolygonShape shape = new PolygonShape();
    shape.setFrom(vertices, vertices.length);

    Fixture fixture = _body.createFixtureFromShape(shape, 0.1);

    RevoluteJointDef jointDef = new RevoluteJointDef();
    jointDef.bodyA = _body;
    jointDef.enableLimit = true;
    jointDef.lowerAngle = 0.0;
    jointDef.upperAngle = 0.0;
    jointDef.localAnchorB.setZero();

    // TODO(dominich): const
    double maxForwardSpeed = 250.0;
    double maxBackwardSpeed = -40.0;
    double backTireMaxDriveForce = 300.0;
    double frontTireMaxDriveForce = 500.0;
    double backTireMaxLateralImpulse = 8.5;
    double frontTireMaxLateralImpulse = 7.5;

    Tire blTire = new Tire(world);
    blTire.setCharacteristics(maxForwardSpeed, maxBackwardSpeed,
        backTireMaxDriveForce, backTireMaxLateralImpulse);
    jointDef.bodyB = blTire._body;
    jointDef.localAnchorA.setCoords(-3.0, 0.75);
    world.createJoint(jointDef);
    _tires[0] = blTire;

    Tire brTire = new Tire(world);
    brTire.setCharacteristics(maxForwardSpeed, maxBackwardSpeed,
        backTireMaxDriveForce, backTireMaxLateralImpulse);
    jointDef.bodyB = brTire._body;
    jointDef.localAnchorA.setCoords(3.0, 0.75);
    world.createJoint(jointDef);
    _tires[1] = brTire;

    Tire flTire = new Tire(world);
    flTire.setCharacteristics(maxForwardSpeed, maxBackwardSpeed,
        frontTireMaxDriveForce, frontTireMaxLateralImpulse);
    jointDef.bodyB = flTire._body;
    jointDef.localAnchorA.setCoords(-3.0, 8.5);
    _flJoint = world.createJoint(jointDef);
    _tires[2] = flTire;

    Tire frTire = new Tire(world);
    frTire.setCharacteristics(maxForwardSpeed, maxBackwardSpeed,
        frontTireMaxDriveForce, frontTireMaxLateralImpulse);
    jointDef.bodyB = frTire._body;
    jointDef.localAnchorA.setCoords(3.0, 8.5);
    _frJoint = world.createJoint(jointDef);
    _tires[3] = frTire;
  }

  void update(int controlState) {
    for (var i = 0; i < _tires.length; ++i)
      _tires[i].updateFriction();
    for (var i = 0; i < _tires.length; ++i)
      _tires[i].updateDrive(controlState);

    // Steering.
    // TODO(dominich): const
    double lockAngle = MathBox.degToRad(35);
    double turnSpeedPerSec = MathBox.degToRad(160);
    double turnPerTimeStep = turnSpeedPerSec / 60.0;
    double desiredAngle = 0.0;
    switch (controlState & (ControlState.LEFT | ControlState.RIGHT)) {
      case ControlState.LEFT: desiredAngle = lockAngle; break;
      case ControlState.RIGHT: desiredAngle = -lockAngle; break;
    }
    double angleNow = _flJoint.jointAngle;
    double angleToTurn = desiredAngle - angleNow;
    angleToTurn = MathBox.clamp(angleToTurn, -turnPerTimeStep, turnPerTimeStep);
    double angle = angleNow + angleToTurn;
    _flJoint.setLimits(angle, angle);
    _frJoint.setLimits(angle, angle);
  }
}
