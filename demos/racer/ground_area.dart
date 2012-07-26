class GroundArea implements Hashable {
  GroundArea(this.frictionModifier, this.outOfCourse)
      : _hash = _lastHash++;

  // Hashable implementation.
  int hashCode() => _hash;

  final double frictionModifier;
  final bool outOfCourse;
  final int _hash;

  static int _lastHash = 0;
}
