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
 * Transform for drawing using a canvas context. Y-flip is permenantly set
 * to true.
 */

part of box2d_browser;

class CanvasViewportTransform extends ViewportTransform {
  static const int DEFAULT_DRAWING_SCALE = 20;

  /**
   * Constructs a new viewport transform with the default scale.
   */
  CanvasViewportTransform(Vector _extents, Vector _center) :
    super(_extents, _center, DEFAULT_DRAWING_SCALE) {
    yFlip = true;
  }

  /**
   * Sets the rendering context such that all drawing commands given in terms
   * of the world coordinate system will display correctly on the canvas screen.
   */
  void updateTransformation(CanvasRenderingContext2D ctx) {
    // Clear all previous transformation.
    ctx.setTransform(1,0,0,1,0,0);

    // Translate to the center of the canvas screen. This will be considered the
    // actual origin.
    ctx.translate(extents.x, extents.y);

    // Translate to account for the currently applied translation.
    ctx.translate(translation.x, translation.y);

    // Scale everything according to the current scale and mirror the y-axis.
    ctx.scale(scale, -scale);
  }
}
