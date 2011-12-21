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

class ContactConstraint {
  List<ContactConstraintPoint> points;

  final Vector localNormal;
  final Vector localPoint;
  final Vector normal;

  final Matrix22 normalMass;
  //TODO(gregbglw): What does K mean? Find out and change the name.
  final Matrix22 K;

  Body bodyA;
  Body bodyB;

  int type;

  num radius;
  num friction;
  num restitution;
  int pointCount;

  Manifold manifold;

  ContactConstraint() :
    points = new List<ContactConstraintPoint>(Settings.MAX_MANIFOLD_POINTS),
    pointCount = 0,
    manifold = null,
    localNormal = new Vector(),
    localPoint = new Vector(),
    normal = new Vector(),
    normalMass = new Matrix22(),
    K = new Matrix22() {
    for (int i = 0; i < Settings.MAX_MANIFOLD_POINTS; i++) {
        points[i] = new ContactConstraintPoint();
    }
  }

  void setFrom(ContactConstraint cp) {
    pointCount = cp.pointCount;
    localNormal.setFrom(cp.localNormal);
    localPoint.setFrom(cp.localPoint);
    normal.setFrom(cp.normal);
    normalMass.setFrom(cp.normalMass);
    K.setFrom(cp.K);
    bodyA = cp.bodyA;
    bodyB = cp.bodyB;
    type = cp.type;
    radius = cp.radius;
    friction = cp.friction;
    restitution = cp.restitution;
    manifold = cp.manifold;
    for(int i=0; i<cp.pointCount; i++) {
      points[i].setFrom(cp.points[i]);
    }
  }

  String toString() {
    String result = 'localNormal: "$localNormal", localPoint: "$localPoint" ' +
        'normal: "$normal", radius: "$radius" friction: "$friction" ' +
        'restitution: "$restitution", pointCount: "$pointCount"';
    return result;
  }
}
