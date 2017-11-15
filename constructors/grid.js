'use strict';


const Grid = function(canvasId){

  this.isPaused = false
  this.bricks = []
  this.paddles = []
  this.balls = []
  this.raf; // will hold referece to the current requestAnimationFrame.
  Grid.allGrids.push(this)
  this.canvas = document.getElementById(canvasId)
  this.ctx = this.canvas.getContext('2d')
  this.addListeners()
  this.createBalls()
  this.draw()
  return this
}
Grid.allGrids = []

Grid.prototype.addListeners = function(){
  this.canvas.addEventListener('click', () => {
    this.isPaused = !this.isPaused
    let draw = this.draw.bind(this) // losing context of this here twice, so used an arrow func for the handler as it doesn't retain scope and bind to hold the ctx of this.
    if(this.isPaused){
      console.log('Running');
      this.raf = window.requestAnimationFrame(draw)
    }else{
      console.log('Paused');
      window.cancelAnimationFrame(this.raf)
    }
  })
}

Grid.prototype.drawGraph = function(graphIncrements) {
  let ctx = this.ctx
  let canvas = this.canvas
  let acc = graphIncrements

  ctx.beginPath()

  for( let i = 0; i < canvas.width; i += acc){
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height)
    if( i === 50) ctx.strokeText(i, i - 13, 10) // position fix for first value.
    if( i > 50) ctx.strokeText(i, i - 18, 10)
    if(i === canvas.height - acc) ctx.strokeText(i + acc, i + 32, 10) // position fix for last value.
  }
  ctx.stroke()
  ctx.closePath()
  for( let j = 0; j < canvas.height; j += acc){
    ctx.moveTo(0,j)
    ctx.lineTo(canvas.width, j)
    if(j > 0)ctx.strokeText(j, 0, j)
    if(j === canvas.height - acc )ctx.strokeText(j + acc, 0, j + acc) // position fix for last value.
  }
  ctx.stroke()
  ctx.closePath()
}

Grid.prototype.draw = function(){
  this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height) // Clears entire canvas.
  this.drawGraph(50)
  console.log(this.balls);
  for(let i = 0; i < this.balls.length; i++){
    console.log(this)
    this.balls[i].draw()
  }
}

Grid.prototype.createBalls = function(){
  this.balls.push(new Ball(100,100,5,4,5,this.balls.length,'blue',this.canvas,this.ctx))
}

let grid = new Grid('canvas')
