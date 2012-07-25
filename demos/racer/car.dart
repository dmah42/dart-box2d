class Car {
  Car(World world) {
    final BodyDef def = new BodyDef();
    def.type = BodyType.DYNAMIC;
    _body = world.createBody(def);
    _body.userData = "Car";
    _body.angularDamping = 3;

    final List<Vector> vertices = new List<Vector>(8);
    vertices[0] = new Vector( 1.5, 0.0);
    vertices[1] = new Vector( 3.0, 2.5);
    vertices[2] = new Vector( 2.8, 5.5);
    vertices[3] = new Vector( 1.0, 10.0);
    vertices[4] = new Vector(-1.0, 10.0);
    vertices[5] = new Vector(-2.8, 5.5);
    vertices[6] = new Vector(-3.0, 2.5);
    vertices[7] = new Vector(-1.5, 0.0);

    final PolygonShape shape = new PolygonShape();
    shape.setFrom(vertices, vertices.length);

    final Fixture fixture = _body.createFixtureFromShape(shape, 0.1);

    final RevoluteJointDef jointDef = new RevoluteJointDef();
    jointDef.bodyA = _body;
    jointDef.enableLimit = true;
    jointDef.lowerAngle = 0.0;
    jointDef.upperAngle = 0.0;
    jointDef.localAnchorB.setZero();

    _blTire = new Tire(world, maxForwardSpeed, maxBackwardSpeed,
        backTireMaxDriveForce, backTireMaxLateralImpulse);
    jointDef.bodyB = _blTire._body;
    jointDef.localAnchorA.setCoords(-3.0, 0.75);
    world.createJoint(jointDef);

    _brTire = new Tire(world, maxForwardSpeed, maxBackwardSpeed,
        backTireMaxDriveForce, backTireMaxLateralImpulse);
    jointDef.bodyB = _brTire._body;
    jointDef.localAnchorA.setCoords(3.0, 0.75);
    world.createJoint(jointDef);

    _flTire = new Tire(world, maxForwardSpeed, maxBackwardSpeed,
        frontTireMaxDriveForce, frontTireMaxLateralImpulse);
    jointDef.bodyB = _flTire._body;
    jointDef.localAnchorA.setCoords(-3.0, 8.5);
    _flJoint = world.createJoint(jointDef);

    _frTire = new Tire(world, maxForwardSpeed, maxBackwardSpeed,
        frontTireMaxDriveForce, frontTireMaxLateralImpulse);
    jointDef.bodyB = _frTire._body;
    jointDef.localAnchorA.setCoords(3.0, 8.5);
    _frJoint = world.createJoint(jointDef);
  }

  void _updateFriction() {
    _blTire.updateFriction();
    _brTire.updateFriction();
    _flTire.updateFriction();
    _frTire.updateFriction();
  }

  void _updateDrive(int controlState) {
    _blTire.updateDrive(controlState);
    _brTire.updateDrive(controlState);
    _flTire.updateDrive(controlState);
    _frTire.updateDrive(controlState);
  }

  void update(int controlState) {
    _updateFriction();
    _updateDrive(controlState);

    // Steering.
    // TODO(dominich): const
    final double lockAngle = MathBox.degToRad(35);
    final double turnSpeedPerSec = MathBox.degToRad(160);
    final double turnPerTimeStep = turnSpeedPerSec / 60.0;
    double desiredAngle = 0.0;
    switch (controlState & (ControlState.LEFT | ControlState.RIGHT)) {
      case ControlState.LEFT: desiredAngle = lockAngle; break;
      case ControlState.RIGHT: desiredAngle = -lockAngle; break;
    }
    final double angleNow = _flJoint.jointAngle;
    double angleToTurn = desiredAngle - angleNow;
    angleToTurn = MathBox.clamp(angleToTurn, -turnPerTimeStep, turnPerTimeStep);
    final double angle = angleNow + angleToTurn;
    _flJoint.setLimits(angle, angle);
    _frJoint.setLimits(angle, angle);
  }

  final double maxForwardSpeed = 250.0;
  final double maxBackwardSpeed = -40.0;
  final double backTireMaxDriveForce = 300.0;
  final double frontTireMaxDriveForce = 500.0;
  final double backTireMaxLateralImpulse = 8.5;
  final double frontTireMaxLateralImpulse = 7.5;

  Body _body;
  Tire _blTire, _brTire, _flTire, _frTire;
  RevoluteJoint _flJoint, _frJoint;

}
