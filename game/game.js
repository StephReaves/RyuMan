var State = {};

State.preload = function(){
  game.load.image('background', 'assets/imgs/mmbackground.jpg');
  Ryu.preload();
};
State.create = function(){
  game.add.sprite(0, 0, 'background');
  Ryu.create();
};
State.update = function(){
  Ryu.update();
};

var game = game || new Phaser.Game(800,600,Phaser.AUTO,'ryuman',State);