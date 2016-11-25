var w=$("#juego").width();
var h=$("#juego").height();
var game = new Phaser.Game(w,h,Phaser.AUTO,'juego',{create:crear,preload:precargar,update:actualizar});


function precargar()
{
	game.load.image('fondo','assets/img/space.png');
	game.load.image('star','assets/img/star.png');
	game.load.image('asteroide1','assets/img/asteroids/asteroid1.png');
	game.load.image('asteroide2','assets/img/asteroids/asteroid2.png');
	game.load.image('invader','assets/img/nave.gif');
	game.load.spritesheet('kaboom', 'assets/img/invaders/explode.png', 128, 128);
	
}

var stars={};
var inavders={};
var asteroides1={};
var asteroides2={};
var explosions={};
var scoreText={};
var scoreString='';
var finishText='';
var score=0;
var goal=0;
var currentTimer={};
var time=60;
var textTime={};
var shakeWorld=5;

function crear()
{
	game.add.tileSprite(0, 0, w, h, "fondo");

	stars=game.add.group();
	stars.enableBody=true;
	stars.physicsBodyType=Phaser.Physics.ARCADE;

	invaders=game.add.group();
	invaders.enableBody=true;
	invaders.physicsBodyType=Phaser.Physics.ARCADE;

	asteroides1=game.add.group();
	asteroides1.enableBody=true;
	asteroides1.physicsBodyType=Phaser.Physics.ARCADE;

	asteroides2=game.add.group();
	asteroides2.enableBody=true;
	asteroides2.physicsBodyType=Phaser.Physics.ARCADE;

	explosions = game.add.group();
    explosions.createMultiple(15, 'kaboom');
    explosions.forEach(setupAsteroid, this);

    scoreString='Score: ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
    scoreText.enableBody=true;
	scoreText.physicsBodyType=Phaser.Physics.ARCADE;

    textTime = game.add.text(game.world.width-30, game.world.height-20, 'Time left: '+time, { font: '34px Arial', fill: '#fff' });
	textTime.anchor.set(1,1);

    currentTimer = game.time.create();
	currentTimer.loop(Phaser.Timer.SECOND, subsChrono, this);

		currentTimer.start();

    var s=0;
	for(var i=0; i < 50; i++)
	{
			var x=game.rnd.integerInRange(100,w-100) + 10;
			var y=game.rnd.integerInRange(100,h-100) + 10;
			var star={};
			var invader={};

			var asteroide1=asteroides1.create(x,y,'asteroide1');
			    asteroide1.scale.setTo(3);
			    asteroide1.inputEnabled = true;
        		asteroide1.input.useHandCursor = true;
        		asteroide1.events.onInputDown.add(destroySprite, this);
        
        if(game.rnd.integerInRange(0,1))
        {
			star=stars.create(x,y,'star');
		    star.scale.setTo(1.5);
		    star.x=(star.x + 25);
		    star.y=(star.y + 20);
		    star.enableBody = true;
		    star.inputEnabled = true;
        	star.input.useHandCursor = true;
        	star.events.onInputDown.add(catchStar, this);
        	++s;
		}else{
			invader=invaders.create(x,y,'invader');
		    invader.scale.setTo(1.25);
		   	invader.x=(invader.x + 25);
		    invader.y=(invader.y + 20);
		    invader.enableBody = true;
		    invader.inputEnabled = true;
        	invader.input.useHandCursor = true;
        	invader.events.onInputDown.add(touchInvader, this);
		}

			x=game.rnd.integerInRange(100,w-100) + 10;
			y=game.rnd.integerInRange(100,h-100) + 10;

			var asteroide2=asteroides2.create(x,y,'asteroide2');
				asteroide2.scale.setTo(3);
				asteroide2.inputEnabled = true;
        		asteroide2.input.useHandCursor = true;
        		asteroide2.events.onInputDown.add(destroySprite, this);

		if(game.rnd.integerInRange(0,1))
		{
			star=stars.create(x,y,'star');
		    star.scale.setTo(1.5);
		    star.x=(star.x + 25);
		    star.y=(star.y + 20);
		    star.enableBody = true;
		    star.inputEnabled = true;
        	star.input.useHandCursor = true;
        	star.events.onInputDown.add(catchStar, this);
        	++s;
		}else{
			invader=invaders.create(x,y,'invader');
		    invader.scale.setTo(1.25);
		   	invader.x=(invader.x + 25);
		    invader.y=(invader.y + 20);
		    invader.enableBody = true;
		    invader.inputEnabled = true;
        	invader.input.useHandCursor = true;
        	invader.events.onInputDown.add(touchInvader, this);
		}

	}

	goal=(s*10);
	
}

function actualizar()
{
}

 function subsChrono() 
 {
	
	if(time > 0) {
		time--;
		textTime.setText('Time left: '+time);
	}
	else {
		stateStatus = 'gameover';
	}
}

function destroySprite (ast) {

    ast.destroy();
    var explosion = explosions.getFirstExists(false);
    explosion.reset(ast.x + 50, ast.y +50 );
    explosion.play('kaboom', 30, false, true);

}

function setupAsteroid (ast) {

    ast.anchor.x = 0.5;
    ast.anchor.y = 0.5;
    ast.animations.add('kaboom');

}

function catchStar(star)
{
	 //star.destroy();
	game.physics.arcade.moveToObject(star,scoreText, 1000,0);
	score += 10;
    scoreText.text = scoreString + score;
	if(score==goal){
    	finishText=game.add.text(game.world.centerX -200, game.world.centerY , "Felicidades los encontraste todos!!", { font: '34px Arial', fill: '#fff' });
	}
    
}

function touchInvader(inv)
{
	 //star.destroy();
	if(time >= 0){
		time -= 10;
    	textTime.setText('Time left: '+time);	
    	game.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true);

    	inv.destroy();
    	var explosion = explosions.getFirstExists(false);
    		explosion.reset(inv.x + 20, inv.y +20 );
    		explosion.play('kaboom', 30, false, true);
	}
}



