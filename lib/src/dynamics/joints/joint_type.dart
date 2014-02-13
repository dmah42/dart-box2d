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
 * An enum class of joint types. The currently implemented joint types are
 * distance, constant volume, and revolute.
 */

part of box2d;

class JointType {
  static const int UNKNOWN = 0;
  static const int REVOLUTE = 1;
  static const int PRISMATIC = 2;
  static const int DISTANCE = 3;
  static const int PULLEY = 4;
  static const int MOUSE = 5;
  static const int GEAR = 6;
  static const int LINE = 7;
  static const int WELD = 8;
  static const int FRICTION = 9;
  static const int CONSTANT_VOLUME = 10;
}
