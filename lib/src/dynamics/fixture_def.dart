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
 * A fixture definition is used to create a fixture. You can reuse fixture
 * definitions.
 */

part of box2d;

class FixtureDef {
  /**
   * The shape to use in the fixture. This must be set.
   */
  Shape shape;

  /**
   * Use this to store application specific fixture data.
   */
  dynamic userData;

  /**
   * The friction coefficient, usually in the range [0,1].
   */
  double friction = 0.2;

  /**
   * The restitution (elasticity) usually in the range [0,1].
   */
  double restitution = 0.0;

  /**
   * The density, usually in kg/m^2
   */
  double density = 0.0;

  /**
   * A sensor shape collects contact information but never generates a collision
   * response.
   */
  bool isSensor = false;

  /**
   * Contact filtering data;
   */
  Filter filter = new Filter();

  /**
   * Constructs a new FixtureDef with default values.
   */
  FixtureDef() {
    // Setup the filter.
    filter.categoryBits = 0x0001;
    filter.maskBits = 0xFFFF;
    filter.groupIndex = 0;
  }
}
