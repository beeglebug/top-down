var tree = [
    'Simple root node',
    {
        'text' : 'Root node 2',
        'children' : [
            { 'text' : 'Child 1' },
            'Child 2'
        ]
    }
];

$('.scene-graph').jstree({
    core : {
        data : tree,
        check_callback : true
    },
    plugins : ['wholerow', 'dnd'],
    types : {
        default : {
            icon : 'glyphicon glyphicon-picture'
        }
    }
});

var grid = $('.panel-browser .image-grid');

data.images.forEach(function(image) {

    var item = $('<img>');
    item.attr('src', '../img/' + image);
    item.attr('draggable', false);

    grid.append(item);
});

grid.on('mousedown', 'img', function(e) {

    var x = e.originalEvent.clientX;
    var y = e.originalEvent.clientY;

    var img = e.target.src;
    var sprite = new PIXI.Sprite.fromImage(img);

    sprite.position.set(x,y);

    sprite.interactive= true;
    sprite.mousedown = function(e){
        dragging = sprite;
        var pos = e.getLocalPosition(sprite);
        dragOffset.set(
            pos.x * scale,
            pos.y * scale
        );
    };

    canvas.addChild(sprite);

    dragging = sprite;

});



var stage = new PIXI.Stage(0xFFFFFF);
var width = window.innerWidth;
var height = window.innerHeight;
var renderer = PIXI.autoDetectRenderer(width, height);
var canvas = new PIXI.DisplayObjectContainer();
stage.addChild(canvas);
$('.stage').append(renderer.view);

var dragging = null;
var dragOffset = new PIXI.Point();;
var scale = 3;

canvas.scale.set(scale);

$(document).on('mousemove', function(e) {

    var x = e.originalEvent.clientX;
    var y = e.originalEvent.clientY;

    if(dragging) {
        dragging.position.set(
            (x - dragOffset.x) / scale,
            (y - dragOffset.y) / scale
        );
    }

});

$(document).on('mouseup', function(e) {

    if(dragging){
        dragging = null;
        dragOffset.set(0,0);
    }

});


function render()
{
    requestAnimationFrame(render);
    renderer.render(stage);
}

render();
