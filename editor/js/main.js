/**
 * set stuff up
 */
PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
var stage = new PIXI.Stage(0xFFFFFF);

// fullscreen
var width = window.innerWidth;
var height = window.innerHeight;
var renderer = PIXI.autoDetectRenderer(width, height);

var canvas = new PIXI.DisplayObjectContainer();
stage.addChild(canvas);

$('.stage').append(renderer.view);

// global stuff to track objects
var selected = null;
var dragging = null;
var dragOffset = new PIXI.Point();;
var scale = 3;
var spriteID = 0;

canvas.scale.set(scale);

// cache a load of elements
var elements = {
    grid : $('.panel-browser .image-grid'),
    graph : $('.scene-graph'),
    position : {
        x : $('[data-property="position-x"]'),
        y : $('[data-property="position-y"]')
    },
    rotation : $('[data-property="rotation"]'),
    scale : {
        x : $('[data-property="scale-x"]'),
        y : $('[data-property="scale-y"]')
    }
};

var $tree = elements.graph.jstree({
    core : {
        data : [],
        check_callback : true
    },
    plugins : ['wholerow', 'dnd']
});

var tree = $tree.jstree(true);

$tree.on('activate_node.jstree', function(ev, data) {

    select(data.node.data.sprite);

});

/**
 * build the image grid
 */
data.images.forEach(function(image) {

    var item = $('<img>');
    item.attr('src', '../img/' + image);
    item.attr('draggable', false);

    elements.grid.append(item);
});

/**
 * handle clicks on images in the grid
 */
elements.grid.on('mousedown', 'img', function(e) {

    var x = e.originalEvent.clientX / scale;
    var y = e.originalEvent.clientY / scale;

    dragOffset.set(0,0);

    var img = e.target.src;

    createSprite(img, x, y);
});

function createSprite(img, x, y) {

    var sprite = new PIXI.Sprite.fromImage(img);

    sprite.position.set(x,y);
    sprite.anchor.set(0.5, 0.5);
    sprite.interactive = true;

    spriteID++;

    sprite.id = spriteID;

    var node = tree.create_node(null, { text : 'sprite ' + spriteID, data : { sprite : sprite } });

    sprite.treeNode = node;

    canvas.addChild(sprite);

    dragging = sprite;
    select(sprite);

}



/**
 * select a sprite
 */
function select(sprite)
{
    selected = sprite;
    updateProperties(sprite);
    tree.deselect_all();
    tree.select_node(sprite.treeNode);
}

/**
 * move sprites around with arrow keys
 */
$(document).on('keydown', function(e) {

    var code = e.keyCode;

    if(selected) {
        var update = false;
        switch(code){
            case Input.KEY_ARROW_UP:
                selected.position.y -= 1;
                update = true;
                break;
            case Input.KEY_ARROW_DOWN:
                selected.position.y += 1;
                update = true;
                break;
            case Input.KEY_ARROW_LEFT:
                selected.position.x -= 1;
                update = true;
                break;
            case Input.KEY_ARROW_RIGHT:
                selected.position.x += 1;
                update = true;
                break;
        }

        if(update) {
            updateProperties(selected);
        }
    }
});

/**
 * drag start
 */
$(document).on('mousedown', function(e) {

    if(!dragging) {

        var sprite = selected;

        dragging = sprite;

        var x = e.originalEvent.clientX / scale;
        var y = e.originalEvent.clientY / scale;

        //sprite.position.set(x,y);

        dragOffset.set(
            x - sprite.position.x,
            y - sprite.position.y
        );
    }

});

/**
 * drag
 */
$(document).on('mousemove', function(e) {

    if(dragging) {

        var x = e.originalEvent.clientX / scale;
        var y = e.originalEvent.clientY / scale;

        dragging.position.set(
            x - dragOffset.x,
            y - dragOffset.y
        );

        updateProperties(dragging);
    }

});

/**
 * drag end
 */
$(document).on('mouseup', function(e) {

    if(dragging){
        dragging = null;
        dragOffset.set(0,0);
    }

});

/**
 * update selected sprite when properties change
 */
$('.panel-properties input').on('change', function(e){

    if(!selected) { return; }

    var property = $(this).data('property');
    var value = $(this).val();

    switch(property) {
        case 'position-x':
            selected.position.x = value;
            break;
        case 'position-y':
            selected.position.y = value;
            break;
        case 'rotation':
            selected.rotation = value;
            break;
        case 'scale-x':
            selected.scale.x = value;
            break;
        case 'scale-y':
            selected.scale.y = value;
            break;
    }

});

/**
 * stop keyboard events in the input fields triggering the main handler
 */
$('.panels').on('keydown mousedown', function(e) {
    e.stopPropagation();
});

/**
 * update a sprite from the properties window
 */
function updateProperties(sprite)
{
    elements.position.x.val( sprite.position.x );
    elements.position.y.val( sprite.position.y );
    elements.rotation.val( sprite.rotation );
    elements.scale.x.val( sprite.scale.x );
    elements.scale.y.val( sprite.scale.y );
}

/**
 * render the main canvas
 */
function render()
{
    requestAnimationFrame(render);
    renderer.render(stage);
}

render();
