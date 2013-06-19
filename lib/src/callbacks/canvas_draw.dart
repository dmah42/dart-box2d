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
 * Draws using the given canvas context for debugging purposes.
 * WARNING: This implementation modifies its arguments (e.g. Vectors) to save
 * garbage.
 */
// TODO(gregbglw): Test all of these methods to make sure that they draw the
// correct things.

part of box2d_browser;

class CanvasDraw extends DebugDraw {
  /** The canvas rendering context with which to draw. */
  CanvasRenderingContext2D ctx;

  CanvasDraw(ViewportTransform viewport, this.ctx) : super(viewport) {
    assert (null != viewport && null != ctx);
  }

  /**
   * Draw a closed polygon provided in CCW order. WARNING: This mutates
   * [vertices].
   */
  void drawPolygon(List<Vector2> vertices, int vertexCount, Color3 color) {
    _pathPolygon(vertices, vertexCount, color);
    ctx.stroke();
  }

  /**
   * Draw a solid closed polygon provided in CCW order. WARNING: This mutates
   * [vertices].
   */
  void drawSolidPolygon(List<Vector2> vertices, int vertexCount, Color3 color) {
    _pathPolygon(vertices, vertexCount, color);
    ctx.fill();
  }

  void _pathPolygon(List<Vector2> vertices, int vertexCount, Color3 color) {
    // Set the color and convert to screen coordinates.
    _color = color;
    // TODO(gregbglw): Do a single ctx transform rather than convert all of
    // these vectors.
    for (int i = 0; i < vertexCount; ++i)
      getWorldToScreenToOut(vertices[i], vertices[i]);

    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);

    // Draw lines to all of the remaining points.
    for (int i = 1; i < vertexCount; ++i)
      ctx.lineTo(vertices[i].x, vertices[i].y);

    // Draw a line back to the starting point.
    ctx.lineTo(vertices[0].x, vertices[0].y);

    // Close the drawn polygon ready for fill/stroke
    ctx.closePath();
  }

  /** Draw a line segment. WARNING: This mutates [p1] and [p2]. */
  void drawSegment(Vector2 p1, Vector2 p2, Color3 color) {
    _color = color;
    getWorldToScreenToOut(p1, p1);
    getWorldToScreenToOut(p2, p2);

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.stroke();
  }

  /** Draw a circle. WARNING: This mutates [center]. */
  void drawCircle(Vector2 center, num radius, Color3 color, [Vector2 axis]) {
    radius *= viewportTransform.scale;
    _pathCircle(center, radius, color);
    ctx.stroke();
  }

  /** Draw a solid circle. WARNING: This mutates [center]. */
  void drawSolidCircle(Vector2 center, num radius, Color3 color, [Vector2 axis]) {
    radius *= viewportTransform.scale;
    drawPoint(center, radius, color);
  }

  /**
   * Draws the given point with the given *unscaled* radius, in the given [color].
   * WARNING: This mutates [point].
   */
  void drawPoint(Vector2 point, num radiusOnScreen, Color3 color) {
    _pathCircle(point, radiusOnScreen, color);
    ctx.fill();
  }

  void _pathCircle(Vector2 center, num radius, Color3 color) {
    _color = color;
    getWorldToScreenToOut(center, center);

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, MathBox.TWO_PI, true);
    ctx.closePath();
  }

  /**
   * Draw a transform. Choose your own length scale. WARNING: This mutates
   * [xf.position].
   */
  void drawTransform(Transform xf, Color3 color) {
    drawCircle(xf.position, 0.1, color);
    // TODO(rupertk): Draw rotation representation (drawCircle axis parameter?)
  }

  /** Draw a string. */
  void drawString(num x, num y, String s, Color3 color) {
    _color = color;
    ctx.strokeText(s, x, y);
  }

  /** Sets the rendering context stroke and fill color to [color]. */
  void set _color(Color3 color) {
    ctx.setStrokeColorRgb(color.x, color.y, color.z, 0.9);
    ctx.setFillColorRgb(color.x, color.y, color.z, 0.8);
  }
}
