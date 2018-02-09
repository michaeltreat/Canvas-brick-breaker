'use strict'

const Ball = function(x,y,vx,vy,radius,id,color,canvas,ctx, colors){
  this.x = x
  this.y = y
  this.vx = vx // Tracks the current trajectory of the x axies...
  this.vy = vy // and this tracks the y axies. This is what makes the ball move each frame. The large the numbers, the faster the ball appears to move.
  this.radius = radius // Note that this is actually the radius. This is the distance from the center to the edge of the circle.

  this.id = id // Basically the index position in the Grid.balls array.
  this.color = color
  this.colorRunner = 0 // holds the current value of the color in the color array.
  this.runnerDelay = 4 // Delays changing the color for this amount of frames.
  if(colors)this.colors = colors
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

  // If there is an array of colors, use that array to update the color property.
  if(this.colors) this.chooseColor()

  ctx.fillStyle = this.color // This uses the default color, or the updated value from .chooseColor()
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

Ball.prototype.chooseColor = function(){
  this.color = this.colors[this.colorRunner] // Update the color property to what ever color we are currently on in the color array.
  this.runnerDelay-- // This delays changing the color for a specific amount of frames....
  if(this.runnerDelay === 0){ // ... Once it hits zero then change the color to the next/first color array and reset the delay.
    this.colorRunner++
    if(this.colorRunner > this.colors.length) this.colorRunner = 0 // If the color has been incremented past the length of the array, start the array over at 0.
    this.runnerDelay = 4
  }
}
