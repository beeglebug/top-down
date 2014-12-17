// dom binding
input.bindKeyboard(window);
document.body.appendChild(renderer.view);

var man = EntityManager.create({
    sprite : { image : 'img/man.png' },
    body : {
        mass : 3,
        fixedRotation : true
    },
    shape : {
        type : p2.Shape.CIRCLE,
        radius : 7
    }
}, 200, 50);

camera.follow(man);

var test = EntityManager.createFromTemplate('pallet', {}, 200, 200);
EntityManager.createFromTemplate('trolley', {}, 100, 100);
EntityManager.createFromTemplate('cone', {}, 100, 150);
EntityManager.createFromTemplate('cone', {}, 100, 170);

var wall = EntityManager.createFromTemplate('wall', {}, 160, 0);
var wall2 = EntityManager.createFromTemplate('wall', {}, 240, 0);
var wall3 = EntityManager.createFromTemplate('wall', {}, 200, 35);

var door = EntityManager.create({
    shape : {
        width : 30,
        height: 4
    },
    sprite : {
        image :'img/door.png'
    }
}, 200, 0);

var groundBody = new p2.Body();
world.addBody(groundBody);

var hinge = new p2.RevoluteConstraint(door.body, groundBody, {
    worldPivot: [185, 0]
});
hinge.setLimits(-PI2, PI2);

world.addConstraint(hinge);

door.shape.collisionGroup = COLLISION_DOORS;
man.shape.collisionGroup = COLLISION_MOBS;

door.shape.collisionMask = COLLISION_MOBS | COLLISION_OBJECTS;
man.shape.collisionMask = COLLISION_WALLS | COLLISION_DOORS | COLLISION_OBJECTS;




requestAnimFrame( tick );
