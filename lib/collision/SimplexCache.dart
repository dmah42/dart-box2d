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
 *  Used to warm start [distance]. Set count to zero on first call.
 */
class SimplexCache {
  /** length or area */
  num metric;

  int count;

  /** vertices on shape A */
  final List<int> indexA;

  /** vertices on shape B */
  final List<int> indexB;

  /**
   * Constructs a new SimplexCache.
   */
  SimplexCache() :
    metric = 0,
    count = 0,
    indexA = new List<int>(3),
    indexB = new List<int>(3) {
    for (int i = 0; i < 3; i++) {
      indexA[i] = Settings.MAX_INTEGER;
      indexB[i] = Settings.MAX_INTEGER;
    }
  }

  /**
   * Sets this cache equal to the given cache.
   */
  void setFrom(SimplexCache sc) {
    indexA.setRange(0, indexA.length, sc.indexA);
    indexB.setRange(0, indexB.length, sc.indexB);
    metric = sc.metric;
    count = sc.count;
  }
}
