function tick() {

    requestAnimFrame( tick );

    var speed = 2000;
    
    // handle input
    if(input.isDown(Input.KEY_ARROW_RIGHT))
    {
        man.body.force[0] = speed;
        man.body.angle = -Math.PI/2;
    }
    else if(input.isDown(Input.KEY_ARROW_LEFT))
    {
        man.body.force[0] = -speed;
        man.body.angle = Math.PI/2;
    }
    
    if(input.isDown(Input.KEY_ARROW_UP))
    {
        man.body.force[1] = -speed;
        man.body.angle = Math.PI;
    }
    else if(input.isDown(Input.KEY_ARROW_DOWN))
    {
        man.body.force[1] = speed;
        man.body.angle = 0;
    }
    
    // do physics
    world.step(1/60);
    
    // sync visuals
    EntityManager.update();
    
    // render
    renderer.render(stage);
}