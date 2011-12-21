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

/** The features that intersect to form the contact point */
class Features {
  /** The edge that defines the outward contact normal. */
  int referenceEdge;

  /** The edge most anti-parallel to the reference edge. */
  int incidentEdge;

  /** The vertex (0 or 1) on the incident edge that was clipped. */
  int incidentVertex;

  /** A value of 1 indicates that the reference edge is on shape2. */
  int flip;

  /**
   * Constructs a new features with zero values for all fields.
   */
  Features() :
    referenceEdge = 0,
    incidentEdge = 0,
    incidentVertex = 0,
    flip = 0 { }

  // Constructs a new Features that is a copy of the given features.
  Features.copy(Features f) :
    referenceEdge = f.referenceEdge,
    incidentEdge = f.incidentEdge,
    incidentVertex = f.incidentVertex,
    flip = f.flip { }

  // Set this feature to be a copy of the given feature.
  setFrom(Features f) {
    referenceEdge = f.referenceEdge;
    incidentEdge = f.incidentEdge;
    incidentVertex = f.incidentVertex;
    flip = f.flip;
  }

  /**
   * Returns true if this Features object is equal to the given object.
   */
  bool operator == (other) {
    return referenceEdge == other.referenceEdge &&
        incidentEdge == other.incidentEdge &&
        incidentVertex == other.incidentVertex && flip == other.flip;
  }

  /**
   * Returns a String representation of this Features.
   */
  String toString() {
    String s = "Features: (" + flip + " ," + incidentEdge +
        " ," + incidentVertex + " ," + referenceEdge + ")";
    return s;
  }

  /**
   * Sets all features to 0.
   */
  zero() {
    referenceEdge = 0;
    incidentEdge = 0;
    incidentVertex = 0;
    flip = 0;
  }
}
