'use strict'

const Brick = function(x,y,width,height,id,hp,colors,canvas,ctx){
  this.xx = xx
  this.yy = yy
  this.w = width
  this.h = height
  this.id = id
  this.hp = hp
  this.colors = colors // The idea is as hp decreases,the colors change.
  this.canvas = canvas
  this.ctx = ctx
  Brick.bricks.push(this)
}
Brick.bricks = []

Brick.prototype.draw = function(){
  let ctx = this.ctx
  if(this.hp > 0){
    ctx.beginPath()
    ctx.rect(this.xx,this.yy,this.w,this.h)
    ctx.fillStyle = this.colors[this.hp - 1]
    ctx.fill()
    ctx.closePath()
  }
}
