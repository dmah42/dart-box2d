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

library DominoTower;

import 'dart:html';
import 'dart:math' as math;
import 'package:box2d/box2d_browser.dart';

import 'demo.dart';

class DominoTower extends Demo {
  static const num DOMINO_WIDTH = .2;
  static const num DOMINO_FRICTION = 0.1;
  static const num DOMINO_HEIGHT = 1;
  static const num BASE_COUNT = 25;

  /**
   * The density of the dominos under construction. Varies for different parts
   * of the tower.
   */
  num dominoDensity;

  /** Construct a new DominoTower. */
  DominoTower() : super("Domino tower") { }

  /** Entrypoint. */
  static void main() {
    final tower = new DominoTower();
    tower.initialize();
    tower.initializeAnimation();
    tower.runAnimation();
  }

  void makeDomino(num x, num y, bool horizontal) {
    PolygonShape sd = new PolygonShape();
    sd.setAsBox(.5 * DOMINO_WIDTH, .5 * DOMINO_HEIGHT);
    FixtureDef fd = new FixtureDef();
    fd.shape = sd;
    fd.density = dominoDensity;
    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    fd.friction = DOMINO_FRICTION;
    fd.restitution = 0.65;
    bd.position = new vec2(x, y);
    bd.angle = horizontal ? (math.PI / 2.0) : 0.0;
    Body myBody = world.createBody(bd);
    myBody.createFixture(fd);
    bodies.add(myBody);
  }

  /**
   * Sets up the dominoes.
   */
  void initialize() {
    // Create the floor.
    {
      PolygonShape sd = new PolygonShape();
      sd.setAsBox(50.0, 10.0);

      BodyDef bd = new BodyDef();
      bd.position = new vec2(0.0, -10.0);
      final body = world.createBody(bd);
      body.createFixtureFromShape(sd);
      bodies.add(body);
    }

    {
      dominoDensity = 10;
      // Make bullet
      PolygonShape sd = new PolygonShape();
      sd.setAsBox(.7, .7);
      FixtureDef fd = new FixtureDef();
      fd.density = 35;
      BodyDef bd = new BodyDef();
      bd.type = BodyType.DYNAMIC;
      fd.shape = sd;
      fd.friction = 0;
      fd.restitution = 0.85;
      bd.bullet = true;
      bd.position = new vec2(30.0, 50.0);
      Body b = world.createBody(bd);
      bodies.add(b);
      b.createFixture(fd);
      b.linearVelocity = new vec2(-25.0, -25.0);
      b.angularVelocity = 6.7;

      fd.density = 25;
      bd.position = new vec2(-30.0, 25.0);
      b = world.createBody(bd);
      bodies.add(b);
      b.createFixture(fd);
      b.linearVelocity = new vec2(35.0, -10.0);
      b.angularVelocity = -8.3;
    }

    {
      num currX;
      // Make base
      for (int i = 0; i < BASE_COUNT; ++i) {
        currX = i * 1.5 * DOMINO_HEIGHT - (1.5 * DOMINO_HEIGHT *
            BASE_COUNT / 2);
        makeDomino(currX, DOMINO_HEIGHT / 2.0, false);
        makeDomino(currX, DOMINO_HEIGHT + DOMINO_WIDTH / 2.0, true);
      }
      currX = BASE_COUNT * 1.5 * DOMINO_HEIGHT - (1.5 * DOMINO_HEIGHT *
          BASE_COUNT / 2);

      // Make 'I's
      for (int j = 1; j < BASE_COUNT; ++j) {
        if (j > 3)
          dominoDensity *= .8;

        // The y at the center of the I structure.
        num currY = DOMINO_HEIGHT * .5 + (DOMINO_HEIGHT + 2 * DOMINO_WIDTH) *
            .99 * j;

        for (int i = 0; i < BASE_COUNT - j; ++i) {
          currX = i * 1.5 * DOMINO_HEIGHT - (1.5 * DOMINO_HEIGHT *
              (BASE_COUNT - j) / 2);
          dominoDensity *= 2.5;
          if (i == 0) {
            makeDomino(currX - (1.25 * DOMINO_HEIGHT) + .5 * DOMINO_WIDTH,
                currY - DOMINO_WIDTH, false);
          }
          if (i == BASE_COUNT - j - 1) {
            makeDomino(currX + (1.25 * DOMINO_HEIGHT) - .5 * DOMINO_WIDTH,
                currY - DOMINO_WIDTH, false);
          }

          dominoDensity /= 2.5;
          makeDomino(currX, currY, false);
          makeDomino(currX, currY + .5 * (DOMINO_WIDTH + DOMINO_HEIGHT), true);
          makeDomino(currX, currY - .5 * (DOMINO_WIDTH + DOMINO_HEIGHT), true);
        }
      }
    }
  }
}

void main() {
  DominoTower.main();
}
