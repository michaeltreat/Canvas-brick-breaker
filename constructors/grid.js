'use strict';

const Grid = function(canvasId){

  this.isPaused = true
  this.bricks = []
  this.paddles = []
  this.balls = []
  this.raf; // Will hold the referece to the current requestAnimationFrame.

  Grid.allGrids.push(this)
  this.canvas = document.getElementById(canvasId)
  this.ctx = this.canvas.getContext('2d')
  this.addListeners()
  this.makeAll()
  this.draw()
  return this
}

Grid.allGrids = []

// Add a listener to each canvas to toggle pausing the game.
Grid.prototype.addListeners = function(){
  this.canvas.addEventListener('click', (e) => {
    e.stopPropagation()
    this.isPaused = !this.isPaused // Toggle paused.

    let draw = this.draw.bind(this) // Losing context of 'this' here twice, so used an arrow func for the handler as it doesn't retain scope and bind to hold the ctx of this.

    if(!this.isPaused){
      console.log('Running');
      this.raf = window.requestAnimationFrame(draw) // Start the callback chaining again
    }else{
      console.log('Paused');
      window.cancelAnimationFrame(this.raf) // Stop the callback chaining.
    }
  })
}

// Function to handle drawing the graph. The param determines the increments to draw the lines, and display the x,y graph position.
Grid.prototype.drawGraph = function(graphIncrements) {
  let ctx = this.ctx
  let canvas = this.canvas
  let acc = graphIncrements

  ctx.beginPath() // Indicates that we are ready to start drawing a new path.

  // For the entire canvas width, draw a new line every increment.
  for( let i = 0; i < canvas.width; i += acc){
    ctx.moveTo(i, 0) // Lift and Move the 'Pencil' to a point
    ctx.lineTo(i, canvas.height) // Draw an invisible line from the current 'Pencil' position to a specific x, y position.

    if( i === 50) ctx.strokeText(i, i - 13, 10) // position fix for first value.
    if( i > 50) ctx.strokeText(i, i - 18, 10) // write in all the numbers for each increment.
    if(i === canvas.height - acc) ctx.strokeText(i + acc, i + 32, 10) // position fix for last value.
  }
  ctx.stroke() // Now actually 'Ink' all those invisible lines.
  ctx.closePath() // Close the path to indicate we are done drawing this specific path.

  ctx.beginPath()
  for( let j = 0; j < canvas.height; j += acc){
    ctx.moveTo(0,j)
    ctx.lineTo(canvas.width, j)
    if(j > 0)ctx.strokeText(j, 0, j)
    if(j === canvas.height - acc )ctx.strokeText(j + acc, 0, j + acc) // position fix for last value.
  }
  ctx.stroke()
  ctx.closePath()
}

// Functions to create the objects that will go onto our grid.
Grid.prototype.createBalls = function(){
  this.balls.push(new Ball(100,100,5,4,5,this.balls.length,'blue',this.canvas,this.ctx))
  this.balls.push(new Ball(300,40,-5,-4,5,this.balls.length,'red',this.canvas,this.ctx))
}

Grid.prototype.createBricks = function(){
  this.bricks.push(new Brick(125,125,25,25,this.bricks.length,2,['black','green'],this.canvas,this.ctx))
  this.bricks.push(new Brick(333,225,25,25,this.bricks.length,2,['black','green'],this.canvas,this.ctx))
}
Grid.prototype.makeAll = function(){
  this.createBalls()
  this.createBricks()
}

// The Main function. This is what actually draws everytthing on the page
Grid.prototype.draw = function(){
  this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height) // Clears entire canvas. Must do this first each time or we will have the old positions still on the canvas.
  this.drawGraph(50)

  for(let j = 0; j < this.bricks.length; j++){
    this.bricks[j].draw() // Draws all Bricks
  }
  for(let i = 0; i < this.balls.length; i++){
    this.balls[i].draw() // Draws all Balls
  }

  var draw = this.draw.bind(this) // Have to bind the context of 'this' again.
  this.raf = requestAnimationFrame(draw) // raf takes a callback. This is working like a form of callback recusrion.
  if(this.isPaused) cancelAnimationFrame(this.raf) // This is here because the game starts paused, but we want to draw everything at least once and then immediately pause the game. If we want to start the game already going then we should take this line out, and change the initial isPaused to false.
}


// Make new grid objects. Can make this dynamic with getElementsByTagName.
new Grid('canvas')
new Grid('canvas-1')
