var w=window.innerWidth;
var h = window.innerHeight;

var GameState={

	preload:function(){

		this.load.image('background','assets/img/espacio.JPG');
		this.load.image('star','assets/img/star.png');
		this.load.image('platillo','assets/img/nave.gif');

	},
	create:function(){

		this.platillos=this.game.add.group();
		this.platillos.enableBody=true;
		this.platillos.physicsBodyType=Phaser.Physics.ARCADE;


		this.background = this.game.add.sprite(0,0,'background');
		for(var i=0; i < 20; ++i){
			var rx=game.rnd.integerInRange(5,w-15);
			var ry=game.rnd.integerInRange(5,h-15);
			this.star = this.game.add.sprite(rx,ry,'star');
		}

		for(var i=0; i < 10; i++)
		{
			this.platillo=this.platillos.create(100+i*50,game.rnd.integerInRange(0,500),'platillo');

			this.platillo.body.collideWorldBounds=true;
			this.platillo.body.gravity.x= this.game.rnd.integerInRange(-100,100);
			this.platillo.body.gravity.y= this.game.rnd.integerInRange(-250,250);

			this.platillo.body.bounce.setTo(1);
		}
	},
	update:function()
	{
		game.physics.arcade.collide(this.platillos,this.platillos);

	}
};

var game = new Phaser.Game(w,h,Phaser.AUTO);

game.state.add('GameState',GameState);
game.state.start('GameState');
