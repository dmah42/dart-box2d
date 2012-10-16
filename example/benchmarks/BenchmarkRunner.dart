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

#library('BenchmarkRunner');
#import('dart:math', prefix: 'Math');
#import('package:box2d/box2d_nohtml.dart');
#source('Benchmark.dart');
#source('BallCageBench.dart');
#source('BallDropBench.dart');
#source('CircleStressBench.dart');
#source('DominoPlatformBench.dart');
#source('DominoTowerBench.dart');

/** Runs the Dart Box2D benchmarks. Outputs results to console. */
class BenchmarkRunner {
  // TODO(dominich): Add timeout for benchmarks.
  /**
   * The different values for position/velocity solve iterations that one wishes
   * to benchmark. These are the arguments provided to the world's step
   * function and determine how many times to solve for velocity and position on
   * each step.
   */
  List<int> _solveLoops;

  /** The different values for number of steps that one wishes to benchmark. */
  List<int> _steps;

  /** The benchmarks to be run. Initialized in [setupBenchmarks]. */
  List<Benchmark> _benchmarks;

  /** Buffer results here before dumping out on the page. */
  StringBuffer _resultsWriter;

  BenchmarkRunner()
      : _resultsWriter = new StringBuffer(),
        _benchmarks = new List<Benchmark>(),
        _solveLoops = const [10, 30],
        _steps = const [10, 100, 500, 2000];

  /**
   * Adds the specified benchmarks to the benchmark suite. Modify this method
   * directly to determine which benchmarks are included and the order in which
   * they are run.
   */
  void setupBenchmarks(String filter) {
    final benchmarks = [
      new BallDropBench(_solveLoops, _steps),
      new BallCageBench(_solveLoops, _steps),
      new CircleStressBench(_solveLoops, _steps),
      new DominoPlatformBench(_solveLoops, _steps),
      new DominoTowerBench(_solveLoops, _steps),
    ];

    if (filter == null || filter.isEmpty()) {
      benchmarks.map(_addBenchmark);
    } else {
      List<String> filterList = filter.split(",").map((e) => e.trim());
      benchmarks.filter((e) => filterList.indexOf(e.name) != -1).map(_addBenchmark);
    }
  }

  /**
   * Runs and records the results of each benchmark included in [setupBenchmarks].
   */
  void runBenchmarks() {
    for (Benchmark benchmark in _benchmarks) {
      print('Running ${benchmark.name}');
      _resultsWriter.clear();
      benchmark.runBenchmark(_resultsWriter);
      print("$_resultsWriter------------------------------------------------");
    }
  }

  /**
   * Initializes the given benchmark and adds to the end of the queue of
   * benchmarks to run.
   */
  void _addBenchmark(Benchmark benchmark) => _benchmarks.add(benchmark);
}

void main() {
  // TODO(dominich): Options for step sizes.
  final runner = new BenchmarkRunner();
  var args = (new Options()).arguments.iterator();
  String filter;
  while (args.hasNext()) {
    if (args.next() == "--filter") {
      filter = args.next();
      break;
    }
  }
  runner.setupBenchmarks(filter);
  runner.runBenchmarks();
}
