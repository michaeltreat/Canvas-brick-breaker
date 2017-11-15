'use strict'

const Ball = function(x,y,vx,vy,radius,id,color,canvas,ctx){

  this.x = x
  this.y = y
  this.vx = vx // Tracks the current trajectory of the x axies...
  this.vy = vy // and this tracks the y axies. This is what makes the ball move each frame. The large the numbers, the faster the ball appears to move.
  this.radius = radius // Note that this is actually the radius. This is the distance from the center to the edge of the circle.

  this.id = id // Basically the index position in the Grid.balls array.
  this.color = color
  this.canvas = canvas
  this.ctx = ctx
  Ball.allBalls.push(this)
}

Ball.allBalls = []

Ball.prototype.draw = function(){
  let ctx = this.ctx

  // This is basic collision detection for the walls. This is what allows the balls to bounce off the walls.
  if (this.y + this.vy > this.canvas.height || this.y + this.vy < 0) {
    this.vy = -this.vy; // On bounce, invert y direction.
  }
  if (this.x + this.vx > this.canvas.width || this.x + this.vx < 0) {
    this.vx = -this.vx; // On bounce, invert x direction.
  }

  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.fillStyle = this.color;
  ctx.fill()
  ctx.closePath();

  this.x += this.vx; // This is what makes the ball move each frame.
  this.y += this.vy;
}
