#library('racer');

#import('dart:html');
#import('../../lib/box2d.dart');

#source('../demo.dart');
#source('Car.dart');
#source('ControlState.dart');
#source('GroundArea.dart');
#source('Tire.dart');

class Racer extends Demo implements ContactListener {
  static final String NAME = "Racer";

  static void main() {
    final racer = new Racer();
    racer.initialize();
    racer.initializeAnimation();
    racer.runAnimation();
  }

  Racer() : super.withGravity(new Vector(0, 0), 2.5) { }

  String get name() => NAME;

  void initialize() {
    // Set up ground.
    {
      BodyDef def = new BodyDef();
      _groundBody = world.createBody(def);

      PolygonShape shape = new PolygonShape();

      FixtureDef fixtureDef = new FixtureDef();
      fixtureDef.shape = shape;
      fixtureDef.isSensor = true;

      shape.setAsBoxWithCenterAndAngle(
          18, 14, new Vector(-20, 30), MathBox.degToRad(20));
      Fixture groundAreaFixture = _groundBody.createFixture(fixtureDef);
      groundAreaFixture.userData = new GroundArea(0.001, false);

      shape.setAsBoxWithCenterAndAngle(
          18, 10, new Vector(10, 40), MathBox.degToRad(-40));
      groundAreaFixture = _groundBody.createFixture(fixtureDef);
      groundAreaFixture.userData = new GroundArea(0.2, false);
    }
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

  void _handleContact(Contact contact, bool began) {
    Object fudA = contact.fixtureA.userData;
    Object fudB = contact.fixtureB.userData;

    // TODO: named parameters instead of swapping order?
    if (fudA is Tire && fudB is GroundArea)
      _tireVsGroundArea(fudA, fudB, began);
    else if (fudA is GroundArea && fudB is Tire)
      _tireVsGroundArea(fudB, fudA, began);
  }

  void beginContact(Contact contact) {
    _handleContact(contact, true);
  }

  void endContact(Contact contact) {
    _handleContact(contact, false);
  }

  void _tireVsGroundArea(Tire tire, GroundArea groundArea, bool began) {
    if (began)
      tire.addGroundArea(groundArea);
    else
      tire.removeGroundArea(groundArea);
  }

  void preSolve(Contact contact, Manifold oldManifold) { }
  void postSolve(Contact contact, ContactImpulse impulse) { }

  void step(num timestep) {
    _car.update(_controlState);
    super.step(timestep);
    ctx.setFillColor('white');
    ctx.font = '12pt monospace';
    ctx.fillText('Use the arrow keys to control the car', 20, 580);
  }

  int _controlState;
  Body _groundBody;
  Car _car;
}

main() {
  Racer.main();

}
