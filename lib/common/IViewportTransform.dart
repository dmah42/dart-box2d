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
 * This is the viewport transform used from drawing.
 * Use yFlip if you are drawing from the top-left corner.
 */
interface IViewportTransform {
  /**
   * return if the transform flips the y axis.
   */
  bool get yFlip();

  /**
   * yFlip: if we flip the y axis when transforming.
   */
  void set yFlip(bool yFlip);

  /**
   * This is the half-width and half-height.
   * This should be the actual half-width and 
   * half-height, not anything transformed or scaled.
   * Not a copy.
   */
  Vector get extents();

  /**
   * Returns the scaling factor used in converting from world sizes to rendering
   * sizes.
   */
  num get scale();

  /**
   * This sets the half-width and half-height.
   * This should be the actual half-width and 
   * half-height, not anything transformed or scaled.
   */
  void set extents(Vector argExtents);

  /**
   * center of the viewport.  Not a copy.
   */
  Vector get center();

  /**
   * sets the center of the viewport.
   */
  void set center(Vector argPos);

  /**
   * Sets the transform's center to the given x and y coordinates,
   * and using the given scale.
   */
  void setCamera(num x, num y, num scale);

  /**
   * takes the world coordinate (argWorld) puts the corresponding
   * screen coordinate in argScreen.  It should be safe to give the
   * same object as both parameters.
   */
  void getWorldToScreen(Vector argWorld, Vector argScreen);


  /**
   * takes the screen coordinates (argScreen) and puts the
   * corresponding world coordinates in argWorld. It should be safe
   * to give the same object as both parameters.
   */
  void getScreenToWorld(Vector argScreen, Vector argWorld);
}
