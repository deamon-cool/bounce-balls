const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x,y,velx,vely,exists) {
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.exists = exists;
}

Shape.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
};

Shape.prototype.update = function() {
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

Shape.prototype.collisionDetect = function() {
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


function Ball(x, y, velx, vely, exists, color, size) {
    Shape.call(x, y, velx, vely, exists);

    this.color = color;
    this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);

Object.defineProperty(Ball.prototype, 'constructor', {
    value: Ball,
    enumerable: false,
    writable: true
});


let balls = [];

for(let i = 0; i < 40; i++) {
    let size = random(10, 20);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`,
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(0,0,width,height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();