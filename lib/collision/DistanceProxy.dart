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
 * A distance proxy is used by the GJK algorithm. It encapsulates any shape.
 */
class DistanceProxy {
  final List<Vector> vertices;
  int count;
  num radius;

  /**
   * Constructs a new DistanceProxy.
   */
  DistanceProxy() :
    vertices = new List<Vector>(Settings.MAX_POLYGON_VERTICES),
    count = 0,
    radius = 0 {

    for(int i = 0; i < vertices.length; i++) {
      vertices[i] = new Vector();
    }
  }

  /**
   * Initialize the proxy using the given shape. The shape
   * must remain in scope while the proxy is in use.
   */
  void setFromShape(shape) {
    // If the shape is a circle...
    if (shape.type == ShapeType.CIRCLE) {
      vertices[0].setFrom(shape.position);
      count = 1;
      radius = shape.radius;

      // If the shape is a polygon...
    } else if (shape.type == ShapeType.POLYGON) {
        count = shape.vertexCount;
        radius = shape.radius;
        for(int i = 0; i < count; i++) {
          vertices[i].setFrom(shape.vertices[i]);
        }
    } else {
      // Should always be a circle or a polygon.
      assert(false);
    }
  }

  /**
   * Get the supporting vertex index in the given direction.
   */
  int getSupport(Vector direction) {
    int bestIndex = 0;
    num bestValue = Vector.dot(vertices[0], direction);
    for (int i = 1; i < count; i++) {
      num value = Vector.dot(vertices[i], direction);
      if(value > bestValue) {
        bestIndex = i;
        bestValue = value;
      }
    }

    return bestIndex;
  }

  /**
   * Get the supporting vertex in the given direction.
   */
  Vector getSupportVertex(Vector direction) {
    return vertices[getSupport(direction)];
  }
}
