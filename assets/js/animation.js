
var w=$("#juego").innerWidth();
var h=$("#juego").innerHeight();
var game = new Phaser.Game(w,h, Phaser.AUTO, 'juego', { preload: preload, create: create });

function preload() {

    game.load.atlas('seacreatures', 'assets/img/sprites/seacreatures_json.png', 'assets/img/sprites/seacreatures_json.json');
    game.load.image('undersea', 'assets/img/background/undersea.jpg');

}

var greenJellyfish;

function create() {

    game.add.image(0, 0, 'undersea');

    greenJellyfish = game.add.sprite(330, 500, 'seacreatures', 'greenJellyfish0000');
    greenJellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 39, '', 4), 30, true);
    greenJellyfish.animations.play('swim');
    game.add.tween(greenJellyfish).to({ y: -100 }, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

}

function changeFrame() {

    greenJellyfish.frameName = 'greenJellyfish0010';

}