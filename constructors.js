'use strict';

const Grid = function(canvasId){
  this.canvas = document.getElementById(canvasId)
  this.ctx = this.canvas.getContext('2d')
  this.addListeners()
  this.isPaused = true
  this.bricks = []
  this.paddles = []
  this.balls = []
  this.raf;
  return this
}

Grid.prototype.addListeners = function(){
  this.canvas.addEventListener('click', () => {
    console.log('elistener',this.draw)
    this.isPaused = !this.isPaused
    if(this.isPaused){
      console.log('Running', this);
      var draw = this.draw.bind(this)
      this.raf = window.requestAnimationFrame(draw)
    }else{
      console.log('Paused',this);
      window.cancelAnimationFrame(this.raf)
    }
  })
}

Grid.prototype.draw = function(){
  console.log('this is :', this);
  this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
  this.drawGraph(50)
}

Grid.prototype.drawGraph = function(graphIncrements) {
  var ctx = this.ctx
  var canvas = this.canvas
  var acc = graphIncrements

  ctx.beginPath()

  for( var i = 0; i < canvas.width; i += acc){
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height)
    if( i === 50) ctx.strokeText(i, i - 13, 10) // position fix for first value.
    if( i > 50) ctx.strokeText(i, i - 18, 10)
    if(i === canvas.height - acc) ctx.strokeText(i + acc, i + 32, 10) // position fix for last value.
  }
  ctx.stroke()
  ctx.closePath()
  for( var j = 0; j < canvas.height; j += acc){
    ctx.moveTo(0,j)
    ctx.lineTo(canvas.width, j)
    if(j > 0)ctx.strokeText(j, 0, j)
    if(j === canvas.height - acc )ctx.strokeText(j + acc, 0, j + acc) // position fix for last value.
  }
  ctx.stroke()
  ctx.closePath()
}

var grid = new Grid('canvas')
