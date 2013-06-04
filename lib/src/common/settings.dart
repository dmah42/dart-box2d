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
 * Global tuning constants based on MKS units and various integer
 * maximums(vertices per shape, pairs, etc.).
 */

part of box2d;

class Settings {
  /** Size that pool stacks are initialized to. */
  static const int CONTACT_STACK_INIT_SIZE = 10;

  /** A "close to Zero" num epsilon value for use */
  static const double EPSILON = .0000001192;

  /**
   * Maximum number of contacts to be handled to solve a TimeOfImpact island.
   */
  static const int MAX_TIME_OF_IMPACT_CONTACTS = 32;

  /**
   * A body cannot sleep if its linear velocity is above this tolerance.
   */
  static const double LINEAR_SLEEP_TOLERANCE = 0.01;

  /**
   * The maximum linear position correction used when solving constraints.
   * This helps to prevent overshoot.
   */
  static const double MAX_LINEAR_CORRECTION = 0.2;

  /**
   * A body cannot sleep if its angular velocity is above this tolerance.
   */
  static const double ANGULAR_SLEEP_TOLERANCE = 2.0 / 180.0 * Math.PI;

  static const double TIME_TO_SLEEP = 0.5;

  static const int TREE_REBALANCE_STEPS = 4;

  static const int MAX_INTEGER = 2147483647;

  static const double SMALL_NUMBER = .000000000001;
  static const double BIG_NUMBER = 99999999999999.0;

  /**
   * A small length used as a collision and constant tolerance. Usually it
   * is chosen to be numerically significant, but visually insignificant.
   */
  static const double LINEAR_SLOP = 0.005;

  /**
   * The radius of the polygon/edge shape skin. This should not be modified.
   * Making this smaller means polygons will have and insufficient for
   * continuous collision. Making it larger may create artifacts for vertex
   * collision.
   */
  static const double POLYGON_RADIUS = 2.0 * LINEAR_SLOP;

  static const int VELOCITY_THRESHOLD = 1;

  /**
   * Fattens bounding boxes in the dynamic tree by this amount. Allows proxies
   * to move by small amounts without needing to adjust the tree. This value is
   * in meters.
   */
  static const double BOUNDING_BOX_EXTENSION = .1;

  /**
   * This is used to fatten AABBs in the dynamic tree. This is used to predict
   * the future position based on the current displacement.
   * This is a dimensionless multiplier.
   */
  static const double BOUNDING_BOX_MULTIPLIER = 2.0;

  /**
   * This scale factor controls how fast overlap is resolved. Ideally this
   * would be 1 so that overlap is removed in one time step. However using
   * values close to 1 often lead to overshoot.
   */
  static const double CONTACT_BAUMGARTE = 0.2;

  /**
   * The maximum linear velocity of a body. This limit is very large and is
   * used to prevent numerical problems. You shouldn't need to adjust this.
   */
  static const double MAX_TRANSLATION = 2.0;
  static const double MAX_TRANSLATION_SQUARED = MAX_TRANSLATION * MAX_TRANSLATION;

  /**
   * The maximum angular velocity of a body. This limit is very large and is
   * used to prevent numerical problems. You shouldn't need to adjust this.
   */
  static const double MAX_ROTATION = 0.5 * Math.PI;
  static const double MAX_ROTATION_SQUARED = MAX_ROTATION * MAX_ROTATION;

  /**
   * The maximum number of contact points between two convex shapes.
   */
  static const int MAX_MANIFOLD_POINTS = 2;

  /**
   * A small angle used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  static const double ANGULAR_SLOP = (2.0 / 180.0 * Math.PI);

  /**
   * The maximum angular position correction used when solving constraints.
   * This helps to prevent overshoot.
   */
  static const double MAX_ANGULAR_CORRECTION = (8.0 / 180.0 * Math.PI);

  /**
   * The maximum number of vertices on a convex polygon.
   */
  static const int MAX_POLYGON_VERTICES = 8;

  /**
   * Friction mixing law.
   */
  static double mixFriction(double friction1, double friction2) {
    return Math.sqrt(friction1 * friction2);
  }

  /**
   * Restitution mixing law.
   */
  static double mixRestitution(double restitution1, double restitution2) {
    return restitution1 > restitution2 ? restitution1 : restitution2;
  }
}
