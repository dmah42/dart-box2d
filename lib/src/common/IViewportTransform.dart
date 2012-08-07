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
 * This is the viewport transform used from drawing.
 * Use yFlip if you are drawing from the top-left corner.
 */

part of box2d;

class IViewportTransform {
  IViewportTransform(Vector e, Vector c, num s) :
    extents = new Vector.copy(e),
    center = new Vector.copy(c),
    scale = s;

  /**
   * if we flip the y axis when transforming.
   */
  bool yFlip;

  /**
   * This is the half-width and half-height.
   * This should be the actual half-width and 
   * half-height, not anything transformed or scaled.
   */
  vec2 extents;

  /**
   * Returns the scaling factor used in converting from world sizes to rendering
   * sizes.
   */
  num scale;
  
  /**
   * center of the viewport.
   */
  vec2 center;

  /**
   * Sets the transform's center to the given x and y coordinates,
   * and using the given scale.
   */
  void setCamera(num x, num y, num s) {
    center.x = x;
    center.y = y;
    scale = s;
  }

  /**
   * The current translation is the difference in canvas units between the
   * actual center of the canvas and the currently specified center. For
   * example, if the actual canvas center is (5, 5) but the current center is
   * (6, 6), the translation is (1, 1).
   */
  vec2 get translation => extents - center;

  void set translation(vec2 translation) {
    center.setFrom(extents);
    center.selfSub(translation);
  }

  /**
   * Takes the world coordinate (argWorld) puts the corresponding
   * screen coordinate in argScreen.  It should be safe to give the
   * same object as both parameters.
   */
  void getWorldToScreen(Vector argWorld, Vector argScreen) {
    // Correct for canvas considering the upper-left corner, rather than the
    // center, to be the origin.
    num gridCorrectedX = (argWorld.x * scale) + extents.x;
    num gridCorrectedY = extents.y - (argWorld.y * scale);

    argScreen.setCoords(gridCorrectedX + translation.x, gridCorrectedY +
        -translation.y);
  }

  /**
   * Takes the screen coordinates (argScreen) and puts the
   * corresponding world coordinates in argWorld. It should be safe
   * to give the same object as both parameters.
   */
  void getScreenToWorld(Vector argScreen, Vector argWorld) {
    num translationCorrectedX = argScreen.x - translation.x;
    num translationCorrectedY = argScreen.y + translation.y;

    num gridCorrectedX = (translationCorrectedX - extents.x) / scale;
    num gridCorrectedY = ((translationCorrectedY - extents.y) * -1) / scale;
    argWorld.setCoords(gridCorrectedX, gridCorrectedY);
  }
}
