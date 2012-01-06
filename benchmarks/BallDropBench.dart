// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * Drops a single ball endlessly. No corresponding html page because its not
 * very interesting to look at anyway. Just used for benchmarking.
 */
class BallDropBench extends Benchmark {
  static final String NAME = "Ball Drop";

  /** The starting position of the ball. */
  static final num X_START = 0;
  static final num Y_START = 0;

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
