/*******************************************************************************
 * Copyright (c) 2011, Daniel Murphy
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 	* Redistributions of source code must retain the above copyright notice,
 * 	  this list of conditions and the following disclaimer.
 * 	* Redistributions in binary form must reproduce the above copyright notice,
 * 	  this list of conditions and the following disclaimer in the documentation
 * 	  and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 ******************************************************************************/

/**
 * This is non-static for faster pooling. To get an instance,
 * use the SingletonPool rather than construct a distance object.
 */
class Distance {
  int calls;
  int iters;
  int maxIters;

  /** Pool variables for use in distance calculation. */
  Simplex simplex;
  List<int> saveA;
  List<int> saveB;
  Vector closestPoint;
  Vector searchDirection;
  Vector temp;
  Vector normal;

  /**
   * Construct a new Distance object. For internal use only. Don't directly
   * invoke.
   */
  Distance._construct() :
    simplex = new Simplex(),
    saveA = new List<int>(3),
    saveB = new List<int>(3),
    closestPoint = new Vector(),
    searchDirection = new Vector(),
    temp = new Vector(),
    normal = new Vector(),
    calls = 0,
    iters = 0,
    maxIters = 20 { }

  /**
   * Compute the closest points between two shapes. Supports any combination of:
   * CircleShape and PolygonShape. The simplex cache is input/output.
   * On the first call set SimplexCache.count to zero.
   */
  void distance(DistanceOutput output, SimplexCache cache,
      DistanceInput input) {
    calls++;

    final DistanceProxy proxyA = input.proxyA;
    final DistanceProxy proxyB = input.proxyB;

    Transform transformA = input.transformA;
    Transform transformB = input.transformB;

    // Initialize the simplex.
    simplex.readCache(cache, proxyA, transformA, proxyB, transformB);

    // Get simplex vertices as an array.
    List<SimplexVertex> vertices = simplex.vertices;

    // These store the vertices of the last simplex so that we
    // can check for duplicates and prevent cycling.
    // (pooled above)
    int saveCount = 0;

    simplex.getClosestPoint(closestPoint);
    num distanceSqr1 = closestPoint.lengthSquared;
    num distanceSqr2 = distanceSqr1;

    // Main iteration loop
    int iter = 0;
    while (iter < maxIters) {

      // Copy simplex so we can identify duplicates.
      saveCount = simplex.count;
      for (int i = 0; i < saveCount; i++) {
        saveA[i] = vertices[i].indexA;
        saveB[i] = vertices[i].indexB;
      }

      switch (simplex.count) {
        case 1 :
          break;
        case 2 :
          simplex.solve2();
          break;
        case 3 :
          simplex.solve3();
          break;
        default :
          assert (false);
      }

      // If we have 3 points, then the origin is in the corresponding triangle.
      if (simplex.count == 3) {
        break;
      }

      // Compute closest point.
      simplex.getClosestPoint(closestPoint);
      distanceSqr2 = closestPoint.lengthSquared;

      // ensure progress
      if (distanceSqr2 >= distanceSqr1) {
        // break;
      }
      distanceSqr1 = distanceSqr2;

      // get search direction;
      simplex.getSearchDirection(searchDirection);

      // Ensure the search direction is numerically fit.
      if (searchDirection.lengthSquared < Settings.EPSILON * Settings.EPSILON) {
        // The origin is probably contained by a line segment
        // or triangle. Thus the shapes are overlapped.

        // We can't return zero here even though there may be overlap.
        // In case the simplex is a point, segment, or triangle it is difficult
        // to determine if the origin is contained in the CSO or very close to
        // it.
        break;
      }

      // Compute a tentative new simplex vertex using support points.
      SimplexVertex vertex = vertices[simplex.count];

      Matrix22.mulTransMatrixAndVectorToOut(transformA.rotation,
          searchDirection.negateLocal(), temp);
      vertex.indexA = proxyA.getSupport(temp);
      Transform.mulToOut(transformA, proxyA.vertices[vertex.indexA],
          vertex.wA);
      // Vec2 wBLocal;
      Matrix22.mulTransMatrixAndVectorToOut(transformB.rotation,
          searchDirection.negateLocal(), temp);
      vertex.indexB = proxyB.getSupport(temp);
      Transform.mulToOut(transformB, proxyB.vertices[vertex.indexB],
          vertex.wB);
      vertex.w.setFrom(vertex.wB).subLocal(vertex.wA);

      // Iteration count is equated to the number of support point calls.
      ++iter;
      ++iters;

      // Check for duplicate support points. This is the main termination
      // criteria.
      bool duplicate = false;
      for (int i = 0; i < saveCount; ++i) {
        if (vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
          duplicate = true;
          break;
        }
      }

      // If we found a duplicate support point we must exit to avoid cycling.
      if (duplicate) {
        break;
      }

      // New vertex is ok and needed.
      ++simplex.count;
    }

    maxIters = Math.max(maxIters, iter);

    // Prepare output.
    simplex.getWitnessPoints(output.pointA, output.pointB);
    output.distance = MathBox.distance(output.pointA, output.pointB);
    output.iterations = iter;

    // Cache the simplex.
    simplex.writeCache(cache);

    // Apply radii if requested.
    if (input.useRadii) {
      num rA = proxyA.radius;
      num rB = proxyB.radius;

      if (output.distance > rA + rB && output.distance > Settings.EPSILON) {
        // Shapes are still no overlapped.
        // Move the witness points to the outer surface.
        output.distance -= rA + rB;
        normal.setFrom(output.pointB).subLocal(output.pointA);
        normal.normalize();
        temp.setFrom(normal).mulLocal(rA);
        output.pointA.addLocal(temp);
        temp.setFrom(normal).mulLocal(rB);
        output.pointB.subLocal(temp);
      } else {
        // Shapes are overlapped when radii are considered.
        // Move the witness points to the middle.
        output.pointA.addLocal(output.pointB).mulLocal(.5);
        output.pointB.setFrom(output.pointA);
        output.distance = 0.0;
      }
    }
  }
}
