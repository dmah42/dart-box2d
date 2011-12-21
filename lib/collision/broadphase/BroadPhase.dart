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
class BroadPhase implements TreeCallback {
  static final int NULL_PROXY = -1;
  static final int PAIR_CAPACITY = 16;
  static final int MOVE_CAPACITY = 16;

  final DynamicTree _tree;

  int proxyCount;

  List<DynamicTreeNode> moveBuffer;

  int _moveCapacity;

  int _moveCount;

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
    _moveCapacity = MOVE_CAPACITY,
    _moveCount = 0,
    _tree = new DynamicTree(),
    queryProxy = null {

    moveBuffer = new List<DynamicTreeNode>(_moveCapacity);
    // Put a bunch of pairs into the pair buffer.
    //TODO(gregbglw): Do a benchmark to see how preallocating the pairs
    // performs against allocating them as we go.
    _pairBuffer = new List<Pair>(_pairCapacity);
    for (int i = 0; i < _pairCapacity; i++) {
      _pairBuffer[i] = new Pair();
    }
  }

  /**
   * Creates a proxy with an initial bounding box. Pairs are not reported until
   * updatePairs is called.
   */
  DynamicTreeNode createProxy(AxisAlignedBox box, userData) {
    DynamicTreeNode node = _tree.createProxy(box, userData);
    proxyCount++;
    _bufferMove(node);
    return node;
  }

  /**
   * Destroys a proxy. It is up to the client to remove any pairs.
   */
  void destroyProxy(DynamicTreeNode proxy) {
    _unbufferMove(proxy);
    proxyCount--;
    _tree.destroyProxy(proxy);
  }

  /**
   * Call MoveProxy as many times as you like, then when you are done
   * call UpdatePairs to constize the proxy pairs (for your time step).
   */
  void moveProxy(DynamicTreeNode proxy, AxisAlignedBox box,
      Vector displacement) {
    bool buffer = _tree.moveProxy(proxy, box, displacement);
    if (buffer) {
      _bufferMove(proxy);
    }
  }

  /**
   * Returns true if the bounding boxes of the given proxies overlap.
   */
  bool testOverlap(DynamicTreeNode proxyA, DynamicTreeNode proxyB) {
    AxisAlignedBox a = proxyA.box;
    AxisAlignedBox b = proxyB.box;
    if (b.lowerBound.x - a.upperBound.x > 0.0 || b.lowerBound.y -
        a.upperBound.y > 0.0) {
      return false;
    }

    if (a.lowerBound.x - b.upperBound.x > 0.0 || a.lowerBound.y -
        b.upperBound.y > 0.0) {
      return false;
    }

    return true;
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
    for (int i = 0; i < _moveCount; ++i) {
      queryProxy = moveBuffer[i];
      if (queryProxy == null) {
        continue;
      }

      // We have to query the tree with the fat AABB so that
      // we don't fail to create a pair that may touch later.

      // Query tree, create pairs and add them pair buffer.
      _tree.query(this, queryProxy.box);
    }

    // Reset move buffer
    _moveCount = 0;

    // We only want to sort the first _pairCount items of _pairBuffer,
    // so copy these to a temporary buffer where we do the sorting, then
    // copy back.
    // TODO(mattsh) http://b/issue?id=5318770, possibly we should
    // add a method to array to allow sorting just a range of the array.
// TODO(jgw): Make sure this is right.
//    List<Pair> pairBuffer = new List.fromList(_pairBuffer, 0, _pairCount);
    List<Pair> pairBuffer = new List.from(_pairBuffer.getRange(0, _pairCount));
    pairBuffer.sort(int (Comparable a, Comparable b) => a.compareTo(b));
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
      callback.addPair(userDataA, userDataB);
      i++;

      // Skip any duplicate pairs.
      while (i < _pairCount) {
        Pair pair = _pairBuffer[i];
        if (pair.proxyA !== primaryPair.proxyA || pair.proxyB !==
            primaryPair.proxyB) {
          break;
        }
        i++;
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
    if (proxy == queryProxy) {
      return true;
    }

    // Grow the pair buffer as needed.
    if (_pairCount == _pairCapacity) {
      List<Pair> oldBuffer = _pairBuffer;
      _pairCapacity *= 2;
      _pairBuffer = new List<Pair>(_pairCapacity);

      // Copy over the pairs and fill in any remaining spots in the array.
      for (int i = 0; i < oldBuffer.length; i++) {
        _pairBuffer[i] = oldBuffer[i];
      }

      for (int i = oldBuffer.length; i < _pairCapacity; i++) {
        _pairBuffer[i] = new Pair();
      }
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
    _pairCount++;
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
  int computeHeight() {
    return _tree.computeHeightFromRoot();
  }

  //TODO(gregbglw): Figure out purpose and write comment.
  void _bufferMove(DynamicTreeNode node) {
    if (_moveCount == _moveCapacity) {
      List<DynamicTreeNode> old = moveBuffer;
      _moveCapacity *= 2;
      moveBuffer = new List<DynamicTreeNode>(_moveCapacity);
      for (int i = 0; i < old.length; i++) {
        moveBuffer[i] = old[i];
      }
    }

    moveBuffer[_moveCount] = node;
    ++_moveCount;
  }

  //TODO(gregbglw): comment.
  void _unbufferMove(DynamicTreeNode proxy) {
    for (int i = 0; i < _moveCount; i++) {
      if (moveBuffer[i] === proxy) {
        moveBuffer[i] = null;
        return;
      }
    }
  }
}
