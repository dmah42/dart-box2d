library hop_runner;

import 'dart:async';
import 'dart:io';
import 'package:hop/hop.dart';
import 'package:hop/hop_tasks.dart';
import 'package:path/path.dart' as pathos;

void main(List<String> args) {
  addTask('analyze_libs', createAnalyzerTask(_getLibs));

  addTask('dart2js', createDartCompilerTask(_getDemos(), liveTypeAnalysis: true));

  runHop(args);
}

Future<List<String>> _getLibs() {
  return new Directory('lib').list()
      .where((FileSystemEntity fse) => fse is File)
      .map((File file) => file.path)
      .toList();
}

Future<List<String>> _getDemos() =>
  new Directory('example/demos')
    .list()
    .where((FileSystemEntity fse) => fse is File)
    .map((File f) => f.path)
    .where((String path) => pathos.extension(path) == '.dart')
    .where((String path) => pathos.basename(path) != 'demo_harness.dart')
    .toList();
