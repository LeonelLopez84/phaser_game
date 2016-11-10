
var w=800;
var h=600;
var platillos;
var game=new Phaser.Game(w,h,Phaser.AUTO,'',{create:crear,preload:precargar,update:actualizar});

	function precargar()
	{
		game.load.image('espacio','assets/img/espacio.png');
		game.load.image('platillo','assets/img/nave.gif');
	}

	function crear()
	{	
		game.add.image(0,0,'espacio');
		//game.add.image(x,y,'platillo');

		platillos=game.add.group();
		platillos.enableBodt=true;
		platillos.physicsBodyType=Phaser.Physics.ARCADE;
		
		for(var i=0; i < 10; i++)
		{
			platillos.create(100+i*50,50,'platillo');
		}
	}

	function actualizar()
	{

	}


