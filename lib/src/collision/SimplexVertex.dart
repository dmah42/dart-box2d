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

//  GJK using Voronoi regions (Christer Ericson) and Barycentric coordinates.

part of box2d;

class SimplexVertex {
  final vec2 wA; // support point in shapeA
  final vec2 wB; // support point in shapeB
  final vec2 w; // wB - wA
  num a; // barycentric coordinate for closest point
  int indexA; // wA index
  int indexB; // wB index

  SimplexVertex() :
    wA = new vec2(),
    wB = new vec2(),
    w = new vec2(),
    a = 0,
    indexA = 0,
    indexB = 0 { }

  void setFrom(SimplexVertex sv) {
    wA.copyFrom(sv.wA);
    wB.copyFrom(sv.wB);
    w.copyFrom(sv.w);
    a = sv.a;
    indexA = sv.indexA;
    indexB = sv.indexB;
  }

  String toString() => "wA: $wA, wB: $wB, w: $w";
}
