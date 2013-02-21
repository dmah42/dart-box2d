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

library racer;

import 'dart:async';
import 'dart:html';
import 'dart:math' as math;
import 'package:box2d/box2d_browser.dart';
import '../demo.dart';

part 'car.dart';
part 'control_state.dart';
part 'ground_area.dart';
part 'tire.dart';

class Racer extends Demo implements ContactListener {
  static void main() {
    final racer = new Racer();
    racer.initialize();
    racer.initializeAnimation();
    document.body.nodes.add(
        new Element.html("<p>Use the arrow keys to drive the car.</p>"));
    racer.runAnimation();
  }

  Racer() : super("Racer", new vec2.zero(), 2.5), _lastTime = 0;

  void initialize() {
    _createGround();
    _createBoundary();

    _car = new Car(world);
    _controlState = 0;

    // Bind to keyboard events.
    document.onKeyDown.listen(_handleKeyDown);
    document.onKeyUp.listen(_handleKeyUp);

    // Add ourselves as a collision listener.
    world.contactListener = this;
  }

  void step(num time) {
    _car.update(time - _lastTime, _controlState);
    _lastTime = time;
    super.step(time);
  }
 
  // ContactListener overrides.
  void beginContact(Contact contact) {
    _handleContact(contact, true);
  }

  void endContact(Contact contact) {
    _handleContact(contact, false);
  }

  void preSolve(Contact contact, Manifold oldManifold) { }
  void postSolve(Contact contact, ContactImpulse impulse) { }

  void _createGround() {
    BodyDef def = new BodyDef();
    _groundBody = world.createBody(def);
    _groundBody.userData = "Ground";

    PolygonShape shape = new PolygonShape();

    FixtureDef fixtureDef = new FixtureDef();
    fixtureDef.shape = shape;
    fixtureDef.isSensor = true;

    fixtureDef.userData = new GroundArea(0.001, false);
    shape.setAsBoxWithCenterAndAngle(27, 21, new vec2(-30, 30), radians(20));
    _groundBody.createFixture(fixtureDef);

    fixtureDef.userData = new GroundArea(0.2, false);
    shape.setAsBoxWithCenterAndAngle(27, 15, new vec2(20, 40), radians(-40));
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

    shape.setAsEdge(new vec2(-boundaryX, -boundaryY),
        new vec2( boundaryX, -boundaryY));
    Fixture boundaryFixture = boundaryBody.createFixture(fixtureDef);

    shape.setAsEdge(new vec2(boundaryX, -boundaryY),
        new vec2(boundaryX,  boundaryY));
    boundaryFixture = boundaryBody.createFixture(fixtureDef);

    shape.setAsEdge(new vec2( boundaryX, boundaryY),
        new vec2(-boundaryX, boundaryY));
    boundaryFixture = boundaryBody.createFixture(fixtureDef);

    shape.setAsEdge(new vec2(-boundaryX,  boundaryY),
        new vec2(-boundaryX, -boundaryY));
    boundaryFixture = boundaryBody.createFixture(fixtureDef);
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

  void _tireVsGroundArea(Tire tire, GroundArea groundArea, bool began) {
    if (began) {
      tire.addGroundArea(groundArea);
    } else {
      tire.removeGroundArea(groundArea);
    }
  }

  int _controlState;
  Body _groundBody;
  Car _car;
  num _lastTime;
}

main() {
  Racer.main();
}
