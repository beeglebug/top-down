PIXI.dontSayHello = true;
PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

// global objects
var stage = new PIXI.Stage(0xFFFFFF);
var renderer = PIXI.autoDetectRenderer(640, 480);
var input = new Input();
var world = new p2.World();

// config
world.applyGravity = false;

var root = new PIXI.DisplayObjectContainer();

var layers = {
    shadows : new PIXI.DisplayObjectContainer(),
    other : new PIXI.DisplayObjectContainer(),
    debug : new PIXI.DisplayObjectContainer()
};

layers.shadows.alpha = 0.1;

root.addChild(layers.shadows);
root.addChild(layers.other);
root.addChild(layers.debug);

var camera = new Camera(root);
stage.addChild(camera.container);

var DEBUG = 0,
    BASE_SCALE = 2,
    SHADOW_OFFSET = new PIXI.Point(1 * BASE_SCALE, 1 * BASE_SCALE)
;
