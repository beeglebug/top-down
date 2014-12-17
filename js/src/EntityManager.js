var EntityManager = {

    entities : [],

    templates : {},
    
    /**
     * defaults for entity creation
     */
    defaultOptions : {
    
        sprite : {
            image : 'img/missing.png',
            anchor : [0.5, 0.5],
            scale : [BASE_SCALE, BASE_SCALE]
        },

        shadow : true,

        body : {
            mass : 1,
            damping : 0.999,
            angularDamping : 0.999
        },

        shape : {
            type : p2.Shape.RECTANGLE,
            width : 10 * BASE_SCALE,
            height : 10 * BASE_SCALE
        }

    },
    
    createFromTemplate : function(name, options, x, y)
    {
        var template = this.templates[name];
        
        if(!template) { return; }
        
        var config = _extend(template, options);
        
        return this._create(config, x, y);
    },
    
    create : function(options, x, y)
    {
        var config = _extend({}, this.defaultOptions, options);
        
        return this._create(config, x, y);
    },
    
    /**
     * create a new Entity
     */
    _create : function(options, x, y)
    {        
        var entity = new Entity(options);
        
        if(Debug.enabled) {
            Debug.addDebugShape(entity);
        }
        
        if(options.shadow) {
            this.addShadow(entity);
        }
        
        this.entities.push(entity);
        
        this.add(entity, x, y);
        
        return entity;
    },
      
    /**
     * call update on all entities
     */
    update : function()
    {
        for(var i = 0, len = this.entities.length; i < len; i++) {
            this.entities[i].update();            
        }
    },
    
    addTemplate : function(name, options)
    {
        var template = _extend({}, this.defaultOptions, options);
        
        this.templates[name] = template;
    },
    
    /**
     * add an entity to the world
     */
    add : function(entity, x, y)
    {
        layers.other.addChild(entity.sprite);
        
        if(entity.shadow) {
            layers.shadows.addChild(entity.shadow);
        }

        if(entity.debug) {
            layers.debug.addChild(entity.debug);
        }
        
        entity.position = [ x || 0, y || 0 ];
        
        world.addBody(entity.body);
    },
    
    addShadow : function(entity)
    {    
        var shadow = new PIXI.Sprite(entity.sprite.texture);
    
        shadow.tint = 0x000000;
        shadow.anchor.set(entity.sprite.anchor.x, entity.sprite.anchor.y);
        //shadow.alpha = 0.3;
        shadow.scale.set(entity.sprite.scale.x, entity.sprite.scale.y);
    
        entity.shadow = shadow;
    }
    
};
