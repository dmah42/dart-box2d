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
 * A fixture definition is used to create a fixture. You can reuse fixture
 * definitions.
 */
class FixtureDef {
  /**
   * The shape to use in the fixture. This must be set.
   */
  Shape shape;

  /**
   * Use this to store application specific fixture data.
   */
  Object userData;

  /**
   * The friction coefficient, usually in the range [0,1].
   */
  num friction;

  /**
   * The restitution (elasticity) usually in the range [0,1].
   */
  num restitution;

  /**
   * The density, usually in kg/m^2
   */
  num density;

  /**
   * A sensor shape collects contact information but never generates a collision
   * response.
   */
  bool isSensor;

  /**
   * Contact filtering data;
   */
  Filter filter;

  /**
   * Constructs a new FixtureDef with default values.
   */
  FixtureDef() :
    shape = null,
    userData = null,
    friction = 0.2,
    restitution = 0,
    density = 0,
    filter = new Filter(),
    isSensor = false {
    // Setup the filter.
    filter.categoryBits = 0x0001;
    filter.maskBits = 0xFFFF;
    filter.groupIndex = 0;
  }
}
