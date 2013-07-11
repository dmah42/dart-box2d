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
 * This is an internal structure.
 */

part of box2d;

class TimeStep {
  TimeStep();

  /** time step */
  double dt = 0.0;

  /** inverse time step (0 if dt == 0). */
  double inv_dt = 0.0;

  /** dt * inv_dt0 */
  double dtRatio = 0.0;

  int velocityIterations = 0;

  int positionIterations = 0;

  bool warmStarting = true;
}
