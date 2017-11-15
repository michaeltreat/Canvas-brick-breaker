'use strict'

const Ball = function(x,y,vx,vy,radius,id,color,canvas,ctx){

  this.x = x
  this.y = y
  this.vx = vx
  this.vy = vy
  this.radius = radius
  this.id = id
  this.color = color
  this.canvas = canvas
  this.ctx = ctx
  Ball.allBalls.push(this)
}

Ball.allBalls = []

Ball.prototype.draw = function(){
  let ctx = this.ctx
  if (this.y + this.vy > this.canvas.height || this.y + this.vy < 0) {
    this.vy = -this.vy;
  }
  if (this.x + this.vx > this.canvas.width || this.x + this.vx < 0) {
    this.vx = -this.vx;
  }
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.fillStyle = this.color;
  ctx.fill()
  ctx.closePath();
  this.x += this.vx;
  this.y += this.vy;
}
