#library('racer');

#import('dart:html');
#import('../../lib/box2d.dart');

#source('../demo.dart');
#source('car.dart');
#source('control_state.dart');
#source('ground_area.dart');
#source('tire.dart');

class Racer extends Demo implements ContactListener {
  static void main() {
    final racer = new Racer();
    racer.initialize();
    racer.initializeAnimation();
    racer.runAnimation();
  }

  Racer() : super.withGravity(new Vector(0, 0), 2.5);

  String get name() => null;

  void _createGround() {
    BodyDef def = new BodyDef();
    _groundBody = world.createBody(def);
    _groundBody.userData = "Ground";

    PolygonShape shape = new PolygonShape();

    FixtureDef fixtureDef = new FixtureDef();
    fixtureDef.shape = shape;
    fixtureDef.isSensor = true;

    fixtureDef.userData = new GroundArea(0.001, false);
    shape.setAsBoxWithCenterAndAngle(
        27, 21, new Vector(-30, 30), MathBox.degToRad(20));
    _groundBody.createFixture(fixtureDef);

    fixtureDef.userData = new GroundArea(0.2, false);
    shape.setAsBoxWithCenterAndAngle(
        27, 15, new Vector(20, 40), MathBox.degToRad(-40));
    _groundBody.createFixture(fixtureDef);
  }

  void _createBoundary() {
    BodyDef def = new BodyDef();
    Body boundaryBody = world.createBody(def);
    boundaryBody.userData = "Boundary";

    PolygonShape shape = new PolygonShape();

    FixtureDef fixtureDef = new FixtureDef();
    fixtureDef.shape = shape;

    final int boundaryX = 150;
    final int boundaryY = 100;

    shape.setAsEdge(new Vector(-boundaryX, -boundaryY),
        new Vector( boundaryX, -boundaryY));
    Fixture boundaryFixture = boundaryBody.createFixture(fixtureDef);

    shape.setAsEdge(new Vector(boundaryX, -boundaryY),
        new Vector(boundaryX,  boundaryY));
    boundaryFixture = boundaryBody.createFixture(fixtureDef);

    shape.setAsEdge(new Vector( boundaryX, boundaryY),
        new Vector(-boundaryX, boundaryY));
    boundaryFixture = boundaryBody.createFixture(fixtureDef);

    shape.setAsEdge(new Vector(-boundaryX,  boundaryY),
        new Vector(-boundaryX, -boundaryY));
    boundaryFixture = boundaryBody.createFixture(fixtureDef);
  }

  void initialize() {
    _createGround();
    _createBoundary();

    _car = new Car(world);
    _controlState = 0;

    // Bind to keyboard events.
    document.on.keyDown.add(_handleKeyDown);
    document.on.keyUp.add(_handleKeyUp);

    // Add ourselves as a collision listener.
    world.contactListener = this;
  }

  void _handleKeyDown(KeyboardEvent event) {
    switch (event.keyCode) {
      case 37: _controlState |= ControlState.LEFT; break;
      case 38: _controlState |= ControlState.UP; break;
      case 39: _controlState |= ControlState.RIGHT; break;
      case 40: _controlState |= ControlState.DOWN; break;
    }
  }

  void _handleKeyUp(KeyboardEvent event) {
    switch (event.keyCode) {
      case 37: _controlState &= ~ControlState.LEFT; break;
      case 38: _controlState &= ~ControlState.UP; break;
      case 39: _controlState &= ~ControlState.RIGHT; break;
      case 40: _controlState &= ~ControlState.DOWN; break;
    }
  }

  // TODO: collision filtering.
  //   Tire with Boundary
  //   Tire with GroundArea
  void _handleContact(Contact contact, bool began) {
    final Object fudA = contact.fixtureA.userData;
    final Object fudB = contact.fixtureB.userData;

    // Check for ground area collision.
    // TODO: named parameters instead of swapping order?
    if (fudA is Tire && fudB is GroundArea) {
      _tireVsGroundArea(fudA, fudB, began);
    } else if (fudA is GroundArea && fudB is Tire) {
      _tireVsGroundArea(fudB, fudA, began);
    }
  }

  void beginContact(Contact contact) {
    _handleContact(contact, true);
  }

  void endContact(Contact contact) {
    _handleContact(contact, false);
  }

  void _tireVsGroundArea(Tire tire, GroundArea groundArea, bool began) {
    if (began) {
      tire.addGroundArea(groundArea);
    } else {
      tire.removeGroundArea(groundArea);
    }
  }

  void preSolve(Contact contact, Manifold oldManifold) { }
  void postSolve(Contact contact, ContactImpulse impulse) { }

  void step(num timestep) {
    _car.update(_controlState);
    super.step(timestep);
  }

  int _controlState;
  Body _groundBody;
  Car _car;
}

main() {
  Racer.main();
}
