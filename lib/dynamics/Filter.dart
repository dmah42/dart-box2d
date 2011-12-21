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
 * Contains contact filtering data.
 */
class Filter {
  /**
   * Collision category bits.
   */
  int categoryBits;

  /**
   * Collision mask bits. These are the categories that this shape would accept
   * for collision.
   */
  int maskBits;

  /**
   * Collision groups allow a certain group of objects to never collide
   * (negative) or always collide (positive). A groupIndex value of 0 means no
   * collision group.
   */
  int groupIndex;

  /**
   * Constructs a new filter with everything set to 0.
   */
  Filter() : categoryBits = 0, maskBits = 0, groupIndex = 0 { }

  /**
   * Constructs a new Filter that is a copy of the other filter.
   */
  Filter.copy(Filter other) :
    categoryBits = other.categoryBits,
    maskBits = other.maskBits,
    groupIndex = other.groupIndex { }

  /**
   * Sets this filter equal to the given filter.
   */
  void setFrom(Filter other) {
    categoryBits = other.categoryBits;
    maskBits = other.maskBits;
    groupIndex = other.groupIndex;
  }
}
