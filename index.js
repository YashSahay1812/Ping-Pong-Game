const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    radius : 10
}
class Paddle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 100;
    }
}

let p1 = new Paddle(5,(canvas.height/2) - 50);
let p2 = new Paddle(canvas.width - 25, (canvas.height/2) - 50);

// DRAWING PADDLES AND BALL
ctx.fillStyle = "blue";
ctx.fillRect(p1.x,p1.y,p1.width,p1.height);
ctx.fillRect(p2.x,p2.y,p2.width,p2.height);
ctx.beginPath();
ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,false);
ctx.fillStyle = "red";
ctx.fill();

// CREATING SCORE
// Left Score
ctx.font = '50px Arial';
ctx.fillStyle = "black";
ctx.fillText("0",canvas.width/4,canvas.height/5);

// Right Score
ctx.font = '50px Arial';
ctx.fillStyle = "black";
ctx.fillText("0",canvas.width - canvas.width/4,canvas.height/5);