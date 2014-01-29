library hop_runner;

import 'dart:async';
import 'dart:io';
import 'package:hop/hop.dart';
import 'package:hop/hop_tasks.dart';
import 'package:path/path.dart' as pathos;

void main(List<String> args) {
  addTask('analyze_libs', createAnalyzerTask(_getLibs));
  addTask('analyze_demos', createAnalyzerTask(_getDemos));
  addTask('analyze_benchmark',
      createAnalyzerTask(['example/benchmarks/benchmark_runner.dart']));

  addChainedTask('analyze_all',
      ['analyze_libs', 'analyze_demos', 'analyze_benchmark']);

  addTask('dart2js', createDartCompilerTask(_getDemos, liveTypeAnalysis: true));

  addTask('docs', createDartDocTask(_getLibs, linkApi: true));

  runHop(args);
}

Future<List<String>> _getLibs() =>
    new Directory('lib').list()
      .where((FileSystemEntity fse) => fse is File)
      .map((File file) => file.path)
      .toList();

Future<List<String>> _getDemos() =>
  new Directory('example/demos')
    .list()
    .where((FileSystemEntity fse) => fse is File)
    .map((File f) => f.path)
    .where((String path) => pathos.extension(path) == '.dart')
    .where((String path) => pathos.basename(path) != 'demo.dart')
    .toList();
