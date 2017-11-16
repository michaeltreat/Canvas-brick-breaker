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
  this.closeToWall = false
  Ball.allBalls.push(this)
}

Ball.allBalls = []

Ball.prototype.draw = function(){
  let ctx = this.ctx

  // If the ball
  if(this.y < 30 || this.x < 30 || this.y + 30 > canvas.height || this.x + 30 > canvas.width){
    this.closeToWall = true
  }else{
    this.closeToWall = false
  }
  if(this.closeToWall) this.detectWall()


  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.fillStyle = this.color;
  ctx.fill()
  ctx.closePath();

  this.x += this.vx; // This is what makes the ball move each frame.
  this.y += this.vy;
}

Ball.prototype.detectWall = function(){
  console.log(`${this.canvas.id}: ${this.color} Ball #${this.id} is clostToWall.`)
  if (this.y + this.vy + this.radius > this.canvas.height + 1 || this.y + this.vy + this.radius < 10) { // If hits bottom || top, Change the y axis.
    this.vy = -this.vy; // On bounce, invert y direction.
  }
  if (this.x + this.vx + this.radius > this.canvas.width || this.x + this.vx + this.radius < 10) {
    this.vx = -this.vx; // On bounce, invert x direction.
  }
}

Ball.prototype.detection = function(){
  
}
