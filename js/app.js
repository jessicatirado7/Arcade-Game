// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.speed = 100 *(Math.random()*5);
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   this.x = this.x + this.speed*dt;

   if(this.x > 505){
      this.x = 0;
    }    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
	this.sprite = 'images/char-pink-girl.png';
	this.x = x;
	this.y = y;
};

Player.prototype.update = function() {
	allEnemies.forEach(enemy => {
		if(this.y === enemy.y && 
		   this.x < enemy.x + 83 &&
   		   this.x + 83 > enemy.x &&
   		   this.y < enemy.y + 101 &&
   		  101 + this.y >enemy.y) {
			console.log("Collide!");
		    this.x = 200;
    		this.y = 405;
		}
		console.log(this.y, enemy.y);
	});
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
	if (input === 'left' && this.x > 0) {
		this.x -= 101;
	} else if (input == 'up' && this.y > 0) {
		this.y -= 83;
	} else if (input == 'right' && this.x < 405) {
		this.x += 101;
	} else if (input == 'down' && this.y < 405) {
		this.y += 83;
	} 

	if (this.y < 0) {
		alert("Congrats, you made it to the other side!");
		this.x = 200;
    	this.y = 405;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(101, 73);
var enemy2 = new Enemy(101, 156);
var enemy3 = new Enemy(101, 239);
var allEnemies = [enemy1, enemy2, enemy3];



// Place the player object in a variable called player
var player = new Player(200, 405);

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
