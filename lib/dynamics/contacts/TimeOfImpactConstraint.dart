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

class TimeOfImpactConstraint {
  final List<Vector> localPoints;
  final Vector localNormal;
  final Vector localPoint;
  int type;
  num radius;
  int pointCount;
  Body bodyA;
  Body bodyB;

  TimeOfImpactConstraint() :
    localPoints = new List<Vector>(Settings.MAX_MANIFOLD_POINTS),
    localNormal = new Vector(),
    localPoint = new Vector(),
    type = 0,
    radius = 0,
    pointCount = 0,
    bodyA = null,
    bodyB = null {
    for (int i = 0; i < localPoints.length; i++) {
      localPoints[i] = new Vector();
    }
  }

  void setFrom(TimeOfImpactConstraint argOther){
    for(int i=0; i<localPoints.length; i++){
      localPoints[i].setFrom(argOther.localPoints[i]);
    }
    localNormal.setFrom(argOther.localNormal);
    localPoint.setFrom(argOther.localPoint);
    type = argOther.type;
    radius = argOther.radius;
    pointCount = argOther.pointCount;
    bodyA = argOther.bodyA;
    bodyB = argOther.bodyB;
  }
}
