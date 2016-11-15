var w=window.innerWidth;
var h = window.innerHeight;

var platillos={};
var stars={};
var marciano={};
var controles={};
var score=0;
var textoScore='';
var textoFinal='';
var fondo, boom;

var game=new Phaser.Game(w,h,Phaser.AUTO,'',{create:crear,preload:precargar,update:actualizar});

	function precargar()
	{
		game.load.image('espacio','assets/img/espacio.png');
		game.load.image('platillo','assets/img/nave.gif');
		game.load.spritesheet('marciano', 'assets/img/sprites/dude.png',32,48);
		game.load.image('star','assets/img/star.png');
		game.load.audio('fondo','assets/audio/space.wav');
		game.load.audio('boom','assets/audio/scifi_effects.mp3');
	}

	function crear()
	{	
		game.add.image(0,0,'espacio');
		fondo = game.add.audio('fondo');
		boom = game.add.audio('boom');

		fondo.play('',0,0.25,true);

		platillos=game.add.group();
		platillos.enableBody=true;
		platillos.physicsBodyType=Phaser.Physics.ARCADE;

		stars=game.add.group();
		stars.enableBody=true;
		stars.physicsBodyType=Phaser.Physics.ARCADE;


		marciano=game.add.sprite(32,game.world.height-160,'marciano');
		
		game.physics.arcade.enable(marciano);
		marciano.body.bounce.y=0.5;
		marciano.body.gravity.y=50;
		marciano.body.gravity.x=50;
		marciano.body.collideWorldBounds=true;

		marciano.animations.add('izquierda',[0,1,2,3],10,true);
		marciano.animations.add('derecha',[5,6,7,8],10,true);

		for(var i=0; i < 10; ++i){
			var rx=game.rnd.integerInRange(5,w-15);
			var ry=game.rnd.integerInRange(5,h-15);
			var star = stars.create(rx,ry,'star');
				star.body.immovable=true;
		}

		for(var i=0; i < 5; i++)
		{
			var platillo=platillos.create(100+i*50,game.rnd.integerInRange(0,500),'platillo');

			platillo.body.collideWorldBounds=true;
			platillo.body.gravity.x= game.rnd.integerInRange(-100,100);
			platillo.body.gravity.y= game.rnd.integerInRange(-100,100);

			platillo.body.bounce.setTo(1);

		}

		textoScore= game.add.text(20,20,'Marcador: '+score,{fontSize:'36px',fill:'#fff'});

		controles=game.input.keyboard.createCursorKeys();
	}

	function actualizar()
	{
		game.physics.arcade.collide(platillos,platillos);
		game.physics.arcade.overlap(marciano,stars,recolectar,null,this);
		

		marciano.body.velocity.x=0;

		if(controles.left.isDown){
			marciano.body.velocity.x= -150;
			marciano.animations.play('izquierda');
		}else if(controles.right.isDown){
			marciano.body.velocity.x=150;
			marciano.animations.play('derecha');
		}else{
			marciano.animations.stop();
			marciano.frame=4;
		}

		if(controles.up.isDown)
		{
			marciano.body.velocity.y= - 150;
		}else if(controles.down.isDown){
			marciano.body.velocity.y= 150;
		}

		if(score == 100){

			textoFinal= game.add.text(100,250,'Felicidades Ganaste '+score+' puntos!!',{fontSize:'40px',fill:'#fff'});
			game.physics.arcade.collide(marciano,platillos);
		}else{
			game.physics.arcade.overlap(marciano,platillos,muerte,null,this);
		}
	}

	function recolectar(mar,st)
	{
		st.kill();
		score+=10;
		textoScore.text='Marcador: '+score;

		boom.play('',14.6,1,false);

		setTimeout(function(){
			boom.stop();
		},500);
		
	}


	function muerte(mar,pla)
	{
		mar.kill();
		score=0;
		textoScore.text='Marcador: '+score;

		boom.play('',0,1,false);

		setTimeout(function(){
			boom.stop();
		},2500);
	
		textoFinal= game.add.text(game.world.centerX, game.world.centerY,'Has muerto!',{fontSize:'40px',fill:'#fff'});

		fondo.stop();

		
	}


