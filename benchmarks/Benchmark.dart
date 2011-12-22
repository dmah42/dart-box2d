// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * A Benchmark wraps up a Demo in order to run that Demo as a benchmark.
 */
class Benchmark {
  /** All of the bodies in a simulation. */
  List<Body> bodies;

  /** The gravity vector's y value. */
  static final num GRAVITY = -10;

  /** The timestep and iteration values. */
  static final num TIME_STEP = 1/60;

  /** The physics world. */
  World world;

  /**
   * The different values for position/velocity solve iterations that one wishes
   * to benchmark. These are the arguments provided to the world's step
   * function and determine how many times to solve for velocity and position on
   * each step.
   */
  List<int> solveLoops;

  /**
   * The different number of world steps to test.
   */
  List<int> steps;

  /**
   * Constructs a new Benchmark that will run a loop for the given number of
   * iterations.
   */
  Benchmark(List<int> this.solveLoops, List<int> this.steps) { }

  /** Sets up the physics world. */
  //TODO(gregbglw): Make abstract. see b/5015671
  void initialize() { }

  String get name() {
    return "No Name Provided";
  }

  /**
   * Resets the world to a fresh state. Call this before running a benchmark
   * with different parameters.
   */
  void resetWorld() {
    bodies = new List<Body>();

    // Setup the World.
    final gravity = new Vector(0, GRAVITY);
    bool doSleep = true;
    world = new World(gravity, doSleep, new DefaultWorldPool());
  }

  /**
   * Writes the results from the last time runBenchmark was called to the given
   * StringBuffer.
   */
  void _recordResults(int time, StringBuffer resultsWriter, benchmarkIterations,
      steps) {
    resultsWriter.add(name);
    resultsWriter.add(" (" + steps + " steps, " + benchmarkIterations +
        " solve loops)");
    resultsWriter.add(" : ");

    resultsWriter.add(time);
    resultsWriter.add('ms');

    // Calculate and write-out steps/second.
    num stepsPerSecond = (steps / (time / 1000));
    resultsWriter.add('  (' + stepsPerSecond + ' steps/second)');

    // Write out the checksum. This should be compared manually to other
    // implementations of the Box2D benchmarks.
    resultsWriter.add('\n');
    resultsWriter.add("Checksum: ");
    resultsWriter.add(checksum);
    resultsWriter.add('\n');
    resultsWriter.add('\n');
  }

  /**
   * Runs the benchmark and records the results. Benchmark is run for all
   * different combinations of solveLoops and steps.
   */
  void runBenchmark(StringBuffer resultsWriter) {
    for (int stepCount in steps) {
      for (int solveCount in solveLoops) {
        // Initialize the world to start fresh.
        initialize();

        final watch = new Stopwatch();
        watch.start();

        // Step the world forward in a nice loop.
        for (int i = 0; i < stepCount; i++) {
          world.step(TIME_STEP, solveCount, solveCount);
        }

        // Record the running time.
        watch.stop();
        _recordResults(watch.elapsedInMs(), resultsWriter, solveCount,
            stepCount);
      }
    }
  }

  /**
   * This value is valid after the tests have been run at least once. It
   * is created by summing the x and y positions of the velocity and position of
   * each body in the physics world. Used to ensure that the simulation is
   * producing the same output across different box2D implementations.
   */
  num get checksum() {
    final positionSum = new Vector();
    final velocitySum = new Vector();
    for (Body b in bodies) {
      positionSum.addLocal(b.position);
      velocitySum.addLocal(b.linearVelocity);
    }

    return positionSum.x + positionSum.y + velocitySum.x + velocitySum.y;
  }

  int get bodyCount() {
    return bodies.length;
  }
}
