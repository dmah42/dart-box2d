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

library CircleStress;
import 'dart:math' as Math;
import 'package:box2d/box2d_browser.dart';
import 'demo.dart';

/** Scale of the viewport for this Demo. */
const double _MY_VIEWPORT_SCALE = 4.0;

class CircleStress extends Demo {

  /** The number of columns of balls in the pen. */
  static const int COLUMNS = 8;

  /** This number of balls will be created on each layer. */
  static const int LOAD_SIZE = 20;

  /** Construct a new Circle Stress Demo. */
  CircleStress()
      : super("Circle stress");

  /** Creates all bodies. */
  void initialize() {
    {
      final bd = new BodyDef();
      final ground = world.createBody(bd);
      bodies.add(ground);

      PolygonShape shape = new PolygonShape();
      shape.setAsEdge(new Vector2(-40.0, 0.0), new Vector2(40.0, 0.0));
      ground.createFixtureFromShape(shape);
    }

    {
      // Ground
      final sd = new PolygonShape();
      sd.setAsBox(50.0, 10.0);
      final bd = new BodyDef();
      bd.type = BodyType.STATIC;
      bd.position = new Vector2(0.0, -10.0);
      final b = world.createBody(bd);
      bodies.add(b);
      final fd = new FixtureDef();
      fd.shape = sd;
      fd.friction = 1.0;
      b.createFixture(fd);

      // Walls
      sd.setAsBox(3.0, 50.0);
      final wallDef = new BodyDef();
      wallDef.position = new Vector2(45.0, 25.0);
      var rightWall = world.createBody(wallDef);
      bodies.add(rightWall);
      rightWall.createFixtureFromShape(sd);
      wallDef.position = new Vector2(-45.0, 25.0);
      var leftWall = world.createBody(wallDef);
      bodies.add(leftWall);
      leftWall.createFixtureFromShape(sd);

      // Corners
      final cornerDef = new BodyDef();
      sd.setAsBox(20.0, 3.0);
      cornerDef.angle = (-Math.PI / 4.0);
      cornerDef.position = new Vector2(-35.0, 8.0);
      Body myBod = world.createBody(cornerDef);
      bodies.add(myBod);
      myBod.createFixtureFromShape(sd);
      cornerDef.angle = (Math.PI / 4.0);
      cornerDef.position = new Vector2(35.0, 8.0);
      myBod = world.createBody(cornerDef);
      bodies.add(myBod);
      myBod.createFixtureFromShape(sd);

      // top
      sd.setAsBox(50.0, 10.0);
      var topDef = new BodyDef()
          ..type = BodyType.STATIC
          ..angle = 0.0
          ..position = new Vector2(0.0, 75.0);
      final topBody = world.createBody(topDef);
      bodies.add(topBody);
      fd.shape = sd;
      fd.friction = 1.0;
      topBody.createFixture(fd);
    }

    {
      var bd = new BodyDef()
          ..type = BodyType.DYNAMIC
          ..position = new Vector2(0.0, 10.0);
      int numPieces = 5;
      num radius = 6;
      var body = world.createBody(bd);
      bodies.add(body);

      for (int i = 0; i < numPieces; i++) {
        num xPos = radius * Math.cos(2 * Math.PI * (i /
            numPieces.toDouble()));
        num yPos = radius * Math.sin(2 * Math.PI * (i /
            numPieces.toDouble()));

        var cd = new CircleShape()
            ..radius = 1.2
            ..position.setValues(xPos, yPos);

        final fd = new FixtureDef()
            ..shape = cd
            ..density = 25.0
            ..friction = .1
            ..restitution = .9;

        body.createFixture(fd);
      }

      body.bullet = false;

      // Create an empty ground body.
      var bodyDef = new BodyDef();
      var groundBody = world.createBody(bodyDef);

      RevoluteJointDef rjd = new RevoluteJointDef()
          ..initialize(body, groundBody, body.position)
          ..motorSpeed = Math.PI
          ..maxMotorTorque = 1000000.0
          ..enableMotor = true;

      world.createJoint(rjd);

      for (int j = 0; j < COLUMNS; j++) {
        for (int i = 0; i < LOAD_SIZE; i++) {
          CircleShape circ = new CircleShape()
              ..radius = 1.0 + (i % 2 == 0 ? 1.0 : -1.0) * .5 * .75;
          var fd2 = new FixtureDef()
              ..shape = circ
              ..density = circ.radius * 1.5
              ..friction = 0.5
              ..restitution = 0.7;
          double xPos = -39.0 + 2 * i;
          double yPos = 50.0 + j;
          var bod = new BodyDef()
              ..type = BodyType.DYNAMIC
              ..position = new Vector2(xPos, yPos);
          Body myBody = world.createBody(bod);
          bodies.add(myBody);
          myBody.createFixture(fd2);
        }
      }
    }
  }
}

void main() {
  new CircleStress()
      ..initialize()
      ..initializeAnimation()
      ..viewport.scale = _MY_VIEWPORT_SCALE
      ..runAnimation();
}
