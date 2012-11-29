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

library BlobTest;
import 'dart:html';
import 'dart:math' as Math;
import 'package:box2d/box2d_browser.dart';
import 'package:dartvectormath/vector_math_browser.dart';
part 'demo.dart';

class BlobTest extends Demo {
  /** Constructs a new BlobTest. */
  BlobTest() : super("Blob test") { }

  /** Entrypoint. */
  static void main() {
    final blob = new BlobTest();
    blob.initialize();
    blob.initializeAnimation();
    blob.runAnimation();
  }

  void initialize() {
    Body ground;
    {
      PolygonShape sd = new PolygonShape();
      sd.setAsBox(50.0, 0.4);

      BodyDef bd = new BodyDef();
      bd.position.splat(0.0);
      assert(world != null);
      ground = world.createBody(bd);
      bodies.add(ground);
      ground.createFixtureFromShape(sd);

      sd.setAsBoxWithCenterAndAngle(0.4, 50.0, new vec2(-10.0, 0.0), 0.0);
      ground.createFixtureFromShape(sd);
      sd.setAsBoxWithCenterAndAngle(0.4,50.0,new vec2(10.0,0.0), 0.0);
      ground.createFixtureFromShape(sd);
    }

    ConstantVolumeJointDef cvjd = new ConstantVolumeJointDef();

    num cx = 0.0;
    num cy = 10.0;
    num rx = 5.0;
    num ry = 5.0;
    int nBodies = 20;
    num bodyRadius = 0.5;
    for (int i = 0; i < nBodies; ++i) {
      num angle = MathBox.translateAndScale(i, 0, nBodies, 0, math.PI * 2);
      BodyDef bd = new BodyDef();
      bd.fixedRotation = true;
      bd.position.setComponents(cx + rx * math.sin(angle),
                                cy + ry * math.cos(angle));
      bd.type = BodyType.DYNAMIC;
      Body body = world.createBody(bd);
      bodies.add(body);

      FixtureDef fd = new FixtureDef();
      CircleShape cd = new CircleShape();
      cd.radius = bodyRadius;
      fd.shape = cd;
      fd.density = 1.0;
      fd.filter.groupIndex = -2;
      body.createFixture(fd);
      cvjd.addBody(body);
    }

    cvjd.frequencyHz = 10.0;
    cvjd.dampingRatio = 1.0;
    world.createJoint(cvjd);

    BodyDef bd2 = new BodyDef();
    bd2.type = BodyType.DYNAMIC;
    PolygonShape psd = new PolygonShape();
    psd.setAsBoxWithCenterAndAngle(3.0,1.5,new vec2(cx,cy+15.0),0.0);
    bd2.position = new vec2(cx,cy+15.0);
    Body fallingBox = world.createBody(bd2);
    bodies.add(fallingBox);
    fallingBox.createFixtureFromShape(psd, 1.0);
  }
}

void main() {
  BlobTest.main();
}
