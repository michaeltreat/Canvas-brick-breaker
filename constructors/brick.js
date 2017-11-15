'use strict'

const Brick = function(x,y,width,height,id,hp,colors,canvas,ctx){
  this.x = x
  this.y = y
  this.w = width
  this.h = height
  this.id = id
  this.hp = hp
  this.colors = colors
  this.canvas = canvas
  this.ctx = ctx
  Brick.bricks.push(this)
}
Brick.bricks = []

Brick.prototype.draw = function(){
  let ctx = this.ctx
  if(this.hp > 0){
    ctx.beginPath()
    ctx.rect(this.x,this.y,this.w,this.h)
    ctx.fillStyle = this.colors[0]
    ctx.fill()
    ctx.closePath()
  }
}
