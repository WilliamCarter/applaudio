define(["404/js/lib/phaser"], function(Phaser){
	
	var Justin = function(game) {
		Phaser.Sprite.call(this, game, game.width/2, game.height/2, "justin");
		this.anchor.setTo(0.5,0.5);
		game.world.add(this);
	}

	Justin.prototype = Phaser.Sprite.prototype;
	Justin.prototype.constructor = Justin;

	return Justin;
});