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
import 'demo.dart';

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
      bd.position.setCoords(0.0, 0.0);
      assert(world != null);
      ground = world.createBody(bd);
      bodies.add(ground);
      ground.createFixtureFromShape(sd);

      sd.setAsBoxWithCenterAndAngle(0.4, 50.0, new Vector2(-10.0, 0.0), 0.0);
      ground.createFixtureFromShape(sd);
      sd.setAsBoxWithCenterAndAngle(0.4,50.0,new Vector2(10.0,0.0), 0.0);
      ground.createFixtureFromShape(sd);
    }

    ConstantVolumeJointDef cvjd = new ConstantVolumeJointDef();

    double cx = 0.0;
    double cy = 10.0;
    double rx = 5.0;
    double ry = 5.0;
    double nBodies = 20.0;
    double bodyRadius = 0.5;
    for (int i = 0; i < nBodies; ++i) {
      double angle = MathBox.translateAndScale(i.toDouble(), 0.0, nBodies, 0.0, Math.PI * 2);
      BodyDef bd = new BodyDef();
      bd.fixedRotation = true;

      double x = cx + rx * Math.sin(angle);
      double y = cy + ry * Math.cos(angle);
      bd.position.setFrom(new Vector2(x,y));
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
    psd.setAsBoxWithCenterAndAngle(3.0,1.5,new Vector2(cx,cy+15.0),0.0);
    bd2.position = new Vector2(cx,cy+15.0);
    Body fallingBox = world.createBody(bd2);
    bodies.add(fallingBox);
    fallingBox.createFixtureFromShape(psd, 1.0);
  }
}

void main() {
  BlobTest.main();
}
