var game=new Phaser.Game(800,600,Phaser.CANVAS,'juego');

var spacefield;
var background;
var cursors;
var player;

var mainState={
	preload:function(){

		game.load.image('startfield','assets/img/espacio.png');
		game.load.image('nave', 'assets/img/star.png');

	},
	create:function(){
		spacefield = game.add.tileSprite(0,0,800,600,'startfield');
		background=1;

		game.physics.startSystem(Phaser.Physics.ARCADE);
		player = game.add.image(0, 0, 'nave');
		game.physics.arcade.enable(player);


		cursors= game.input.keyboard.createCursorKeys();
	}, 
	update:function(){
		spacefield.tilePosition.y+=background;

		player.body.velocity.x=0;

		if(cursors.left.isDown)
		{
			player.body.velocity.x = -350;
		}

		if(cursors.right.isDown)
		{
			player.body.velocity.x = 350;
		}
	}


}


game.state.add('mainState',mainState);

game.state.start('mainState');