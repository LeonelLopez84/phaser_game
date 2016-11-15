var w=window.innerWidth;
var h = window.innerHeight;

var game = new Phaser.Game(w,h, Phaser.AUTO, 'asteroids', { preload: preload, create: create, update: update});


function preload()
{
 	game.load.image('asteroid1','assets/img/asteroids/asteroid1.png');
 	game.load.image('asteroid2','assets/img/asteroids/asteroid2.png');
 	game.load.image('space','assets/img/deep-space.jpg');
 	game.load.image('ship','assets/img/ship.png');
 	game.load.image('bullet', 'assets/img/invaders/bullet.png');
 	game.load.spritesheet('kaboom', 'assets/img/invaders/explode.png', 128, 128);
}


var asteroids1={};
var asteroids2={};
var starfield={};
var player={};
var bullets={};
var cursor={};
var fire={};
var explosions={};

function create()
{
	starfield = game.add.tileSprite(0, 0, w, h, 'space');

	player = game.add.sprite(400, 500, 'ship');
    player.angle = 270;

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.enableBody=true;
    player.body.collideWorldBounds=true;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x',- 1.5);
    bullets.setAll('anchor.y', 1.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

	asteroids1=game.add.group();
	asteroids1.enableBody=true;
	asteroids1.physicsBodyType=Phaser.Physics.ARCADE;

	asteroids2=game.add.group();
	asteroids2.enableBody=true;
	asteroids2.physicsBodyType=Phaser.Physics.ARCADE;

	for(var i=0; i < 7; i++)
		{
			var asteroide1=asteroids1.create(game.rnd.integerInRange(0,w),game.rnd.integerInRange(0,h),'asteroid1');
			    asteroide1.body.collideWorldBounds=true;
				asteroide1.body.gravity.x= game.rnd.integerInRange(-10,10);
				asteroide1.body.gravity.y= game.rnd.integerInRange(-10,10);
				asteroide1.body.bounce.setTo(1);
		}

	for(var i=0; i < 7; i++)
		{
			var asteroide2=asteroids2.create(game.rnd.integerInRange(0,w),game.rnd.integerInRange(0,h),'asteroid2');
			    asteroide2.body.collideWorldBounds=true;
				asteroide2.body.gravity.x= game.rnd.integerInRange(-10,10);
				asteroide2.body.gravity.y= game.rnd.integerInRange(-10,10);
				asteroide2.body.bounce.setTo(1);
		}

	explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

	cursors = game.input.keyboard.createCursorKeys();
    fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update()
{
	starfield.tilePosition.y += 3;

	game.physics.arcade.collide(asteroids1,asteroids1);
	game.physics.arcade.collide(asteroids2,asteroids2);
	game.physics.arcade.collide(asteroids1,asteroids2);

	game.physics.arcade.collide(player,asteroids1);
	game.physics.arcade.collide(player,asteroids2);

	game.physics.arcade.overlap(bullets,asteroids1, collisionHandler,null, this);
	game.physics.arcade.overlap(bullets,asteroids2, collisionHandler,null, this);

	//game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);


	player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }

        if (cursors.up.isDown)
        {
            player.body.velocity.y = -200;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 200;
        }

        //  Firing?
        if (fire.isDown)
        {
            fireBullets();
        }
}

function fireBullets()
{
	bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y -10);
            bullet.body.velocity.y = -300;
            //bulletTime = game.time.now + 200;
        }
}

function collisionHandler(bull,ast)
{
	ast.kill();
	bull.kill();

	var explosion = explosions.getFirstExists(false);
    explosion.reset(ast.body.x, ast.body.y);
    explosion.play('kaboom', 30, false, true);

}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}