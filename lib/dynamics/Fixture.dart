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
 * A fixture is used to attach a shape to a body for collision detection.
 * You cannot reuse fixtures.
 */
class Fixture {
  final AxisAlignedBox box;

  num density;

  Fixture next;

  Body body;

  Shape shape;

  num friction;

  num restitution;

  DynamicTreeNode proxy;

  final Filter filter;

  bool isSensor;

  Object userData;

  final AxisAlignedBox _poolOne;
  final AxisAlignedBox _poolTwo;

  /**
   * Constructs a new Fixture with default values.
   */
  Fixture() :
    box = new AxisAlignedBox(),
    body = null,
    next = null,
    proxy = null,
    shape = null,
    filter = new Filter(),
    _poolOne = new AxisAlignedBox(),
    _poolTwo = new AxisAlignedBox() { }

  /**
   * Sets this fixture according to the given body and definition.
   */
  void create(Body body, FixtureDef def) {
    userData = def.userData;
    friction = def.friction;
    restitution = def.restitution;

    body = body;
    next = null;

    filter.setFrom(def.filter);

    isSensor = def.isSensor;

    shape = def.shape.clone();

    density = def.density;
  }

  /**
   * Destroys this fixture. Before being called, this shape's proxy must be
   * destroyed. After being called, this fixture's shape is null.
   */
  void destroy() {
    // The proxy must be destroyed before calling this.
    assert(proxy == null);

    // Free the child shape.
    shape = null;
  }

  /** These support body activation/deactivation. */
  void createProxy(BroadPhase broadPhase, Transform xf){
    assert(proxy == null);

    // Create proxy in the broad-phase.
    shape.computeAxisAlignedBox(box, xf);
    proxy = broadPhase.createProxy(box, this);
  }

  /**
   * Destroys this Fixture's proxy.
   */
  void destroyProxy(BroadPhase broadPhase) {
    // If proxy is already destroyed, do nothing.
    if (proxy == null) {
      return;
    }

    // Destroy the proxy.
    broadPhase.destroyProxy(proxy);
    proxy = null;
  }

  //TODO(gregbglw): Write comment once know what does.
  void synchronize(BroadPhase broadPhase, Transform transformOne,
      Transform transformTwo) {
    if (proxy == null) {
      return;
    }

    // Compute an Axis Aligned Box that covers the swept shape.
    shape.computeAxisAlignedBox(_poolOne, transformOne);
    shape.computeAxisAlignedBox(_poolTwo, transformTwo);
    box.lowerBound.x = _poolOne.lowerBound.x < _poolTwo.lowerBound.x ? 
        _poolOne.lowerBound.x : _poolTwo.lowerBound.x;
    box.lowerBound.y = _poolOne.lowerBound.y < _poolTwo.lowerBound.y ?
        _poolOne.lowerBound.y : _poolTwo.lowerBound.y;
    box.upperBound.x = _poolOne.upperBound.x > _poolTwo.upperBound.x ?
        _poolOne.upperBound.x : _poolTwo.upperBound.x;
    box.upperBound.y = _poolOne.upperBound.y > _poolTwo.upperBound.y ?
        _poolOne.upperBound.y : _poolTwo.upperBound.y;

    Vector disp = _poolOne.lowerBound;
    disp.x = transformTwo.position.x - transformOne.position.x;
    disp.y = transformTwo.position.y - transformOne.position.y;

    broadPhase.moveProxy(proxy, box, disp);
  }

  /**
   * Get the mass data for this fixture. The mass data is based on the density
   * and the shape. The rotational inertia is about the shape's origin.
   */
  void getMassData(MassData massData) {
    shape.computeMass(massData, density);
  }

  /**
   * Get the type of the child shape.
   */
  int get type() {
    return shape.type;
  }
}
