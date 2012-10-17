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
 * Implement this abstract class to allow DartBox2d to
 * automatically draw your physics for debugging purposes.
 * Not intended to replace your own custom rendering
 * routines! Draws shapes by default.
 */
abstract class DebugDraw {
  // TODO(gregbglw): Draw joints once have them implemented. Also draw other
  // neat stuff described below.

  /// draw shapes
  static const int e_shapeBit = 0x0001;
  /// draw joint connections
  static const int e_jointBit = 0x0002;
  /// draw core (TimeOfImpact) shapes
  static const int e_aabbBit = 0x0004;
  /// draw axis aligned boxes
  static const int e_pairBit = 0x0008;
  /// draw center of mass 
  static const int e_centerOfMassBit = 0x0010;
  /// draw dynamic tree.
  static const int e_dynamicTreeBit = 0x0020;
  /// draw with lines (vs. default filled polygons).
  static const int e_lineDrawingBit = 0x0040;

  int flags;
  IViewportTransform viewportTransform;

  DebugDraw(IViewportTransform viewport)
      : flags = e_shapeBit,
        viewportTransform = viewport;

  void appendFlags(int value) { flags |= value; }
  void clearFlags(int value) { flags &= ~value; }

  /** Draw a closed polygon provided in CCW order. */
  abstract void drawPolygon(List<Vector> vertices, int vertexCount,
      Color3 color);

  /** Draws the given point with the given radius and color.  */
  abstract void drawPoint(Vector point, num radiusOnScreen, Color3 color);

  /** Draw a solid closed polygon provided in CCW order. */
  abstract void drawSolidPolygon(List<Vector> vertices, int vertexCount,
      Color3 color);

  /** Draw a circle. */
  abstract void drawCircle(Vector center, num radius, Color3 color,
      [Vector axis]);

  /** Draw a solid circle. */
  abstract void drawSolidCircle(Vector center, num radius, Color3 color,
      [Vector axis]);

  /** Draw a line segment. */
  abstract void drawSegment(Vector p1, Vector p2, Color3 color);

  /** Draw a transform.  Choose your own length scale. */
  abstract void drawTransform(Transform xf, Color3 color);

  /** Draw a string. */
  // TODO(dominich): font.
  abstract void drawString(num x, num y, String s, Color3 color);

  /**
   * Sets the center of the viewport to the given x and y values and the
   * viewport scale to the given scale.
   */
  void setCamera(num x, num y, num scale) {
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
