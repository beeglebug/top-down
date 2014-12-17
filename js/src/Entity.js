var Entity = function(options)
{
    // @todo allow already loaded sprites and textures
    this.sprite = PIXI.Sprite.fromImage( options.sprite.image );
        
    this.sprite.anchor.set(options.sprite.anchor[0], options.sprite.anchor[1] );
    this.sprite.scale.set(options.sprite.scale[0], options.sprite.scale[1] );
    
    this.body = new p2.Body(options.body);
 
    // @todo determine shape size from sprite (callback when loaded)
    
    var shape;

    if(options.shape.type == p2.Shape.RECTANGLE) {
        
        shape = new p2.Rectangle(options.shape.width, options.shape.height);

        this.body.addShape( shape );
        
    } else if(options.shape.type == p2.Shape.CIRCLE) {
        
        shape = new p2.Circle(options.shape.radius);

        this.body.addShape( shape );
    }

    shape.collisionGroup = options.shape.collisionGroup;
    shape.collisionMask = options.shape.collisionMask;

};


/**
 * copy the positions from the physics body to the sprite
 * and align the shadow
 */
Entity.prototype.update = function()
{
    this.sprite.position.x = this.body.position[0];
    this.sprite.position.y = this.body.position[1];
    this.sprite.rotation = this.body.angle;

    if(this.shadow) {
        this.shadow.position.set(this.body.position[0] + SHADOW_OFFSET.x, this.body.position[1] + SHADOW_OFFSET.y);
        this.shadow.rotation = this.sprite.rotation;
    }
    
    if(this.debug) {
        this.debug.position.set(this.body.position[0], this.body.position[1]);
        this.debug.rotation = this.sprite.rotation;
    }
};


/**
 * shortcut to set entity position
 */
Object.defineProperty(Entity.prototype, 'position', {
    
    get: function() {
        return {
            x : this.body.position[0],
            y : this.body.position[1]
        };
    },
    
    set: function(value) {
        this.body.position = value;
    }
    
});

Object.defineProperty(Entity.prototype, 'shape', {

    get: function() {
        return this.body.shapes[0];
    }

});
