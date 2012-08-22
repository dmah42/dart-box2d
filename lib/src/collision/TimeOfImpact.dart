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
 * Class used for computing the time of impact. This class should not be
 * constructed usually, just retrieve from the SingletonPool.getTimeOfImpact().
 */

part of box2d;

class TimeOfImpact {
  static const int MAX_ITERATIONS = 1000;

  static int toiCalls;
  static int toiIters;
  static int toiMaxIters;
  static int toiRootIters;
  static int toiMaxRootIters;

  /** Pool variables */
  final SimplexCache cache;
  final DistanceInput distanceInput;
  final Transform xfA;
  final Transform xfB;
  final DistanceOutput distanceOutput;
  final SeparationFunction fcn;
  final List<int> indexes;
  final Sweep sweepA;
  final Sweep sweepB;

  DefaultWorldPool pool;

  TimeOfImpact._construct(DefaultWorldPool argPool) :
    pool = argPool,
    cache = new SimplexCache(),
    distanceInput = new DistanceInput(),
    xfA = new Transform(),
    xfB = new Transform(),
    distanceOutput = new DistanceOutput(),
    fcn = new SeparationFunction(),
    indexes = new List<int>(2),
    sweepA = new Sweep(),
    sweepB = new Sweep() {
    indexes[0] = 0;
    indexes[1] = 0;
    toiCalls = 0;
    toiIters = 0;
    toiMaxIters = 0;
    toiRootIters = 0;
    toiMaxRootIters = 0;
  }

  /**
   * Compute the upper bound on time before two shapes penetrate. Time is
   * represented as a fraction between [0,tMax]. This uses a swept separating
   * axis and may miss some intermediate, non-tunneling collision. If you
   * change the time interval, you should call this function again.
   * Note: use Distance to compute the contact point and normal at the time
   * of impact.
   */
  void timeOfImpact(TimeOfImpactOutput output, TimeOfImpactInput input) {
    // CCD via the local separating axis method. This seeks progression
    // by computing the largest time at which separation is maintained.
    ++toiCalls;

    output.state = TimeOfImpactOutputState.UNKNOWN;
    output.t = input.tMax;

    DistanceProxy proxyA = input.proxyA;
    DistanceProxy proxyB = input.proxyB;

    sweepA.setFrom(input.sweepA);
    sweepB.setFrom(input.sweepB);

    // Large rotations can make the root finder fail, so we normalize the
    // sweep angles.
    sweepA.normalize();
    sweepB.normalize();

    num tMax = input.tMax;

    num totalRadius = proxyA.radius + proxyB.radius;
    num target = Math.max(Settings.LINEAR_SLOP, totalRadius
        - 3.0 * Settings.LINEAR_SLOP);
    num tolerance = 0.25 * Settings.LINEAR_SLOP;

    assert (target > tolerance);

    num t1 = 0;
    int iter = 0;

    cache.count = 0;
    distanceInput.proxyA = input.proxyA;
    distanceInput.proxyB = input.proxyB;
    distanceInput.useRadii = false;

    // The outer loop progressively attempts to compute new separating axes.
    // This loop terminates when an axis is repeated (no progress is made).
    while (true) {
      sweepA.getTransform(xfA, t1);
      sweepB.getTransform(xfB, t1);
      // Get the distance between shapes. We can also use the results
      // to get a separating axis
      distanceInput.transformA = xfA;
      distanceInput.transformB = xfB;
      pool.distance.computeDistance(distanceOutput, cache, distanceInput);

      // If the shapes are overlapped, we give up on continuous collision.
      if (distanceOutput._distance <= 0) {
        // Failure!
        output.state = TimeOfImpactOutputState.OVERLAPPED;
        output.t = 0;
        break;
      }

      if (distanceOutput._distance < target + tolerance) {
        // Victory!
        output.state = TimeOfImpactOutputState.TOUCHING;
        output.t = t1;
        break;
      }

      // Initialize the separating axis.
      fcn.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);

      // Compute the TimeOfImpact on the separating axis. We do this by successively
      // resolving the deepest point. This loop is bounded by the number of
      // vertices.
      bool done = false;
      num t2 = tMax;
      int pushBackIter = 0;
      while (true) {

        // Find the deepest point at t2. Store the witness point indices.
        num s2 = fcn.findMinSeparation(indexes, t2);
        // Is the configuration separated?
        if (s2 > target + tolerance) {
          // Victory!
          output.state = TimeOfImpactOutputState.SEPARATED;
          output.t = tMax;
          done = true;
          break;
        }

        // Has the separation reached tolerance?
        if (s2 > target - tolerance) {
          // Advance the sweeps
          t1 = t2;
          break;
        }

        // Compute the initial separation of the witness points.
        num s1 = fcn.evaluate(indexes[0], indexes[1], t1);
        // Check for initial overlap. This might happen if the root finder
        // runs out of iterations.
        if (s1 < target - tolerance) {
          output.state = TimeOfImpactOutputState.FAILED;
          output.t = t1;
          done = true;
          break;
        }

        // Check for touching
        if (s1 <= target + tolerance) {
          // Victory! t1 should hold the TimeOfImpact (could be 0.0).
          output.state = TimeOfImpactOutputState.TOUCHING;
          output.t = t1;
          done = true;
          break;
        }

        // Compute 1D root of: f(x) - target = 0
        int rootIterCount = 0;
        num a1 = t1, a2 = t2;
        while (true) {
          // Use a mix of the secant rule and bisection.
          num t;
          if ((rootIterCount & 1) == 1) {
            // Secant rule to improve convergence.
            t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
          } else {
            // Bisection to guarantee progress.
            t = 0.5 * (a1 + a2);
          }

          num s = fcn.evaluate(indexes[0], indexes[1], t);

          if ((s - target).abs() < tolerance) {
            // t2 holds a tentative value for t1
            t2 = t;
            break;
          }

          // Ensure we continue to bracket the root.
          if (s > target) {
            a1 = t;
            s1 = s;
          } else {
            a2 = t;
            s2 = s;
          }

          ++rootIterCount;
          ++toiRootIters;

          // djm: whats with this? put in settings?
          if (rootIterCount == 50) {
            break;
          }
        }

        toiMaxRootIters = Math.max(toiMaxRootIters, rootIterCount);

        ++pushBackIter;

        if (pushBackIter == Settings.MAX_POLYGON_VERTICES) {
          break;
        }
      }

      ++iter;
      ++toiIters;

      if (done)
        break;

      if (iter == MAX_ITERATIONS) {
        // Root finder got stuck. Semi-victory.
        output.state = TimeOfImpactOutputState.FAILED;
        output.t = t1;
        break;
      }
    }

    toiMaxIters = Math.max(toiMaxIters, iter);
  }
}

class SeparationFunction {
  DistanceProxy proxyA;
  DistanceProxy proxyB;
  int type;
  final vec2 localPoint;
  final vec2 axis;
  Sweep sweepA;
  Sweep sweepB;

  /** Pooling */
  final vec2 localPointA;
  final vec2 localPointB;
  final vec2 pointA;
  final vec2 pointB;
  final vec2 localPointA1;
  final vec2 localPointA2;
  final vec2 normal;
  final vec2 localPointB1;
  final vec2 localPointB2;
  final vec2 axisA;
  final vec2 axisB;
  final vec2 temp;
  final Transform xfa;
  final Transform xfb;

  SeparationFunction() :
    proxyA = new DistanceProxy(),
    proxyB = new DistanceProxy(),
    type = SeparationType.POINTS,
    localPoint = new vec2(),
    axis = new vec2(),
    sweepA = new Sweep(),
    sweepB = new Sweep(),
    localPointA = new vec2(),
    localPointB = new vec2(),
    pointA = new vec2(),
    pointB = new vec2(),
    localPointA1 = new vec2(),
    localPointA2 = new vec2(),
    normal = new vec2(),
    localPointB1 = new vec2(),
    localPointB2 = new vec2(),
    temp = new vec2(),
    xfa = new Transform(),
    xfb = new Transform(),
    axisA = new vec2(),
    axisB = new vec2() { }

  num initialize(SimplexCache cache, DistanceProxy argProxyA, Sweep
      argSweepA, DistanceProxy argProxyB, Sweep argSweepB, num t1) {
    proxyA = argProxyA;
    proxyB = argProxyB;
    int count = cache.count;
    assert (0 < count && count < 3);

    sweepA = argSweepA;
    sweepB = argSweepB;

    sweepA.getTransform(xfa, t1);
    sweepB.getTransform(xfb, t1);

    if (count == 1) {
      type = SeparationType.POINTS;
      localPointA.copyFrom(proxyA.vertices[cache.indexA[0]]);
      localPointB.copyFrom(proxyB.vertices[cache.indexB[0]]);
      Transform.mulToOut(xfa, localPointA, pointA);
      Transform.mulToOut(xfb, localPointB, pointB);
      axis.copyFrom(pointB).sub(pointA);
      num s = axis.length;
      axis.normalize();
      return s;
    } else if (cache.indexA[0] == cache.indexA[1]) {
      // Two points on B and one on A.
      type = SeparationType.FACE_B;

      localPointB1.copyFrom(proxyB.vertices[cache.indexB[0]]);
      localPointB2.copyFrom(proxyB.vertices[cache.indexB[1]]);

      temp.copyFrom(localPointB2).sub(localPointB1);
      cross(temp, 1, out: axis);
      axis.normalize();

      normal.copyFrom(axis);
      xfb.rotation.transformDirect(normal);

      localPoint.copyFrom(localPointB1).add(localPointB2).scale(0.5);
      Transform.mulToOut(xfb, localPoint, pointB);

      localPointA.copyFrom(proxyA.vertices[cache.indexA[0]]);
      Transform.mulToOut(xfa, localPointA, pointA);

      temp.copyFrom(pointA).sub(pointB);
      num s = dot(temp, normal);
      if (s < 0.0) {
        axis.negate_();
        s = -s;
      }

      return s;
    } else {
      // Two points on A and one or two points on B.
      type = SeparationType.FACE_A;

      localPointA1.copyFrom(proxyA.vertices[cache.indexA[0]]);
      localPointA2.copyFrom(proxyA.vertices[cache.indexA[1]]);

      temp.copyFrom(localPointA2).sub(localPointA1);
      cross(temp, 1, out: axis);
      axis.normalize();

      normal.copyFrom(axis);
      xfa.rotation.transformDirect(normal);

      localPoint.copyFrom(localPointA1).add(localPointA2).scale(0.5);
      Transform.mulToOut(xfa, localPoint, pointA);

      localPointB.copyFrom(proxyB.vertices[cache.indexB[0]]);
      Transform.mulToOut(xfb, localPointB, pointB);

      temp.copyFrom(pointB).sub(pointA);
      num s = dot(temp, normal);
      if (s < 0.0) {
        axis.negate_();
        s = -s;
      }
      return s;
    }
  }

  num findMinSeparation(List<int> indexes, num t) {
    sweepA.getTransform(xfa, t);
    sweepB.getTransform(xfb, t);

    switch (type) {
      case SeparationType.POINTS:
        axisA.copyFrom(axis);
        xfa.rotation.transposed().transformDirect(axisA);
        axisB.copyFrom(axis).negate_();
        xfb.rotation.transposed().transformDirect(axisB);

        indexes[0] = proxyA.getSupport(axisA);
        indexes[1] = proxyB.getSupport(axisB);

        localPointA.copyFrom(proxyA.vertices[indexes[0]]);
        localPointB.copyFrom(proxyB.vertices[indexes[1]]);

        Transform.mulToOut(xfa, localPointA, pointA);
        Transform.mulToOut(xfb, localPointB, pointB);

        return dot(pointB.sub(pointA), axis);

      case SeparationType.FACE_A:
        normal.copyFrom(axis);
        xfa.rotation.transformDirect(normal);
        Transform.mulToOut(xfa, localPoint, pointA);

        axisB.copyFrom(normal).negate_();
        xfb.rotation.transposed().transformDirect(axisB);

        indexes[0] = -1;
        indexes[1] = proxyB.getSupport(axisB);

        localPointB.copyFrom(proxyB.vertices[indexes[1]]);
        Transform.mulToOut(xfb, localPointB, pointB);

        return dot(pointB.sub(pointA), normal);

      case SeparationType.FACE_B:
        normal.copyFrom(axis);
        xfb.rotation.transformDirect(normal);
        Transform.mulToOut(xfb, localPoint, pointB);

        axisA.copyFrom(normal).negate_();
        xfa.rotation.transposed().transformDirect(axisA);

        indexes[1] = -1;
        indexes[0] = proxyA.getSupport(axisA);

        localPointA.copyFrom(proxyA.vertices[indexes[0]]);
        Transform.mulToOut(xfa, localPointA, pointA);

        return dot(pointA.sub(pointB), normal);

      default:
        assert (false);
        indexes[0] = -1;
        indexes[1] = -1;
        return 0;
    }
  }

  num evaluate(int indexA, int indexB, num t) {
    sweepA.getTransform(xfa, t);
    sweepB.getTransform(xfb, t);

    switch (type) {
      case SeparationType.POINTS:
        axisA.copyFrom(axis);
        xfa.rotation.transposed().transformDirect(axisA);
        axisB.copyFrom(axis).negate_();
        xfb.rotation.transposed().transformDirect(axisB);

        localPointA.copyFrom(proxyA.vertices[indexA]);
        localPointB.copyFrom(proxyB.vertices[indexB]);

        Transform.mulToOut(xfa, localPointA, pointA);
        Transform.mulToOut(xfb, localPointB, pointB);

        return dot(pointB.sub(pointA), axis);

      case SeparationType.FACE_A:
        normal.copyFrom(axis);
        xfa.rotation.transformDirect(normal);
        Transform.mulToOut(xfa, localPoint, pointA);

        axisB.copyFrom(normal).negate_();
        xfb.rotation.transposed().transformDirect(axisB);

        localPointB.copyFrom(proxyB.vertices[indexB]);
        Transform.mulToOut(xfb, localPointB, pointB);
        return dot(pointB.sub(pointA), normal);

      case SeparationType.FACE_B:
        normal.copyFrom(axis);
        xfb.rotation.transformDirect(normal);
        Transform.mulToOut(xfb, localPoint, pointB);

        axisA.copyFrom(normal).negate_();
        xfa.rotation.transposed().transformDirect(axisA);

        localPointA.copyFrom(proxyA.vertices[indexA]);
        Transform.mulToOut(xfa, localPointA, pointA);

        return dot(pointA.sub(pointB), normal);

      default:
        assert (false);
        return 0;
    }
  }
}

/**
 * Input parameters for TimeOfImpact.
 */
class TimeOfImpactInput {
  final DistanceProxy proxyA;
  final DistanceProxy proxyB;
  final Sweep sweepA;
  final Sweep sweepB;

  /**
   * defines sweep interval [0, tMax]
   */
  num tMax;

  TimeOfImpactInput() :
    proxyA = new DistanceProxy(),
    proxyB = new DistanceProxy(),
    sweepA = new Sweep(),
    sweepB = new Sweep(),
    tMax = 0 { }
}

/** Enum for TimeOfImpact output. */
class TimeOfImpactOutputState {
  static const int UNKNOWN = 0;
  static const int FAILED = 1;
  static const int OVERLAPPED = 2;
  static const int TOUCHING = 3;
  static const int SEPARATED = 4;
}

/**
 * Output parameters for TimeOfImpact
 */
class TimeOfImpactOutput {
  int state;
  num t;

  TimeOfImpactOutput() :
    state = TimeOfImpactOutputState.UNKNOWN,
    t = 0 { }
}

class SeparationType {
  static const int POINTS = 0;
  static const int FACE_A = 1;
  static const int FACE_B = 2;
}
