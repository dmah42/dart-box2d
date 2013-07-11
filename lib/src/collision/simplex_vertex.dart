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
  final Vector2 wA = new Vector2.zero(); // support point in shapeA
  final Vector2 wB = new Vector2.zero(); // support point in shapeB
  final Vector2 w = new Vector2.zero(); // wB - wA
  double a = 0.0; // barycentric coordinate for closest point
  int indexA = 0; // wA index
  int indexB = 0; // wB index

  SimplexVertex();

  void setFrom(SimplexVertex sv) {
    wA.setFrom(sv.wA);
    wB.setFrom(sv.wB);
    w.setFrom(sv.w);
    a = sv.a;
    indexA = sv.indexA;
    indexB = sv.indexB;
  }

  String toString() => "wA: $wA, wB: $wB, w: $w";
}
