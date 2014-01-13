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
 * A fixture is used to attach a shape to a body for collision detection.
 * You cannot reuse fixtures.
 */

part of box2d;

class Fixture {
  final Aabb2 box = new Aabb2();

  double density;

  Fixture next;

  Body body;

  Shape shape;

  double friction;

  double restitution;

  DynamicTreeNode proxy;

  final Filter filter = new Filter();

  bool isSensor;

  dynamic userData;

  final Aabb2 _poolOne = new Aabb2();
  final Aabb2 _poolTwo = new Aabb2();

  /** Constructs a new Fixture with default values. */
  Fixture();

  /** Sets this fixture according to the given body and definition. */
  void create(Body b, FixtureDef def) {
    userData = def.userData;
    friction = def.friction;
    restitution = def.restitution;

    body = b;
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

  /** Destroys this Fixture's proxy. */
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
    box.min.x = _poolOne.min.x < _poolTwo.min.x ?
        _poolOne.min.x : _poolTwo.min.x;
    box.min.y = _poolOne.min.y < _poolTwo.min.y ?
        _poolOne.min.y : _poolTwo.min.y;
    box.max.x = _poolOne.max.x > _poolTwo.max.x ?
        _poolOne.max.x : _poolTwo.max.x;
    box.max.y = _poolOne.max.y > _poolTwo.max.y ?
        _poolOne.max.y : _poolTwo.max.y;

    Vector2 disp = _poolOne.min;
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

  bool testPoint(Vector2 p) {
    return shape.testPoint(body.originTransform, p);
  }

  /** Get the type of the child shape. */
  int get type => shape.type;
}
