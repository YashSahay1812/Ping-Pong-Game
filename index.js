const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    radius : 10,
    dx : 7,
    dy : 5
}
class Paddle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 100;
        this.speed = 30;
    }
}

let p1 = new Paddle(5,(canvas.height/2) - 50);
let p2 = new Paddle(canvas.width - 25, (canvas.height/2) - 50);

// DRAWING PADDLES AND BALL
function drawP1(){
    ctx.fillStyle = "blue";
    ctx.fillRect(p1.x,p1.y,p1.width,p1.height);
}
function drawP2(){
    ctx.fillStyle = "blue";
    ctx.fillRect(p2.x,p2.y,p2.width,p2.height);
}
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,false);
    ctx.fillStyle = "red";
    ctx.fill();
}
drawP1();
drawP2();
drawBall();

// CREATING SCORE
createLeftScore();
createRightScore();
// Left Score
function createLeftScore(){
    ctx.font = '50px Arial';
    ctx.fillStyle = "black";
    ctx.fillText("0",canvas.width/4,canvas.height/5);
}

// Right Score
function createRightScore(){
    ctx.font = '50px Arial';
    ctx.fillStyle = "black";
    ctx.fillText("0",canvas.width - canvas.width/4,canvas.height/5);
}

document.addEventListener('keydown',function(event){
    // FOR LEFT PLAYER
    if(event.key === 'w'){
        if(p1.y >= 5) p1.y -= p1.speed;
    }
    if(event.key === 's'){
        if(p1.y <= canvas.height-p1.height-5) p1.y += p1.speed;
    }
    // FOR RIGHT PLAYER
    if(event.key === 'ArrowUp'){
        if(p2.y >= 5) p2.y -= p2.speed;
    }
    if(event.key === 'ArrowDown'){
        if(p2.y <= canvas.height-p2.height-5) p2.y += p2.speed;
    }
})

function playGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(ball.x <= ball.radius || ball.x >= canvas.width - ball.radius){
        ball.dx = -ball.dx;
    }
    if(ball.y <= ball.radius || ball.y >= canvas.height - ball.radius){
        ball.dy = -ball.dy;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    drawBall();
    drawP1();
    drawP2();
    createLeftScore();
    createRightScore();
    requestAnimationFrame(playGame);
}
playGame();