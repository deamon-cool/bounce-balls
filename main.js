const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


// Shape class costructor, It's a parent class

function Shape(x,y,velx,vely,exists) {
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.exists = exists;
}


// Ball class constructor, inherited by Shape

function Ball(x, y, velx, vely, exists, color, size) {
    Shape.call(this, x, y, velx, vely, exists);

    this.color = color;
    this.size = size;
}

Object.defineProperty(Ball.prototype, 'constructor', {
    value: Ball,
    enumerable: false,
    writable: true
});

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
};

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velx = -(this.velx);
    }

    if ((this.x - this.size) <= 0) {
        this.velx = -(this.velx);
    }

    if ((this.y + this.size) >= height) {
        this.vely = -(this.vely);
    }

    if ((this.y - this.size) <= 0) {
        this.vely = -(this.vely);
    }

    this.x += this.velx;
    this.y += this.vely;
};

Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
            }
        }
    }
};


// EvilCircle class constructor, ingerited by Shape
function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);

    this.color = 'white';
    this.size = 10;
}

Object.defineProperty(EvilCircle.prototype, 'constructor', {
    value: EvilCircle,
    enumerable: false,
    writable: true
});

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.stroke();
};

EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
};

EvilCircle.prototype.setControls = function() {
    let _this = this;
    window.onkeydown = function(e) {
        if (e.key === 'ArrowLeft') {
            _this.x -= _this.velX;
          } else if (e.key === 'ArrowRight') {
            _this.x += _this.velX;
          } else if (e.key === 'ArrowUp') {
            _this.y -= _this.velY;
          } else if (e.key === 'ArrowDown') {
            _this.y += _this.velY;
          }
    };
};

EvilCircle.prototype.collisionDetect = function() {
    for (let k = 0; k < balls.length; k++) {
        if (balls[k].exists) {
            const dx = this.x - balls[k].x;
            const dy = this.y - balls[k].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[k].size) {
                balls[k].exists = false;
            }
        }
    }
};



let balls = [];

for(let i = 0; i < 20; i++) {
    let size = random(10, 20);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`,
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(0,0,width,height);

    for (let i = 0; i < balls.length; i++) {
        if(balls[i].exists){
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    requestAnimationFrame(loop);
}

loop();