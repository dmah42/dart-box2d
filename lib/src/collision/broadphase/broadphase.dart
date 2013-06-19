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
 * The broad-phase is used for computing pairs and performing volume queries
 * and ray casts.
 *
 * Uses the Sweep and Prune algorithm in: Collision Detection in Interactive
 * 3D environments by Geno Van Den Bergen. Also some ideas, such integral
 * values comes from Bullet (http://bulletphysics.com).
 *
 * This broad-phase does not persist pairs. Instead, this reports potentially
 * new pairs. It is up to the client to consume the new pairs and to track
 * subsequent overlap.
 */

part of box2d;

typedef void PairCallback(Fixture fixtureA, Fixture fixtureB);

class BroadPhase implements TreeCallback {
  static const int NULL_PROXY = -1;
  static const int PAIR_CAPACITY = 16;

  final DynamicTree _tree;

  int proxyCount;

  List<DynamicTreeNode> moveBuffer;

  List<Pair> _pairBuffer;

  int _pairCapacity;

  int _pairCount;

  DynamicTreeNode queryProxy;

  /**
   * Constructs a new BroadPhase.
   */
  BroadPhase() :
    proxyCount = 0,
    _pairCapacity = PAIR_CAPACITY,
    _pairCount = 0,
    _tree = new DynamicTree(),
    queryProxy = null {
    moveBuffer = new List<DynamicTreeNode>();
    // Put a bunch of pairs into the pair buffer.
    // TODO(dominich): Do a benchmark to see how preallocating the pairs
    // performs against allocating them as we go.
    _pairBuffer = new List<Pair>(_pairCapacity);
    for (int i = 0; i < _pairCapacity; ++i)
      _pairBuffer[i] = new Pair();
  }

  /**
   * Creates a proxy with an initial bounding box. Pairs are not reported until
   * updatePairs is called.
   */
  DynamicTreeNode createProxy(AxisAlignedBox box, userData) {
    DynamicTreeNode node = _tree.createProxy(box, userData);
    ++proxyCount;
    _bufferMove(node);
    return node;
  }

  /**
   * Destroys a proxy. It is up to the client to remove any pairs.
   */
  void destroyProxy(DynamicTreeNode proxy) {
    _unbufferMove(proxy);
    --proxyCount;
    _tree.destroyProxy(proxy);
  }

  /**
   * Call MoveProxy as many times as you like, then when you are done
   * call UpdatePairs to constize the proxy pairs (for your time step).
   */
  void moveProxy(DynamicTreeNode proxy, AxisAlignedBox box, Vector2 displacement) {
    if (_tree.moveProxy(proxy, box, displacement))
      _bufferMove(proxy);
  }

  /**
   * Returns true if the bounding boxes of the given proxies overlap.
   */
  bool testOverlap(DynamicTreeNode proxyA, DynamicTreeNode proxyB) {
    final AxisAlignedBox a = proxyA.box;
    final AxisAlignedBox b = proxyB.box;
    return AxisAlignedBox.testOverlap(a, b);
  }

  /**
   * Add pairs according to whether we need to keep track of
   * their relationship. Pairs are added by calling the addPair method on the
   * given callback.
   */
  void updatePairs(PairCallback callback) {
    // Reset pair buffer
    _pairCount = 0;

    // Perform tree queries for all moving proxies.
    for (int i = 0; i < moveBuffer.length; ++i) {
      queryProxy = moveBuffer[i];
      if (queryProxy == null)
        continue;

      // We have to query the tree with the fat AABB so that
      // we don't fail to create a pair that may touch later.

      // Query tree, create pairs and add them pair buffer.
      _tree.query(this, queryProxy.box);
    }

    // Reset move buffer
    moveBuffer = new List<DynamicTreeNode>();

    // We only want to sort the first _pairCount items of _pairBuffer,
    // so copy these to a temporary buffer where we do the sorting, then
    // copy back.
    List<Pair> pairBuffer = new List.from(_pairBuffer.getRange(0, _pairCount));
    pairBuffer.sort((a, b) => a.compareTo(b));
    _pairBuffer.setRange(0, _pairCount, pairBuffer);

    // Send the pairs back to the client.
    int i = 0;
    while (i < _pairCount) {
      Pair primaryPair = _pairBuffer[i];
      assert(primaryPair != null);
      assert(primaryPair.proxyA != null);
      assert(primaryPair.proxyB != null);

      var userDataA = primaryPair.proxyA.userData;
      var userDataB = primaryPair.proxyB.userData;

      // Call the callback and increment i.
      callback(userDataA, userDataB);
      ++i;

      // Skip any duplicate pairs.
      while (i < _pairCount) {
        Pair pair = _pairBuffer[i];
        if (pair.proxyA != primaryPair.proxyA ||
            pair.proxyB != primaryPair.proxyB) {
          break;
        }
        ++i;
      }
    }

    // Try to keep the tree balanced.
    _tree.rebalance(Settings.TREE_REBALANCE_STEPS);
  }

  /**
   * The callback function to use for this tree. Is called from
   * DynamicTree.query when we are gathering pairs.
   */
  bool treeCallback(DynamicTreeNode proxy) {
    // A proxy cannot form a pair with itself.
    if (proxy == queryProxy)
      return true;

    // Grow the pair buffer as needed.
    // TODO(dominich): Can this be left up to the underlying SDK?
    if (_pairCount == _pairCapacity) {
      List<Pair> oldBuffer = _pairBuffer;
      _pairCapacity *= 2;
      _pairBuffer = new List<Pair>(_pairCapacity);

      // Copy over the pairs and fill in any remaining spots in the array.
      for (int i = 0; i < oldBuffer.length; ++i)
        _pairBuffer[i] = oldBuffer[i];

      for (int i = oldBuffer.length; i < _pairCapacity; ++i)
        _pairBuffer[i] = new Pair();
    }

    // Store a new pair into the pair buffer, having proxyA be the lesser of
    // proxy and queryProxy.
    if (proxy.key < queryProxy.key) {
      _pairBuffer[_pairCount].proxyA = proxy;
      _pairBuffer[_pairCount].proxyB = queryProxy;
    } else {
      _pairBuffer[_pairCount].proxyA = queryProxy;
      _pairBuffer[_pairCount].proxyB = proxy;
    }

    // Increase the pair count and return true.
    ++_pairCount;
    return true;
  }

  /**
   * Query an axis aligned box for overlapping proxies. The callback funciton is
   * called for each proxy that overlaps the supplied box.
   */
  void query(TreeCallback callback, AxisAlignedBox box) {
    _tree.query(callback, box);
  }

  /**
   * Returns the height of embedded tree.
   */
  int computeHeight() => _tree.computeHeightFromRoot();

  void _bufferMove(DynamicTreeNode node) { moveBuffer.add(node); }

  void _unbufferMove(DynamicTreeNode proxy) {
    int index = moveBuffer.indexOf(proxy);
    if (index != -1)
      moveBuffer.removeRange(index, 1);
  }
}
