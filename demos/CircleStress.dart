#library('BallCage');
#import('dart:dom');
#import('../lib/box2d.dart');
#source('demo.dart');
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
class CircleStress extends Demo {
  static final String NAME = "Circle Stress";

  /** The joint used to churn the balls around. */
  RevoluteJoint _joint;

  /** Scale of the viewport for this Demo. */
  static final num _MY_VIEWPORT_SCALE = 4;

  /** The number of columns of balls in the pen. */
  static final int COLUMNS = 8;

  /** This number of balls will be created on each layer. */
  static final int LOAD_SIZE = 20;

  /** Construct a new Circle Stress Demo. */
  CircleStress() : super() { }

  /** Entrypoint. */
  static void main() {
    final stress = new CircleStress();
    stress.initialize();
    stress.initializeAnimation();
    stress.viewport.scale = _MY_VIEWPORT_SCALE;
    stress.runAnimation();
  }

  String get name() {
    return NAME;
  }

  /** Creates all bodies. */
  void initialize() {
    {
      final bd = new BodyDef();
      final ground = world.createBody(bd);
      bodies.add(ground);

      PolygonShape shape = new PolygonShape();
      shape.setAsEdge(new Vector(-40.0, 0.0), new Vector(40.0, 0.0));
      ground.createFixtureFromShape(shape);
    }

    Body leftWall;
    Body rightWall;

    {
      // Ground
      final sd = new PolygonShape();
      sd.setAsBox(50.0, 10.0);
      final bd = new BodyDef();
      bd.type = BodyType.STATIC;
      bd.position = new Vector(0.0, -10.0);
      final b = world.createBody(bd);
      bodies.add(b);
      final fd = new FixtureDef();
      fd.shape = sd;
      fd.friction = 1.0;
      b.createFixture(fd);

      // Walls
      sd.setAsBox(3.0, 50.0);
      final wallDef = new BodyDef();
      wallDef.position = new Vector(45.0, 25.0);
      rightWall = world.createBody(wallDef);
      bodies.add(rightWall);
      rightWall.createFixtureFromShape(sd);
      wallDef.position = new Vector(-45.0, 25.0);
      leftWall = world.createBody(wallDef);
      bodies.add(leftWall);
      leftWall.createFixtureFromShape(sd);

      // Corners
      final cornerDef = new BodyDef();
      sd.setAsBox(20.0, 3.0);
      cornerDef.angle = (-Math.PI / 4.0);
      cornerDef.position = new Vector(-35, 8.0);
      Body myBod = world.createBody(cornerDef);
      bodies.add(myBod);
      myBod.createFixtureFromShape(sd);
      cornerDef.angle = (Math.PI / 4.0);
      cornerDef.position = new Vector(35, 8.0);
      myBod = world.createBody(cornerDef);
      bodies.add(myBod);
      myBod.createFixtureFromShape(sd);

      // top
      sd.setAsBox(50.0, 10.0);
      final topDef = new BodyDef();
      topDef.type = BodyType.STATIC;
      topDef.angle = 0;
      topDef.position = new Vector(0.0, 75.0);
      final topBody = world.createBody(topDef);
      bodies.add(topBody);
      fd.shape = sd;
      fd.friction = 1.0;
      topBody.createFixture(fd);
    }

    {
      final bd = new BodyDef();
      bd.type = BodyType.DYNAMIC;
      int numPieces = 5;
      num radius = 6;
      bd.position = new Vector(0.0, 10.0);
      final body = world.createBody(bd);
      bodies.add(body);

      for (int i = 0; i < numPieces; i++) {
        final fd = new FixtureDef();
        final cd = new CircleShape();
        cd.radius = 1.2;
        fd.shape = cd;
        fd.density = 25;
        fd.friction = .1;
        fd.restitution = .9;
        num xPos = radius * Math.cos(2 * Math.PI * (i / numPieces.toDouble()));
        num yPos = radius * Math.sin(2 * Math.PI * (i / numPieces.toDouble()));
        cd.position.setCoords(xPos, yPos);

        body.createFixture(fd);
      }

      body.bullet = false;

      // Create an empty ground body.
      final bodyDef = new BodyDef();
      final groundBody = world.createBody(bodyDef);

      RevoluteJointDef rjd = new RevoluteJointDef();
      rjd.initialize(body, groundBody, body.position);
      rjd.motorSpeed = Math.PI;
      rjd.maxMotorTorque = 1000000.0;
      rjd.enableMotor = true;
      _joint = world.createJoint(rjd);

      {
        for (int j = 0; j < COLUMNS; j++) {
          for (int i = 0; i < LOAD_SIZE; i++) {
            CircleShape circ = new CircleShape();
            BodyDef bod = new BodyDef();
            bod.type = BodyType.DYNAMIC;
            circ.radius = 1.0 + (i % 2 == 0 ? 1.0 : -1.0) * .5 * .75;
            FixtureDef fd2 = new FixtureDef();
            fd2.shape = circ;
            fd2.density = circ.radius * 1.5;
            fd2.friction = 0.5;
            fd2.restitution = 0.7;
            num xPos = -39 + 2 * i;
            num yPos = 50 + j;
            bod.position = new Vector(xPos, yPos);
            Body myBody = world.createBody(bod);
            bodies.add(myBody);
            myBody.createFixture(fd2);
          }
        }
      }
    }
  }
}

void main() {
  CircleStress.main();
}
