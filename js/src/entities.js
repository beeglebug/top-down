EntityManager.addTemplate('pallet', {
    sprite : { image : 'img/pallet.png' },
    shape : {
        width: 22, height: 22
    }
});

EntityManager.addTemplate('cone', {
    sprite : { image : 'img/cone.png' },
    shape : {
        type : p2.Shape.CIRCLE,
        radius : 7
    }
});

EntityManager.addTemplate('trolley', {
    sprite : { image : 'img/trolley.png' },
    shape : {
        width: 18, height: 26
    }
});

EntityManager.addTemplate('wall', {
    sprite : { image : 'img/wall.png' },
    body : { mass: 0 },
    shape : {
        width: 50,
        height: 8,
        collisionGroup : COLLISION_WALLS
    }
});
