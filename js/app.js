// Enemies our player must avoid
var MAX_SPEED = 700;
var BASE_SPEED = 300;
var MAX_X_POSITION = 300;
var START_X = 300;
var START_Y = 570;
var MAX_LIVES = 10;

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.height = 171;
    this.width = 101;
    this.x = x;
    this.y = y;
    this.speed = BASE_SPEED;
  };


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // if the x position of the enemy is greater than CANVAS_WIDTH
    // then the x coordinate and speed gets reset randomly
    if (this.x > CANVAS_WIDTH) {
      // randomly reset the x position of the enemy to a negative
      // postion
      this.x = -(Math.floor(Math.random() * MAX_X_POSITION));
      //Change speed randomly every time enemey is reset
      this.speed = Math.floor(Math.random() * MAX_SPEED + 200);
      // console.log(this.speed);
    } else {
      // multiplies the speed by time delta and increments
      // the enemy's x position
      this.x += this.speed * dt;
    }
  };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // ctx.strokeRect(this.x + 3, this.y + 75, this.width - 5 ,this.height - 100);
  };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = START_X;
  this.y = START_Y;
  this.height = 171;
  this.width = 101;
  this.lives = MAX_LIVES;
  this.score = 0;
};

Player.prototype.update = function() {
  console.log('x: ' + this.x);
  console.log('y: ' + this.y);
  var currentLives = 'Lives: ' + this.lives;
  $('#lives').text(currentLives);
  var score = 'Score: ' + this.score;
  $('#score').text(score);
};

Player.prototype.handleInput = function(input) {
  // disables input key if it will move the player out of bounds
  if (input === 'left' && this.x > 0) {
    this.x -= 100;
  } else if (input === 'right' && this.x < 600) {
    this.x += 100;
  } else if (input === 'up' && this.y > 30) {
    this.y -= 90;
  } else if (input === 'down' && this.y < 570) {
    this.y += 90;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // ctx.strokeRect(this.x + 15, this.y + 65, this.width - 30 ,this.height - 95);
};

Player.prototype.changeChar = function(value) {
  switch (value) {
  case '1':
    this.sprite = 'images/char-boy.png';
  break;
  case '2':
    this.sprite = 'images/char-cat-girl.png';
  break;
  case '3':
    this.sprite = 'images/char-horn-girl.png';
  break;
  case '4':
    this.sprite = 'images/char-pink-girl.png';
  break;
  case '5':
    this.sprite = 'images/char-princess-girl.png';
  break;
  case '6':
    this.sprite = 'images/enemy-bug.png';
  break;
}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyRow1 = new Enemy(-100, 160);
var enemyRow2 = new Enemy(0, 240);
var enemyRow22 = new Enemy(-500, 240);
var enemyRow3 = new Enemy(-300, 320);
var enemyRow4 = new Enemy(-20, 410);
var enemyRow5 = new Enemy(-1000, 410);
var allEnemies = [];
allEnemies.push(enemyRow1);
allEnemies.push(enemyRow22);
allEnemies.push(enemyRow2);
allEnemies.push(enemyRow3);
allEnemies.push(enemyRow4);
allEnemies.push(enemyRow5);
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };
    player.handleInput(allowedKeys[e.keyCode]);
  });

var iconSelect;

window.onload = function() {

    iconSelect = new IconSelect('my-icon-select',
        {selectedIconWidth:28,
        selectedIconHeight:48,
        selectedBoxPadding:0,
        iconsWidth:28,
        iconsHeight:48,
        boxIconSpace:1,
        vectoralIconNumber:2,
        horizontalIconNumber:2});

    var icons = [];
    icons.push({iconFilePath:'images/char-boy.png', iconValue:'1'});
    icons.push({iconFilePath:'images/char-cat-girl.png', iconValue:'2'});
    icons.push({iconFilePath:'images/char-horn-girl.png', iconValue:'3'});
    icons.push({iconFilePath:'images/char-pink-girl.png', iconValue:'4'});
    icons.push({iconFilePath:'images/char-princess-girl.png', iconValue:'5'});
    icons.push({iconFilePath:'images/enemy-bug.png', iconValue:'6'});

    iconSelect.refresh(icons);

  };

var reset = function() {
      console.log('work');
      player.x = START_X;
      player.y = START_Y;
      player.lives = MAX_LIVES;
    };

document.getElementById('my-icon-select').addEventListener('changed', function(e) {
  var value = iconSelect.getSelectedValue();
  player.changeChar(value);
});

document.querySelector('button').addEventListener('click', reset, false);

window.addEventListener('keydown', function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }}, false);
