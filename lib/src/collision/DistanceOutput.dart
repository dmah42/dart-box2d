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

/**
 * Output for Distance.
 */

part of box2d;

class DistanceOutput {
  /** Closest point on shapeA */
  final vec2 pointA;

  /** Closest point on shapeB */
  final vec2 pointB;

  num _distance;

  /** number of gjk iterations used */
  int iterations;

  DistanceOutput() :
    pointA = new vec2.zero(),
    pointB = new vec2.zero() { }
}
