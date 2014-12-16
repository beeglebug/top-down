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

EntityManager.createFromTemplate('pallet', {}, 200, 200);
EntityManager.createFromTemplate('trolley', {}, 100, 100);
EntityManager.createFromTemplate('cone', {}, 100, 150);
EntityManager.createFromTemplate('cone', {}, 100, 170);

var wall = EntityManager.create({
    sprite : { image : 'img/wall.png' },
    body : { mass: 0 },
    shape : {
        width: 6,
        height: 50
    }
}, 30, 80);

requestAnimFrame( tick );
