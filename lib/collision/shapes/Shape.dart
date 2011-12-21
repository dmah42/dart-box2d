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
 * A shape is used for collision detection. You can create a shape however you
 * like. Shapes used for simulation in World are created automatically when
 * a Fixture is created.  Shapes may encapsulate a one or more child shapes.
 */
// TODO(gregbglw): Make these actual abstract methods.
class Shape {
  /** The type of shape. Either circle or polygon. */
  int type;

  /** Shape radius. */
  num radius;

  /**
   * Constructs a new shape of unknown type.
   */
  Shape([int type = ShapeType.UNKNOWN, num radius = 0]) :
    type = type,
    radius = radius { }

  /**
   * Test a point for containment in this shape. This only works for convex
   * shapes.
   * transform:  the shape world transform.
   * point: a point in world coordinates.
   */
  // TODO: abstract http://b/issue?id=5015671
  bool testPoint(Transform transform, Vector point) { }

  /**
   * Computes the associated axis aligned bounding box for a child shape
   * given a transform. Returns through the given out paramater.
   */
  // TODO: abstract http://b/issue?id=5015671
  void computeAxisAlignedBox(AxisAlignedBox box, Transform transform) { }

  /**
   * Computes (and returns through the given out parameter massData) the mass
   * properties of this shape using its dimensions and the
   * given density. The inertia tensor is computed about the local origin.
   */
  // TODO: abstract http://b/issue?id=5015671
  void computeMass(MassData massData, num density) { }

  /** Returns a clone of this shape. */
  // TODO: abstract http://b/issue?id=5015671
  Shape clone() { }
}
