// Enemies our player must avoid
// X and Y coordinates are random, so the bugs shows up
// random places
var Enemy = function() {
    this.yposition = [59, 142, 225];
    this.xposition = [-100, -200, -150, -300, -250];
    this.xspeed = Math.floor((Math.random() * 400) + 100);
    this.sprite = 'images/enemy-bug.png';
    this.x = this.xposition[Math.floor(Math.random() * 5)];
    this.y = this.yposition[Math.floor(Math.random() * 3)];
    this.width = 70;
    this.height = 70;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// With this method the bugs are moving on the screen
Enemy.prototype.update = function(dt) {
  this.x += Math.floor(this.xspeed*dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player shows up at the same time when the game starts
// The gamer can choose a different image for the Player
// character
var Player = function(sprite) {
    this.sprite = sprite;
    this.x = 203;
    this.y = 391;
    this.width = 70;
    this.height = 83;
    this.point = 0;

};

// Update the player's position and the character imnage
// required method for game
// Parameter: dt, a time delta between ticks
// When the player reach the water the player goes back
// to the starter position
Player.prototype.update = function(dt) {
  this.sprite = src;
    if (this.y === -24) {
        this.x = 203;
        this.y = 391;
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
  if (allowedKeys == "left" && this.x > 1) {
    this.x -= 101;
  } else if (allowedKeys == "right" && this.x < 405 ) {
    this.x += 101;
  } else if (allowedKeys == "up") {
    this.y -= 83;
  } else if (allowedKeys == "down" && this.y < 391) {
    this.y += 83;
  }
};

var Heart = function(x, y) {
  this.sprite = 'images/Heart.png';
  this.x = x;
  this.y = y;
}

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 45.45, 76.95);
};

Heart.prototype.update = function(dt) {
}

var Gem = function(image) {
    this.yposition = [80.375, 163.375, 246.375];
    this.xposition = [13.625, 114.625, 215.625, 316.625, 417.625];
    this.images = ['images/gem-green.png','images/gem-orange.png', 'images/Star.png','images/gem-blue.png'];
    this.sprite = this.images[Math.floor(Math.random() * 4)];;
    this.x = this.xposition[Math.floor(Math.random() * 5)];
    this.y = this.yposition[Math.floor(Math.random() * 3)];
    this.width = 70;
    this.height = 50;
    this.number = 0;
    this.point = 0;
};



Gem.prototype.update = function(dt) {
  if (this.x < player.x + player.width &&
  this.x + this.width > player.x &&
  this.y < player.y + player.height &&
  this.y + this.height > player.y) {
    this.number += 1;
    this.point +=250;
    this.x = this.xposition[Math.floor(Math.random() * 5)];
    this.y = this.yposition[Math.floor(Math.random() * 3)];
  } else if (this.number > 5 && allHearts.length == 2) {
      this.number -=5;
      allHearts.push(third);
  } else if (this.number > 5 && allHearts.length == 1) {
      this.number -=5;
      allHearts.push(second);
  }
  else if (player.y === -24) {
      this.point+=500;
    }
};



Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 75.75, 128.25);
    ctx.drawImage(Resources.get('images/gem-green.png'), 160, -18, 37.875, 64.125);
    ctx.font = "bold 30px Gugi";
    ctx.fillStyle = "#49506d";
    ctx.fillText(this.number, 205, 40);
    ctx.fillText("Points: ", 250, 40);
    ctx.fillText(this.point, 390, 40);

};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [new Enemy, new Enemy];
var src = 'images/char-cat-girl.png';
const player = new Player(src);

const first = new Heart(0, -18);
const second = new Heart(45, -18);
const third = new Heart(90, -18);

const allHearts =[first, second, third];

const gems = new Gem;
const resultNumber = gems.number;

//
// const allGems = [new Gem('images/Heart.png')];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', keyup);

function keyup(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}
