// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * Runs the Dart Box2D benchmarks. Outputs results in browser.
 */
class BenchmarkRunner {
  /**
   * The different values for position/velocity solve iterations that one wishes
   * to benchmark. These are the arguments provided to the world's step
   * function and determine how many times to solve for velocity and position on
   * each step.
   */
  List<int> solveLoops;

  /**
   * The different values for number of steps that one wishes to benchmark.
   */
  List<int> steps;

  /** The benchmarks to be run. Initialized in runBenchmarks. */
  List<Benchmark> benchmarks;

  /** Buffer results here before dumping out on the page. */
  StringBuffer resultsWriter;

  BenchmarkRunner() :
    resultsWriter = new StringBuffer(),
    benchmarks = new List<Benchmark>(),
    solveLoops = const [10, 30],
    steps = const [10, 100, 500, 2000] { }

  static void main(List<String> args) {
    final runner = new BenchmarkRunner();
    runner.setupBenchmarks();
    runner.runBenchmarks();
  }

  /**
   * Adds the specified benchmarks to the benchmark suite. Modify this method
   * directly to determine which benchmarks are included and the order in which
   * they are run.
   */
  void setupBenchmarks() {
    addBenchmark(new BallDropBench(solveLoops, steps));
    addBenchmark(new BallCageBench(solveLoops, steps));
    addBenchmark(new CircleStressBench(solveLoops, steps));
    addBenchmark(new DominoPlatformBench(solveLoops, steps));
    addBenchmark(new DominoTowerBench(solveLoops, steps));
  }

  /**
   * Runs and records the results of each benchmark included in
   * setupBenchmarks().
   */
  void runBenchmarks() {
    for (Benchmark benchmark in benchmarks) {
      print('Running ${benchmark.name}');
      resultsWriter.clear();
      benchmark.runBenchmark(resultsWriter);
      print(resultsWriter);
      print('');
      print("------------------------------------------------");
    }
  }

  /**
   * Initializes the given benchmark and adds to the end of the queue of
   * benchmarks to run.
   */
  void addBenchmark(Benchmark benchmark) {
    benchmarks.add(benchmark);
  }
}
