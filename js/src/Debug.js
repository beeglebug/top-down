var Debug = {

    enabled : false,

    addDebugShape : function(entity)
    {
        if(!DEBUG_ENABLED) { return false; }

        var shape = entity.body.shapes[0];

        var debug = new PIXI.Graphics();

        debug.lineStyle (1, 0xFF0000);

        if(shape.type == p2.Shape.CIRCLE) {

            debug.drawCircle(0, 0, shape.radius);

        } else if(shape.type == p2.Shape.RECTANGLE) {

            debug.drawRect(0, 0, shape.width, shape.height);

            debug.pivot.set(shape.width/2, shape.height/2);

        }

        entity.debug = debug;
    },

    enable : function()
    {
        if(!DEBUG_ENABLED) { return false; }

        this.enabled = true;
        layers.debug.visible = true;
    },

    disable : function()
    {
        if(!DEBUG_ENABLED) { return false; }

        this.enabled = false;
        layers.debug.visible = false;
    }

};
