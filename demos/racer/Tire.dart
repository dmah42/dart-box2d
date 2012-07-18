class Tire {
  Body _body;
  double _maxForwardSpeed;
  double _maxBackwardSpeed;
  double _maxDriveForce;
  double _maxLateralImpulse;
  double _currentTraction;
  // This can't be a Set as GroundArea is not hashable. Handle uniqueness
  // manually.
  final List<GroundArea> _groundAreas;

  Tire(World world)
      : _groundAreas = new List<GroundArea>() {
    BodyDef def = new BodyDef();
    def.type = BodyType.DYNAMIC;
    _body = world.createBody(def);

    PolygonShape polygonShape = new PolygonShape();
    polygonShape.setAsBox(0.5, 1.25);
    Fixture fixture = _body.createFixtureFromShape(polygonShape, 1.0);
    fixture.userData = this;

    _currentTraction = 1.0;
  }

  void setCharacteristics(double maxForwardSpeed, double maxBackwardSpeed,
      double maxDriveForce, double maxLateralImpulse) {
    _maxForwardSpeed = maxForwardSpeed;
    _maxBackwardSpeed = maxBackwardSpeed;
    _maxDriveForce = maxDriveForce;
    _maxLateralImpulse = maxLateralImpulse;
  }

  void addGroundArea(GroundArea ga) {
    if (_groundAreas.indexOf(ga) === -1) {
      _groundAreas.add(ga);
      _updateTraction();
    }
  }

  void removeGroundArea(GroundArea ga) {
    var index = _groundAreas.indexOf(ga);
    if (index !== -1) {
      _groundAreas.removeRange(index, 1);
      _updateTraction();
    }
  }

  void _updateTraction() {
    if (_groundAreas.isEmpty()) {
      _currentTraction = 1.0;
    } else {
      _currentTraction = 0.0;
      _groundAreas.forEach((element) {
        _currentTraction = Math.max(_currentTraction, element.frictionModifier);
      });
      print("$_currentTraction");
    }
  }

  Vector get lateralVelocity() {
    Vector currentRightNormal = _body.getWorldVector(new Vector(1.0, 0.0));
    return currentRightNormal.mulLocal(Vector.dot(currentRightNormal,
                                                  _body.linearVelocity));
  }

  Vector get forwardVelocity() {
    Vector currentForwardNormal = _body.getWorldVector(new Vector(0.0, 1.0));
    return currentForwardNormal.mulLocal(Vector.dot(currentForwardNormal,
                                                    _body.linearVelocity));
  }

  void updateFriction() {
    Vector impulse = lateralVelocity.mulLocal(-_body.mass);
    if (impulse.length > _maxLateralImpulse)
      impulse.mulLocal(_maxLateralImpulse / impulse.length);
    _body.applyLinearImpulse(impulse.mulLocal(_currentTraction),
                             _body.worldCenter);
    _body.applyAngularImpulse(
        0.1 * _currentTraction * _body.inertia * (-_body.angularVelocity));

    Vector currentForwardNormal = forwardVelocity;
    double currentForwardSpeed = currentForwardNormal.length;
    currentForwardNormal.normalize();
    double dragForceMagnitude = -2 * currentForwardSpeed;
    _body.applyForce(
        currentForwardNormal.mulLocal(_currentTraction * dragForceMagnitude),
        _body.worldCenter);
  }

  void updateDrive(int controlState) {
    double desiredSpeed = 0.0;
    switch (controlState & (ControlState.UP | ControlState.DOWN)) {
      case ControlState.UP: desiredSpeed = _maxForwardSpeed; break;
      case ControlState.DOWN: desiredSpeed = _maxBackwardSpeed; break;
      default: return;
    }

    Vector currentForwardNormal = _body.getWorldVector(new Vector(0.0, 1.0));
    double currentSpeed = Vector.dot(forwardVelocity, currentForwardNormal);
    double force = 0.0;
    if (desiredSpeed < currentSpeed)
      force = -_maxDriveForce;
    else if (desiredSpeed > currentSpeed)
      force = _maxDriveForce;

    if (force.abs() > 0) {
      _body.applyForce(currentForwardNormal.mulLocal(_currentTraction * force),
                       _body.worldCenter);
    }
  }

  void updateTurn(int controlState) {
    double desiredTorque = 0.0;
    switch (controlState & (ControlState.LEFT | ControlState.RIGHT)) {
      case ControlState.LEFT: desiredTorque = 15.0; break;
      case ControlState.RIGHT: desiredTorque = -15.0; break;
    }
    _body.applyTorque(desiredTorque);
  }
}
