'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var acc = 50
var raf;
console.log(canvas.width)

var graph = {
  drawXLines: function(){
    ctx.beginPath()
    for( var i = 0; i < canvas.width; i += acc){
      ctx.moveTo(i,0)
      ctx.lineTo(i,canvas.height)
      if( i === 50)ctx.strokeText(i, i - 13, 10)
      if( i > 50)ctx.strokeText(i, i - 18, 10)
      if(i === canvas.height - acc)ctx.strokeText(i + acc, i + 32, 10)
    }
    ctx.stroke()
    ctx.closePath()
  },
  drawYLines: function(){

    ctx.beginPath()
    for( var j = 0; j < canvas.height; j += acc){
      ctx.moveTo(0,j)
      ctx.lineTo(canvas.width, j)
      if(j > 0)ctx.strokeText(j, 0, j)
      if(j === canvas.height - acc )ctx.strokeText(j + acc, 0, j + acc)
    }
    ctx.stroke()
    ctx.closePath()
  },
  drawGrid: function(){
    this.drawXLines()
    this.drawYLines()
  }
}


var brick = {
  hp: 2,
  x: 300,
  y: 400,
  width: 100,
  height: 50,
  color: 'green',
  points: function(){
    var x = this.x
    var y = this.y
    var w = this.width
    var h = this.height
    var pts = {
      tl: [x,y],
      tr: [x + w, y],
      bl:[x, y + h],
      br: [x + w, y + h],
    }
    return pts
  },
  draw: function(){
    if(this.hp > 0){
      ctx.beginPath()
      ctx.rect(this.x,this.y,this.width,this.height)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.closePath()
    }
  },
  collison: function(){
    var pts = this.points()
    console.log(`brick's top two corner x coords: ${pts.tl[0]},${pts.tr[0]}`)
    console.log(`ball's x coords: ${ball.x + ball.radius}`)
    console.log(pts.tr[0])
    if( pts.tl[0] <= ball.x + ball.radius && ball.x + ball.radius <= pts.tr[0]) {
      console.log('success')
      if( (ball.y + ball.radius > this.y && ball.y + ball.radius < this.y + this.height )){
        brick.hp--
        ball.xy = -ball.xy
        ball.vy = -ball.vy

        console.log(ball.x, ball.y, ball.radius);
      }
    }
  }
}



var ball = {
  x: 150,
  y: 250,
  vx: 5,
  vy: 4,
  radius: 10,
  color: 'blue',

  draw: function() {
    console.log(this.x,this.y)

    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
      ball.vx = -ball.vx;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill()
    ctx.closePath();
  }
};

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  graph.drawGrid()
  brick.draw()
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
}

var pause = false
canvas.addEventListener('click', function() {
  pause = !pause
  if(pause){
    raf = window.requestAnimationFrame(draw)
  }else{
    window.cancelAnimationFrame(raf)
  }
});
