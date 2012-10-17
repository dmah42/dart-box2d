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
 * A Benchmark wraps up a Demo in order to run that Demo as a benchmark.
 */
abstract class Benchmark {
  /** All of the bodies in a simulation. */
  List<Body> bodies;

  /** The gravity vector's y value. */
  static const num GRAVITY = -10;

  /** The timestep and iteration values. */
  static const num TIME_STEP = 1/60;

  /** The physics world. */
  World world;

  /**
   * The different values for position/velocity solve iterations that one wishes
   * to benchmark. These are the arguments provided to the world's step
   * function and determine how many times to solve for velocity and position on
   * each step.
   */
  List<int> solveLoops;

  /** The different number of world steps to test. */
  List<int> _steps;

  /**
   * Constructs a new Benchmark that will run a loop for the given number of
   * iterations.
   */
  Benchmark(List<int> this.solveLoops, List<int> this._steps) { }

  /** Sets up the physics world. */
  abstract void initialize();

  abstract String get name();

  /**
   * Resets the world to a fresh state. Call this before running a benchmark
   * with different parameters.
   */
  void resetWorld() {
    bodies = new List<Body>();

    // Setup the World.
    world = new World(new Vector(0, GRAVITY), true, new DefaultWorldPool());
  }

  /**
   * Writes the results from the last time runBenchmark was called to the given
   * StringBuffer.
   */
  void _recordResults(int time, StringBuffer resultsWriter, benchmarkIterations,
      steps) {
    resultsWriter.add(name);
    resultsWriter.add(" ($steps steps, $benchmarkIterations solve loops) : $time ms");

    // Calculate and write-out steps/second.
    num stepsPerSecond = (steps / (time / 1000));
    resultsWriter.add('  ($stepsPerSecond steps/second)');

    // Write out the checksum. This should be compared manually to other
    // implementations of the Box2D benchmarks.
    resultsWriter.add('\n');
    resultsWriter.add("Checksum: $checksum");
    resultsWriter.add('\n\n');
  }

  /**
   * Runs the benchmark and records the results. Benchmark is run for all
   * different combinations of solveLoops and steps.
   */
  void runBenchmark(StringBuffer resultsWriter) {
    for (int stepCount in _steps) {
      for (int solveCount in solveLoops) {
        // Initialize the world to start fresh.
        initialize();

        final watch = new Stopwatch()..start();
        // Step the world forward in a nice loop.
        for (int i = 0; i < stepCount; ++i)
          world.step(TIME_STEP, solveCount, solveCount);
        watch.stop();

        // Record the running time.
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

  int get bodyCount() => bodies.length;
}
