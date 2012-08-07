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

#library('DominoTest');
#import('dart:html');
#import('../lib/box2d.dart');
#source('demo.dart');

/** Demonstration of dominoes being knocked over. */
class DominoTest extends Demo {
  static final String NAME = "Domino Platforms";

  DominoTest() : super() { }

  String get name() => NAME;

  void initialize() {
    { // Floor
      FixtureDef fd = new FixtureDef();
      PolygonShape sd = new PolygonShape();
      sd.setAsBox(50.0, 10.0);
      fd.shape = sd;

      BodyDef bd = new BodyDef();
      bd.position = new Vector(0.0, -10.0);
      final body = world.createBody(bd);
      body.createFixture(fd);
      bodies.add(body);
    }

    { // Platforms
      for (int i = 0; i < 4; i++) {
        FixtureDef fd = new FixtureDef();
        PolygonShape sd = new PolygonShape();
        sd.setAsBox(15.0, 0.125);
        fd.shape = sd;

        BodyDef bd = new BodyDef();
        bd.position = new Vector(0.0, 5 + 5 * i);
        final body = world.createBody(bd);
        body.createFixture(fd);
        bodies.add(body);
      }
    }

    // Dominoes
    {
      FixtureDef fd = new FixtureDef();
      PolygonShape sd = new PolygonShape();
      sd.setAsBox(0.125, 2);
      fd.shape = sd;
      fd.density = 25.0;

      BodyDef bd = new BodyDef();
      bd.type = BodyType.DYNAMIC;

      num friction = .5;
      int numPerRow = 25;

      for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < numPerRow; j++) {
          fd.friction = friction;
          bd.position = new Vector(-14.75 + j * (29.5 / (numPerRow - 1)),
              7.3 + 5 * i);
          if (i == 2 && j == 0) {
            bd.angle = -.1;
            bd.position.x += .1;
          } else if (i == 3 && j == numPerRow - 1) {
            bd.angle = .1;
            bd.position.x -= .1;
          } else {
            bd.angle = 0;
          }
          Body myBody = world.createBody(bd);
          myBody.createFixture(fd);
          bodies.add(myBody);
        }
      }
    }
  }
}

void main() {
  final domino = new DominoTest();
  domino.initialize();
  domino.initializeAnimation();
  domino.runAnimation();
}

