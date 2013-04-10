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

// TODO(dominic): This should probably be split into Velocity and Position
// constraints.

part of box2d;

class ContactConstraint {
  List<ContactConstraintPoint> points;

  final vec2 localNormal;
  final vec2 localPoint;
  final vec2 normal;

  final mat2 normalMass;
  //TODO(gregbglw): What does K mean? Find out and change the name.
  final mat2 K;

  Body bodyA;
  Body bodyB;

  int type;

  num radius;
  num friction;
  num restitution;
  int pointCount;

  Manifold manifold;

  ContactConstraint() :
    points = new List<ContactConstraintPoint>.generate(
        Settings.MAX_MANIFOLD_POINTS, (i) => new ContactConstraintPoint()),
    pointCount = 0,
    manifold = null,
    localNormal = new vec2.zero(),
    localPoint = new vec2.zero(),
    normal = new vec2.zero(),
    normalMass = new mat2.zero(),
    K = new mat2.zero();

  void setFrom(ContactConstraint cp) {
    pointCount = cp.pointCount;
    localNormal.copyFrom(cp.localNormal);
    localPoint.copyFrom(cp.localPoint);
    normal.copyFrom(cp.normal);
    normalMass.copyFrom(cp.normalMass);
    K.copyFrom(cp.K);
    bodyA = cp.bodyA;
    bodyB = cp.bodyB;
    type = cp.type;
    radius = cp.radius;
    friction = cp.friction;
    restitution = cp.restitution;
    manifold = cp.manifold;
    for(int i=0; i<cp.pointCount; i++) {
      points[i].setFrom(cp.points[i]);
    }
  }

  String toString() {
    String result = 'localNormal: "$localNormal", localPoint: "$localPoint" '
        'normal: "$normal", radius: "$radius" friction: "$friction" '
        'restitution: "$restitution", pointCount: "$pointCount"';
    return result;
  }
}
