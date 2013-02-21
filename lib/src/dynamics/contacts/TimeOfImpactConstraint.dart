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
  final List<vec2> localPoints;
  final vec2 localNormal;
  final vec2 localPoint;
  int type;
  num radius;
  int pointCount;
  Body bodyA;
  Body bodyB;

  TimeOfImpactConstraint() :
    localPoints = new List<vec2>(Settings.MAX_MANIFOLD_POINTS),
    localNormal = new vec2.zero(),
    localPoint = new vec2.zero(),
    type = 0,
    radius = 0,
    pointCount = 0,
    bodyA = null,
    bodyB = null {
    for (int i = 0; i < localPoints.length; i++) {
      localPoints[i] = new vec2.zero();
    }
  }

  void setFrom(TimeOfImpactConstraint argOther){
    for(int i=0; i<localPoints.length; i++){
      localPoints[i].copyFrom(argOther.localPoints[i]);
    }
    localNormal.copyFrom(argOther.localNormal);
    localPoint.copyFrom(argOther.localPoint);
    type = argOther.type;
    radius = argOther.radius;
    pointCount = argOther.pointCount;
    bodyA = argOther.bodyA;
    bodyB = argOther.bodyB;
  }
}
