'use strict';


const Grid = function(canvasId){

  this.isPaused = true
  this.bricks = []
  this.paddles = []
  this.balls = []
  this.raf; // will hold referece to the current requestAnimationFrame.
  Grid.allGrids.push(this)
  this.canvas = document.getElementById(canvasId)
  this.ctx = this.canvas.getContext('2d')
  this.addListeners()
  this.createBalls()
  this.createBricks()
  this.draw()
  return this
}
Grid.allGrids = []

Grid.prototype.addListeners = function(){
  this.canvas.addEventListener('click', () => {
    this.isPaused = !this.isPaused
    let draw = this.draw.bind(this) // losing context of this here twice, so used an arrow func for the handler as it doesn't retain scope and bind to hold the ctx of this.
    if(!this.isPaused){
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

  for(let j = 0; j < this.bricks.length; j++){
    this.bricks[j].draw()
  }
  for(let i = 0; i < this.balls.length; i++){
    this.balls[i].draw()
  }
  var draw = this.draw.bind(this) // Have to bind the context of 'this' again.
  this.raf = requestAnimationFrame(draw)
  if(this.isPaused) cancelAnimationFrame(this.raf) // This is here because the game starts paused, but we want to draw everything at least once and then immediately pause the game.
}

Grid.prototype.createBalls = function(){
  this.balls.push(new Ball(100,100,5,4,5,this.balls.length,'blue',this.canvas,this.ctx))
  this.balls.push(new Ball(300,40,-5,-4,5,this.balls.length,'red',this.canvas,this.ctx))
}

Grid.prototype.createBricks = function(){
  this.bricks.push(new Brick(125,125,25,25,this.bricks.length,2,['black','green'],this.canvas,this.ctx))
  this.bricks.push(new Brick(333,225,25,25,this.bricks.length,2,['black','green'],this.canvas,this.ctx))
}
new Grid('canvas')
new Grid('canvas-1')
