// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, velx, vely, color, size) {
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.color = color;
    this.size = size;
}