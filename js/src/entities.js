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
