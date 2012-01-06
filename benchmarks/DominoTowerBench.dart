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
class DominoTowerBench extends Benchmark {
  static final num DOMINO_WIDTH = .2;
  static final num DOMINO_FRICTION = 0.1;
  static final num DOMINO_HEIGHT = 1;
  static final num BASE_COUNT = 25;
  static final String NAME = "Domino Tower";

  /**
   * The density of the dominos under construction. Varies for different parts
   * of the tower.
   */
  num dominoDensity;

  /** Construct a new DominoTower. */
  DominoTowerBench(List<int> solveLoops, List<int> steps) :
    super(solveLoops, steps) { }

  String get name() {
    return NAME;
  }

  void makeDomino(num x, num y, bool horizontal, World world_) {
    PolygonShape sd = new PolygonShape();
    sd.setAsBox(.5 * DOMINO_WIDTH, .5 * DOMINO_HEIGHT);
    FixtureDef fd = new FixtureDef();
    fd.shape = sd;
    fd.density = dominoDensity;
    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    fd.friction = DOMINO_FRICTION;
    fd.restitution = 0.65;
    bd.position = new Vector(x, y);
    bd.angle = horizontal ? (Math.PI / 2.0) : 0;
    Body myBody = world_.createBody(bd);
    myBody.createFixture(fd);
    bodies.add(myBody);
  }

  /**
   * Sets up the dominoes.
   */
  void initialize() {
    resetWorld();

    // Create the floor.
    {
      PolygonShape sd = new PolygonShape();
      sd.setAsBox(50.0, 10.0);

      BodyDef bd = new BodyDef();
      bd.position = new Vector(0.0, -10.0);
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
      bd.position = new Vector(30, 50);
      Body b = world.createBody(bd);
      bodies.add(b);
      b.createFixture(fd);
      b.linearVelocity = new Vector(-25, -25);
      b.angularVelocity = 6.7;

      fd.density = 25;
      bd.position = new Vector(-30, 25);
      b = world.createBody(bd);
      bodies.add(b);
      b.createFixture(fd);
      b.linearVelocity = new Vector(35, -10);
      b.angularVelocity = -8.3;
    }

    {
      num currX;
      // Make base
      for (int i = 0; i < BASE_COUNT; ++i) {
        currX = i * 1.5 * DOMINO_HEIGHT - (1.5 * DOMINO_HEIGHT *
            BASE_COUNT / 2);
        makeDomino(currX, DOMINO_HEIGHT / 2.0, false, world);
        makeDomino(currX, DOMINO_HEIGHT + DOMINO_WIDTH / 2.0, true, world);
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
                currY - DOMINO_WIDTH, false, world);
          }
          if (i == BASE_COUNT - j - 1) {
            makeDomino(currX + (1.25 * DOMINO_HEIGHT) - .5 * DOMINO_WIDTH,
                currY - DOMINO_WIDTH, false, world);
          }

          dominoDensity = dominoDensity / 2.5;
          makeDomino(currX, currY, false, world);
          makeDomino(currX, currY + .5 * (DOMINO_WIDTH + DOMINO_HEIGHT),
              true, world);
          makeDomino(currX, currY - .5 * (DOMINO_WIDTH + DOMINO_HEIGHT),
              true, world);
        }
      }
    }
  }
}
