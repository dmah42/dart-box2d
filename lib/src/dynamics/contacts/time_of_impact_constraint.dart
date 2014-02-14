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

part of box2d;

class TimeOfImpactConstraint {
  final List<Vector2> localPoints = new List<Vector2>.generate(
      Settings.MAX_MANIFOLD_POINTS, (i) => new Vector2.zero());
  final Vector2 localNormal = new Vector2.zero();
  final Vector2 localPoint = new Vector2.zero();
  int type = 0;
  double radius = 0.0;
  int pointCount = 0;
  Body bodyA;
  Body bodyB;

  TimeOfImpactConstraint();

  void setFrom(TimeOfImpactConstraint argOther) {
    assert(argOther.localPoints.length == localPoints.length);
    for (int i = 0; i < localPoints.length; i++) {
      localPoints[i].setFrom(argOther.localPoints[i]);
    }
    localNormal.setFrom(argOther.localNormal);
    localPoint.setFrom(argOther.localPoint);
    type = argOther.type;
    radius = argOther.radius;
    pointCount = argOther.pointCount;
    bodyA = argOther.bodyA;
    bodyB = argOther.bodyB;
  }
}
