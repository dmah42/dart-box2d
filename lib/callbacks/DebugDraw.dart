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
 * Implement this abstract class to allow JBox2d to
 * automatically draw your physics for debugging purposes.
 * Not intended to replace your own custom rendering
 * routines! Draws shapes by default.
 */
class DebugDraw {
  // TODO(gregbglw): Draw joints once have them implemented. Also draw other
  // neat stuff described below.
  static final int e_shapeBit = 0x0001; ///< draw shapes
  static final int e_jointBit = 0x0002; ///< draw joint connections
  static final int e_aabbBit = 0x0004; ///< draw core (TimeOfImpact) shapes
  static final int e_pairBit = 0x0008; ///< draw axis aligned boxes
  static final int e_centerOfMassBit =  0x0010; ///< draw center of mass 
  static final int e_dynamicTreeBit = 0x0020; ///< draw dynamic tree.

  int drawFlags;
  IViewportTransform viewportTransform;

  DebugDraw(IViewportTransform viewport) :
    drawFlags = e_shapeBit,
    viewportTransform = viewport { }

  void setFlags(int flags) {
    drawFlags = flags;
  }

  int getFlags() {
    return drawFlags;
  }

  void appendFlags(int flags) {
    drawFlags |= flags;
  }

  void clearFlags(int flags) {
    drawFlags &= ~flags;
  }

  /**
   * Draw a closed polygon provided in CCW order.  This implementation
   * uses [drawSegment] to draw each side of the polygon.
   */
  void drawPolygon(List<Vector> vertices, int vertexCount, Color3 color){
    if(vertexCount == 1){
      drawSegment(vertices[0], vertices[0], color);
      return;
    }

    for(int i=0; i<vertexCount-1; i+=1){
      drawSegment(vertices[i], vertices[i+1], color);
    }

    if(vertexCount > 2){
      drawSegment(vertices[vertexCount-1], vertices[0], color);
    }
  }

  /**
   * Draws the given point with the given radius and color.
   */
  // TODO: abstract http://b/issue?id=5015671
  void drawPoint(Vector argPoint, num argRadiusOnScreen, Color3 argColor) { }

  /**
   * Draw a solid closed polygon provided in CCW order.
   */
  // TODO: abstract http://b/issue?id=5015671
  void drawSolidPolygon(List<Vector> vertices, int vertexCount,
      Color3 color) { }

  /**
   * Draw a circle.
   */
  // TODO: abstract http://b/issue?id=5015671
  void drawCircle(Vector center, num radius, Color3 color) { }

  /**
   * Draw a solid circle.
   */
  // TODO: abstract http://b/issue?id=5015671
  void drawSolidCircle(Vector center, num radius, Vector axis,
      Color3 color) { }

  /**
   * Draw a line segment.
   */
  // TODO: abstract http://b/issue?id=5015671
  void drawSegment(Vector p1, Vector p2, Color3 color) { }

  /**
   * Draw a transform.  Choose your own length scale
   */
  // TODO: abstract http://b/issue?id=5015671
  void drawTransform(Transform xf) { }

  /**
   * Draw a string.
   */
  // TODO: abstract http://b/issue?id=5015671
  void drawString(num x, num y, String s, Color3 color) { }

  /**
   * Returns the viewport transform.
   */
  IViewportTransform getViewportTranform(){
    return viewportTransform;
  }

  /**
   * Sets the center of the viewport to the given x and y values and the
   * viewport scale to the given scale.
   */
  void setCamera(num x, num y, num scale){
    viewportTransform.setCamera(x,y,scale);
  }

  /**
   * Screen coordinates are specified in argScreen. These coordinates are
   * converted to World coordinates and placed in the argWorld return vector.
   */
  void getScreenToWorldToOut(Vector argScreen, Vector argWorld) {
    viewportTransform.getScreenToWorld(argScreen, argWorld);
  }

  /**
   * World coordinates are specified in argWorld. These coordinates are
   * converted to screen coordinates and placed in the argScreen return vector.
   */
  void getWorldToScreenToOut(Vector argWorld, Vector argScreen) {
    viewportTransform.getWorldToScreen(argWorld, argScreen);
  }
}
