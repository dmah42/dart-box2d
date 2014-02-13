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

/** Similar to javax.vecmath.Color3 holder. */

part of box2d;

class Color3 {
  int x;
  int y;
  int z;

  Color3() : x = 0, y = 0, z = 0;
  Color3.fromRGB(int r, int g, int b) : x = r, y = g, z = b;
  Color3.fromRGBF(double r, double g, double b)
      : x = (r * 255).floor().toInt(),
        y = (g * 255).floor().toInt(),
        z = (b * 255).floor().toInt();
  Color3.fromColor3(Color3 color)
      : x = color.x, y = color.y, z = color.z;

  void setFromRGB(int r, int g, int b) {
    x = r; y = g; z = b;
  }

  void setFromRGBF(double r, double g, double b) {
    x = (r * 255).floor().toInt();
    y = (g * 255).floor().toInt();
    z = (b * 255).floor().toInt();
  }

  void setFromColor3(Color3 color) {
    x = color.x;
    y = color.y;
    z = color.z;
  }

  bool operator ==(final other) {
    return other is Color3 && x == other.x && y == other.y && z == other.z;
  }

  int get hashCode {
    int result = 17;
    result = 37 * result + x.hashCode;
    result = 37 * result + y.hashCode;
    result = 37 * result + z.hashCode;
    return result;
  }
}
