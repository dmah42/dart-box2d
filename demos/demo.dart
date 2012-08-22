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
 * An abstract class for any Demo of the Box2D library.
 */
class Demo {
  /** All of the bodies in a simulation. */
  List<Body> bodies;

  /** The default canvas width and height. */
  static final int CANVAS_WIDTH = 900;
  static final int CANVAS_HEIGHT = 600;

  /** Scale of the viewport. */
  static final num _VIEWPORT_SCALE = 10;

  /** The gravity vector's y value. */
  static final num GRAVITY = -10;

  /** The timestep and iteration numbers. */
  static final num TIME_STEP = 1/60;
  static final int VELOCITY_ITERATIONS = 10;
  static final int POSITION_ITERATIONS = 10;

  /** The drawing canvas. */
  CanvasElement canvas;

  /** The canvas rendering context. */
  CanvasRenderingContext2D ctx;

  /** The transform abstraction layer between the world and drawing canvas. */
  IViewportTransform viewport;

  /** The debug drawing tool. */
  DebugDraw debugDraw;

  /** The physics world. */
  World world;

  /** Frame count for fps */
  int frameCount;

  /** HTML element used to display the FPS counter */
  Element fpsCounter;

  /** Microseconds for world step update */
  int elapsedUs;

  /** HTML element used to display the world step time */
  Element worldStepTime;

  // TODO(dominich): Make this library-private once optional positional
  // parameters are introduced.
  num viewportScale;

  // For timing the world.step call. It is kept running but reset and polled
  // every frame to minimize overhead.
  Stopwatch _stopwatch;

  Demo(String name, [Vector gravity, this.viewportScale = _VIEWPORT_SCALE])
      : bodies = new List<Body>(),
        _stopwatch = new Stopwatch.start() {
    query("#title").innerHTML = name;
    bool doSleep = true;
    if (null === gravity) gravity = new Vector(0, GRAVITY);
    world = new World(gravity, doSleep, new DefaultWorldPool());
  }

  /** Advances the world forward by timestep seconds. */
  void step(num timestamp) {
    _stopwatch.reset();
    world.step(TIME_STEP, VELOCITY_ITERATIONS, POSITION_ITERATIONS);
    elapsedUs = _stopwatch.elapsedInUs();

    // Clear the animation panel and draw new frame.
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    world.drawDebugData();
    ++frameCount;

    window.requestAnimationFrame((num time) { step(time); });
  }

  /**
   * Creates the canvas and readies the demo for animation. Must be called
   * before calling runAnimation.
   */
  void initializeAnimation() {
    // Setup the canvas.
    canvas = new Element.tag('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    document.body.nodes.add(canvas);
    ctx = canvas.getContext("2d");

    // Create the viewport transform with the center at extents.
    final extents = new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    viewport = new CanvasViewportTransform(extents, extents);
    viewport.scale = viewportScale;

    // Create our canvas drawing tool to give to the world.
    debugDraw = new CanvasDraw(viewport, ctx);

    // Have the world draw itself for debugging purposes.
    world.debugDraw = debugDraw;

    frameCount = 0;
    fpsCounter = query("#fps-counter");
    worldStepTime = query("#world-step-time");
    window.setInterval(() {
      fpsCounter.innerHTML = frameCount.toString();
      frameCount = 0;
    }, 1000);
    window.setInterval(() {
      worldStepTime.innerHTML = "${elapsedUs / 1000} ms";
    }, 200);
  }

  abstract void initialize();

  /**
   * Starts running the demo as an animation using an animation scheduler.
   */
  void runAnimation() {
    window.requestAnimationFrame((num time) { step(time); });
  }
}

