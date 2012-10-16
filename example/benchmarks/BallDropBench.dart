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

/**
 * Drops a single ball endlessly. No corresponding html page because its not
 * very interesting to look at anyway. Just used for benchmarking.
 */
class BallDropBench extends Benchmark {
  static const String NAME = "Ball Drop";

  /** The starting position of the ball. */
  static const num X_START = 0;
  static const num Y_START = 0;

  BallDropBench(List<int> solveLoops, List<int> steps) :
    super(solveLoops, steps) { }

  /** Runs the test and records the results. */
  void initialize() {
    resetWorld();

    // Create the fixture to attach to the ball body.
    final fd = new FixtureDef();
    final cd = new CircleShape();
    cd.radius = 1;
    fd.shape = cd;

    // Define and create the ball body. Attach the fixture.
    final bodyDef = new BodyDef();
    bodyDef.type = BodyType.DYNAMIC;
    bodyDef.position = new Vector(X_START, Y_START);
    final ballBody = world.createBody(bodyDef);
    ballBody.createFixture(fd);
    bodies.add(ballBody);
  }

  String get name() {
    return NAME;
  }
}
