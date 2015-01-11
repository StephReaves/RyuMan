var Ryu = {};

Ryu.preload = function() {
  game.load.image('ryuNormal', 'assets/ryu/ryu_normal.png');
  game.load.image('blueHadoken', 'assets/ryu/blue_hadoken.png');
  game.load.image('redHadoken', 'assets/ryu/red_hadoken.png');
};

Ryu.create = function() {
  ryu = game.add.image(game.world.centerX, 520,'ryuNormal');
  Hadokens = game.add.group();
  Hadokens.enableBody = true;
  game.physics.enable('ryuNormal', Phaser.Physics.ARCADE);
  ryu.anchor.setTo(.5, .5);
  // ryu.body.collideWorldBounds = true;

  playerKeys = {
    //movement
    w: game.input.keyboard.addKey(87),
    a: game.input.keyboard.addKey(65),
    s: game.input.keyboard.addKey(83),
    d: game.input.keyboard.addKey(68),
    //hadoken
    h: game.input.keyboard.addKey(72)
  };
  game.camera.follot(ryu)
};

Ryu.update = function() {
   if (playerKeys.w.isDown) {
    console.log('move up');
  }
  else if (playerKeys.a.isDown) {
    ryu.x -= 5;
    ryu.scale.x = -1;
  }
  else if (playerKeys.s.isDown) {
    console.log('move down/duck?');
  }
  else if (playerKeys.d.isDown) {
    ryu.x += 5;
    ryu.scale.x = 1;
  }

  playerKeys.h.onDown.add(function(key){
    if (playerKeys.a.isDown) {
      this.chuckHadoken(Hadokens, 'blueHadoken', 'left');
    }
    else{
      this.chuckHadoken(Hadokens, 'blueHadoken', 'right');
    }
  }, this);

  if (playerKeys.h.isDown) {
    var duration = playerKeys.h.duration;
    playerKeys.h.onUp.add(function(key){
      if (duration >= 500) {
        duration = 0;
        if (playerKeys.a.isDown) {
          this.chuckHadoken(Hadokens, 'redHadoken', 'left');
        }
        else{
          this.chuckHadoken(Hadokens, 'redHadoken', 'right');
        }
      }
    }, this);
  }
};

Ryu.chuckHadoken = function(hadokens, hadokenImage, direction) {
  var hadoken = hadokens.create(ryu.x, ryu.y, hadokenImage);
  if (direction === 'left') {
    hadoken.body.velocity.x = -400;
  }
  else{
    hadoken.body.velocity.x = 400;
  }
};

Ryu.render = function() {
  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.spriteCoords(ryu, 32, 500);
};