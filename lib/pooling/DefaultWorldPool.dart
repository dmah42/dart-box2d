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
 * Provides object pooling for some objects used in the engine.
 * Objects retrieved from here should only be used temporarily.
 */
class DefaultWorldPool {
  Collision collision;
  TimeOfImpact timeOfImpact;
  Distance distance;

/* TODO(jgw): Can't use 'this' in initializers?
  DefaultWorldPool() :
    distance = new Distance._construct(),
    collision = new Collision._construct(this),
    timeOfImpact = new TimeOfImpact._construct(this) { }
*/

  DefaultWorldPool() {
    distance = new Distance._construct();
    collision = new Collision._construct(this);
    timeOfImpact = new TimeOfImpact._construct(this);
  }

  Queue<CircleContact> getCircleContactStack() {
    final queue = new Queue<CircleContact>();
    for (int i = 0; i < Settings.CONTACT_STACK_INIT_SIZE; i++) {
      queue.addFirst(new CircleContact(this));
    }
    return queue;
  }

  Queue<PolygonAndCircleContact> getPolyCircleContactStack() {
    final queue = new Queue<PolygonAndCircleContact>();
    for (int i = 0; i < Settings.CONTACT_STACK_INIT_SIZE; i++) {
      queue.addFirst(new PolygonAndCircleContact(this));
    }
    return queue;
  }

  Queue<PolygonContact> getPolyContactStack() {
    final queue = new Queue<PolygonContact>();
    for (int i = 0; i < Settings.CONTACT_STACK_INIT_SIZE; i++) {
      queue.addFirst(new PolygonContact(this));
    }
    return queue;
  }
}
