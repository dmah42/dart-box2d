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
 * Contact ids to facilitate warm starting. Basically just containers for
 * an individual Features object that contains interesting information.
 */
class ContactID {
  /** The features that intersect to form the contact point */
  final Features features;

  /**
   * Constructs a new ContactID. */
  ContactID() : features = new Features() { }

  /**
   * Constructs a ContactID that is a copy of the given ContactID.
   */
  ContactID.copy(ContactID other) :
    features = new Features.copy(other.features) { }

  /**
   * Returns true if this ContactID equals the given ContactID.
   */
  bool operator == (other) {
    return other.features == features;
  }

  /**
   * Sets this contactID to be equal to the given ContactID.
   */
  void setFrom(ContactID other) {
    features.setFrom(other.features);
  }

  /**
   * Returns true if this ContactID equals the given ContactID.
   */
  bool isEqual(ContactID other) {
    return other.features == features;
  }

  /**
   * Zeroes out the data.
   */
  void zero() {
    features.zero();
  }
}
