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
 * A manifold for two touching convex shapes. Box2D has support for many kinds
 * of contact, such as clip pont versus plain with radius and point versus point
 * with radius (as with circles).
 */
class Manifold {
  /** The points of contact. */
  final List<ManifoldPoint> points;

  /**
   * The meaning of the localNormal depends on the type of this manifold. The
   * different meanings (or lack thereof) are outlined below.
   * Circles: not used.
   * faceA: The normal on polygonA.
   * faceB: The normal on polygonB.
   */
  final Vector localNormal;

  /**
   * The meaning of the localPoint depends on the type of this manifold. The
   * different meanings (or lack thereof) are outlined below.
   * Circles: The local center of circleA.
   * faceA: The center of faceA.
   * faceB: The center of faceB.
   */
  final Vector localPoint;

  /** The type of manifold. See [ManifoldType]. */
  int type;

  /** The number of manifold points. */
  int pointCount;

  /**
   * Creates a manifold with 0 points. It's point array should be full of
   * already instantiated ManifoldPoints.
   */
  Manifold() :
    points = new List<ManifoldPoint>(Settings.MAX_MANIFOLD_POINTS),
    localNormal = new Vector(),
    localPoint = new Vector(),
    pointCount = 0 {

    for (int i = 0; i < Settings.MAX_MANIFOLD_POINTS; i++) {
      points[i] = new ManifoldPoint();
    }
  }

  /**
   * Creates a new manifold that is a copy of the given manifold.
   */
  Manifold.copy(Manifold other) :
    points = new List<ManifoldPoint>(Settings.MAX_MANIFOLD_POINTS),
    localNormal = new Vector.copy(other.localNormal),
    localPoint = new Vector.copy(other.localPoint),
    pointCount = other.pointCount,
    type = other.type {
    for (int i = 0; i < Settings.MAX_MANIFOLD_POINTS; i++) {
      points[i] = new ManifoldPoint.copy(other.points[i]);
    }
  }

  /**
   * Sets this manifold to be a copy of the given manifold.
   */
  void setFrom(Manifold other) {
    for (int i = 0; i < other.pointCount; i++) {
      points[i].setFrom(other.points[i]);
    }

    type = other.type;
    localNormal.setFrom(other.localNormal);
    localPoint.setFrom(other.localPoint);
    pointCount = other.pointCount;
  }
}
