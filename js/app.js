// Constant values
var MAX_SPEED = 500;
var BASE_SPEED = 300;
var MAX_X_POSITION = 300;
var START_X = 300;
var START_Y = 570;
var MAX_LIVES = 10;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

// Superclass
var Character = function(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};

Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Prize class
var Prize = function(x, y, score, sprite, life) {
  Character.call(this, x, y, sprite);
  this.score = score;
  this.life = life;
};

Prize.prototype = Object.create(Character.prototype);
Prize.prototype.constructor = Prize;

// Prize.prototype.render = function() {
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  Character.call(this, x, y, sprite);
  this.height = 171;
  this.width = 101;
  this.speed = BASE_SPEED;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

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
    this.speed = Math.floor(Math.random() * MAX_SPEED + BASE_SPEED);
    // console.log(this.speed);
  } else {
    // multiplies the speed by time delta and increments
    // the enemy's x position
    this.x += this.speed * dt;
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
  Character.call(this, x, y, sprite);
  this.height = 171;
  this.width = 101;
  this.lives = MAX_LIVES;
  this.score = 0;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  // if lives equal zers reset player position and lives
  // also display GAME OVER h3 tag that fades out
  console.log(this.x);
  console.log(this.y);
  if (this.lives === 0) {
    this.reset();
    $("#over").fadeIn('slow').animate({
      opacity: 1.0
    }, 1500).fadeOut('slow');
  }
  // Update lives left to user
  var currentLives = 'Lives: ' + this.lives;
  $('#lives').text(currentLives);
  // Update current score
  var score = 'Score: ' + this.score;
  $('#score').text(score);
};

Player.prototype.handleInput = function(input) {
  // disables input key if it will move the player out of bounds
  if (input === 'left' && this.x > 0) {
    this.x -= TILE_WIDTH;
  } else if (input === 'right' && this.x < 600) {
    this.x += TILE_WIDTH;
  } else if (input === 'up' && this.y > 30) {
    this.y -= TILE_HEIGHT;
  } else if (input === 'down' && this.y < 570) {
    this.y += TILE_HEIGHT;
  }
};

Player.prototype.reset = function() {
  this.x = START_X;
  this.y = START_Y;
  this.lives = MAX_LIVES;
  this.score = 0;
};

// method to change sprite of char from icon selection input
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

var player = new Player(START_X, START_Y, 'images/char-boy.png');
var heart = new Prize(605, 70, 100, 'images/Heart.png', 1);
var enemySprite = 'images/enemy-bug.png';
var enemy1Row1 = new Enemy(-100, 140, enemySprite);
var enemy1Row2 = new Enemy(0, 230, enemySprite);
var enemy2Row2 = new Enemy(-500, 230, enemySprite);
var enemy1Row3 = new Enemy(-300, 310, enemySprite);
var enemy1Row4 = new Enemy(-20, 390, enemySprite);
var enemy2Row4 = new Enemy(-1000, 390, enemySprite);
var allEnemies = [];
// add ass enemies to allEnemies array
allEnemies.push(enemy1Row1);
allEnemies.push(enemy1Row2);
allEnemies.push(enemy2Row2);
allEnemies.push(enemy1Row3);
allEnemies.push(enemy1Row4);
allEnemies.push(enemy2Row4);

// function to reset player's lives, position, and score
// called when user presses Reset button and lives = 0
var reset = function() {
  player.x = START_X;
  player.y = START_Y;
  player.lives = MAX_LIVES;
  player.score = 0;
};

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

// Icon Select

var iconSelect;

window.onload = function() {

  iconSelect = new IconSelect('my-icon-select', {
    selectedIconWidth: 28,
    selectedIconHeight: 48,
    selectedBoxPadding: 0,
    iconsWidth: 28,
    iconsHeight: 48,
    boxIconSpace: 5,
    vectoralIconNumber: 2,
    horizontalIconNumber: 1
  });

  var icons = [];
  icons.push({
    iconFilePath: 'images/char-boy.png',
    iconValue: '1'
  });
  icons.push({
    iconFilePath: 'images/char-cat-girl.png',
    iconValue: '2'
  });
  icons.push({
    iconFilePath: 'images/char-horn-girl.png',
    iconValue: '3'
  });
  icons.push({
    iconFilePath: 'images/char-pink-girl.png',
    iconValue: '4'
  });
  icons.push({
    iconFilePath: 'images/char-princess-girl.png',
    iconValue: '5'
  });
  icons.push({
    iconFilePath: 'images/enemy-bug.png',
    iconValue: '6'
  });

  iconSelect.refresh(icons);

};
// EVENT LISTENERS

//update sprite based on user input
document.getElementById('my-icon-select').addEventListener('changed', function(e) {
  var value = iconSelect.getSelectedValue();
  player.changeChar(value);
});

// call reset function when user presses Reset button
$('#reset').click(function() {
    player.reset();
  }
);

// disable default behavior for arrow keys to prevent scrollbar from
// moving when a user moves their character
window.addEventListener('keydown', function(e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
