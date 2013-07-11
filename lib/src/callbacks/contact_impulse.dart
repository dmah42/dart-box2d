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
 * Contact impulses for reporting. Impulses are used instead of forces because
 * sub-step forces may approach infinity for rigid body collisions. These
 * match up one-to-one with the contact points in [Manifold].
 */

part of box2d;

class ContactImpulse {
  List<double> normalImpulses = new List<double>(Settings.MAX_MANIFOLD_POINTS);
  List<double> tangentImpulses = new List<double>(Settings.MAX_MANIFOLD_POINTS);

  ContactImpulse();
}

