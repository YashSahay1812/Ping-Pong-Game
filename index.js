// CANVAS SELECTORS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// MENU SELECTORS
const menu = document.getElementById('menu');
const p1Score = document.getElementById('p1Score');
const p2Score = document.getElementById('p2Score');
const resume = document.getElementById('resume');
const restart = document.getElementById('restart');

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
function createLeftScore(score){
    ctx.font = '50px Arial';
    ctx.fillStyle = "black";
    ctx.fillText(score,canvas.width/4,canvas.height/5);
}

// Right Score
function createRightScore(score){
    ctx.font = '50px Arial';
    ctx.fillStyle = "black";
    ctx.fillText(score,canvas.width - canvas.width/4,canvas.height/5);
}

var gameStatus = "playing";

//Event Listeners
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
    if(event.key === 'Enter'){
        if(gameStatus === 'paused'){
            gameStatus = 'playing';
            playGame();
        }
    }
});
resume.addEventListener('click',function(){
    canvas.style.display = "block";
    menu.style.display = "none";
});
restart.addEventListener('click',function(){
    canvas.style.display = "block";
    menu.style.display = "none";
    leftScore = 0;
    rightScore = 0;
    if(gameStatus === 'paused'){
        gameStatus = 'playing';
        playGame();
    }
})

var leftScore = 0;
var rightScore = 0;

function playGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // HORIZONTAL BOUNDARIES (Restart game)
    if(ball.x <= ball.radius){
        window.cancelAnimationFrame(gameId);
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        p1.x = 5;
        p1.y = (canvas.height/2) - 50;
        p2.x = canvas.width - 25;
        p2.y = (canvas.height/2) - 50;
        rightScore++;   //updating score
        p2Score.innerText = rightScore;
        gameStatus = "paused";
        drawBall();
        drawP1();
        drawP2();
        createLeftScore(leftScore);
        createRightScore(rightScore);
        canvas.style.display = "none";
        menu.style.display = "flex";
        return;
    }
    if(ball.x >= canvas.width - ball.radius){
        window.cancelAnimationFrame(gameId);
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        p1.x = 5;
        p1.y = (canvas.height/2) - 50;
        p2.x = canvas.width - 25;
        p2.y = (canvas.height/2) - 50;
        leftScore++;    //updating score
        p1Score.innerText = leftScore;        
        gameStatus = "paused";
        drawBall();
        drawP1();
        drawP2();
        createLeftScore(leftScore);
        createRightScore(rightScore);
        canvas.style.display = "none";
        menu.style.display = "flex";
        return;
    }

    // VERTICAL BOUNDARIES
    if(ball.y <= ball.radius || ball.y >= canvas.height - ball.radius){
        ball.dy = -ball.dy;
    }

    //HIT LEFT PADDLE
    if(ball.x - ball.radius <= p1.x + p1.width && ball.y >= p1.y && ball.y <= p1.y + p1.height) {
        ball.dx = -ball.dx;
    }
    
    //HIT RIGHT PADDLE
    if(ball.x + ball.radius >= p2.x && ball.y >= p2.y && ball.y <= p2.y + p2.height) {
        ball.dx = -ball.dx;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
    drawBall();
    drawP1();
    drawP2();
    createLeftScore(leftScore);
    createRightScore(rightScore);
    var gameId = window.requestAnimationFrame(playGame);
}
playGame();