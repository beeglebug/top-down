var Camera = function(root)
{
    this.root = root;
    this.target = null;
    this.center = new PIXI.Point(320, 240);

    this.container = new PIXI.DisplayObjectContainer();

    this.container.addChild(this.root);
}

Camera.prototype.update = function()
{
    this.container.position.set(
        -this.target.position.x + this.center.x,
        -this.target.position.y + this.center.y
    );
};

Camera.prototype.follow = function(entity)
{
    this.target = entity;
    this.update();
};
