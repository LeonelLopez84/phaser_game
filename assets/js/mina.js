var w=window.innerWidth;
var h=window.innerHeight;
var game = new Phaser.Game(w,h,Phaser.AUTO,'',{create:crear,preload:precargar,update:actualizar});


function precargar()
{
	game.load.image('fondo','assets/img/space.png');
	game.load.image('star','assets/img/star.png');
	game.load.image('asteroide1','assets/img/asteroids/asteroid1.png');
	game.load.image('asteroide2','assets/img/asteroids/asteroid2.png');
	game.load.spritesheet('kaboom', 'assets/img/invaders/explode.png', 128, 128);
	
}

var stars={};
var asteroides1={};
var asteroides2={};
var explosions={};
var scoreText={};
var scoreString='';
var finishText='';
var score=0;
var goal=0;

function crear()
{
	game.add.tileSprite(0, 0, w, h, "fondo");

	stars=game.add.group();
	stars.enableBody=true;
	stars.physicsBodyType=Phaser.Physics.ARCADE;

	asteroides1=game.add.group();
	asteroides1.enableBody=true;
	asteroides1.physicsBodyType=Phaser.Physics.ARCADE;

	asteroides2=game.add.group();
	asteroides2.enableBody=true;
	asteroides2.physicsBodyType=Phaser.Physics.ARCADE;

	explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupAsteroid, this);

    scoreString='Score: ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    var s=0;
	for(var i=0; i < 10; i++)
	{
			var x=game.rnd.integerInRange(20,w-20);
			var y=game.rnd.integerInRange(20,h-20);
			var star={};

			var asteroide1=asteroides1.create(x,y,'asteroide1');
			    asteroide1.scale.setTo(1.25);
			    asteroide1.inputEnabled = true;
        		asteroide1.input.useHandCursor = true;
        		asteroide1.events.onInputDown.add(destroySprite, this);
        
        if(game.rnd.integerInRange(0,1))
        {
			star=stars.create(x,y,'star');
		    star.scale.setTo(0.75);
		    star.x=(star.x + 10);
		    star.y=(star.y + 10);
		    star.enableBody = true;
		    star.inputEnabled = true;
        	star.input.useHandCursor = true;
        	star.events.onInputDown.add(catchHandler, this);
        	++s;
		}

			x=game.rnd.integerInRange(20,w-20);
			y=game.rnd.integerInRange(20,h-20);

			var asteroide2=asteroides2.create(x,y,'asteroide2');
				asteroide2.scale.setTo(1.25);
				asteroide2.inputEnabled = true;
        		asteroide2.input.useHandCursor = true;
        		asteroide2.events.onInputDown.add(destroySprite, this);

		if(game.rnd.integerInRange(0,1))
		{
			star=stars.create(x,y,'star');
		    star.scale.setTo(0.75);
		    star.x=(star.x + 10);
		    star.y=(star.y + 10);
		    star.enableBody = true;
		    star.inputEnabled = true;
        	star.input.useHandCursor = true;
        	star.events.onInputDown.add(catchHandler, this);
        	++s;
		}

	}


	goal=(s*10);

}

function actualizar()
{

}

function destroySprite (ast) {

    ast.destroy();
    var explosion = explosions.getFirstExists(false);
    explosion.reset(ast.x, ast.y);
    explosion.play('kaboom', 30, false, true);

}

function setupAsteroid (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function catchHandler(star)
{
	 //star.destroy();
	game.physics.arcade.moveToObject(star,scoreText, 500,0);
	score += 10;
    scoreText.text = scoreString + score;

    console.log(score+' - '+goal);
	if(score==goal){
    	finishText=game.add.text(game.world.centerX -150, game.world.centerY , "Felicidades los encontraste todos!!", { font: '34px Arial', fill: '#fff' });
	}
    
}



