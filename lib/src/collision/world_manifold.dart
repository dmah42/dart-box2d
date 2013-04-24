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
 * Used to compute the current state of a contact manifold.
 */

part of box2d;

class WorldManifold {
  /**
   * World vector pointing from A to B
   */
  vec2 normal;

  /**
   * World contact points (points of intersection)
   */
  final List<vec2> points;

  /**
   * Constructs a new WorldManifold.
   */
  WorldManifold()
      : normal = new vec2.zero(),
        points = new List<vec2>.generate(
            Settings.MAX_MANIFOLD_POINTS, (i) => new vec2.zero());

  void initialize(Manifold manifold, Transform xfA, num radiusA, Transform xfB,
      num radiusB) {
    switch (manifold.type) {
      case ManifoldType.CIRCLES:
        normal.makeRaw(1.0, 0.0);
        final vec2 pointA = xfA.position + xfA.rotation * manifold.localPoint;
        final vec2 pointB = xfB.position + xfB.rotation * manifold.points[0].localPoint;

        if (distance2(pointA, pointB) > Settings.EPSILON * Settings.EPSILON) {
          normal.copyFrom(pointB).sub(pointA);
          normal.normalize();
        }

        final vec2 cA = normal * radiusA + pointA;
        final vec2 cB = -normal * radiusB + pointB;

        points[0].copyFrom(cA).add(cB).scale(0.5);
        return;
      case ManifoldType.FACE_A:
        normal = xfA.rotation * manifold.localNormal;
        final vec2 planePoint = xfA.position + xfA.rotation * manifold.localPoint;

        // NOTE: the below still creates new vectors.
        for (int i = 0; i < manifold.pointCount; ++i) {
          final vec2 clipPoint = xfB.position + xfB.rotation * manifold.points[i].localPoint;

          num scalar = radiusA - ((clipPoint.x - planePoint.x) *
              normal.x + (clipPoint.y - planePoint.y) * normal.y);

          vec2 cA = normal * scalar + clipPoint;
          vec2 cB = normal * (-radiusB) + clipPoint;

          points[i] = (cA + cB).scale(0.5);
        }

        return;
      case ManifoldType.FACE_B :
        final mat2 R = xfB.rotation;
        normal = R * manifold.localNormal;
        final vec2 v = manifold.localPoint;
        final vec2 planePoint = xfB.position + xfB.rotation * v;

        // TODO(dominic): Some vector cleanup here.
        for (int i = 0; i < manifold.pointCount; ++i) {
          vec2 clipPoint = xfA.position + xfA.rotation * manifold.points[i].localPoint;

          num scalar = radiusB - ((clipPoint.x - planePoint.x) * normal.x +
              (clipPoint.y - planePoint.y) * normal.y);

          vec2 cB = normal * scalar + clipPoint;
          vec2 cA = normal * (-radiusA) + clipPoint;

          points[i] = (cA + cB).scale(0.5);
        }
        // Ensure normal points from A to B.
        normal.negate();
        break;
     }
  }
}
