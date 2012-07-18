#library('racer');

#import('dart:html');
#import('../../lib/box2d.dart');

#source('../demo.dart');
#source('Car.dart');
#source('ControlState.dart');
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

      FixtureDef fixture = new FixtureDef();
      fixture.shape = shape;
      fixture.isSensor = true;

      shape.setAsBoxWithCenterAndAngle(
          18, 14, new Vector(-20, 30), MathBox.degToRad(20));
      Fixture groundAreaFixture = _groundBody.createFixture(fixture);
      // TODO: set user data

      shape.setAsBoxWithCenterAndAngle(
          18, 10, new Vector(10, 40), MathBox.degToRad(-40));
      groundAreaFixture = _groundBody.createFixture(fixture);
      // TODO: more user data
    }
    _car = new Car(world);
    _controlState = 0;

    // Bind to keyboard events.
    document.on.keyDown.add(_handleKeyDown);
    document.on.keyUp.add(_handleKeyUp);
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
    Fixture a = contact.fixtureA;
    Fixture b = contact.fixtureB;

    // TODO(dominich): tire/ground contact.
  }

  void beginContact(Contact contact) {
    _handleContact(contact, true);
  }

  void endContact(Contact contact) {
    _handleContact(contact, false);
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
