const playButton = document.querySelector('#play > button');
playButton.addEventListener('click',moveToGame);

function moveToGame(){
    //GLOBAL SELECTORS
    const container = document.getElementById('container');

    // FORM SELECTORS
    const form = document.getElementById('form');
    let name1 = document.querySelector('#name1 > input').value;
    let name2 = document.querySelector('#name2 > input').value;
    let games = document.getElementById('games').value;
    
    // CANVAS SELECTORS
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const validated = formValidation(name1,name2,games);
    if(!validated) return;

    //to switch from Form window to Canvas window
    form.style.display = 'none';
    canvas.style.display = 'block';

    // MENU SELECTORS
    const menu = document.getElementById('menu');

        //SCORES
        const p1Score = document.getElementById('p1Score');
        const p2Score = document.getElementById('p2Score');
        const player1 = document.getElementById('player1');
        const player2 = document.getElementById('player2');
    
        //BUTTONS
        const newGame = document.getElementById('newGame');
        const resume = document.getElementById('resume');
        const restart = document.getElementById('restart');
        const showScore = document.getElementById('showScore');
    
    // LEADERBOARDS SELECTORS
    const leaderboard = document.getElementById('leaderBoard');
    const leadersList = document.querySelector('#leaderBoard > table');
    const closeLeaderboard = document.getElementById('closeLeaderboard');

    // WINNING-MESSAGE SELECTORS
    const message = document.getElementById('Message');
    const closeMessage = document.getElementById('closeMessage');
    const winner = document.getElementById('winner');
    const opponent = document.getElementById('opponent');
    const scoreDiff = document.getElementById('diff');

    player1.innerText = name1;
    player2.innerText = name2;
    
    // GLOBAL VARIABLES (Used at many places)
    
        /*Total 3 gameStatus : Playing / Paused / Disabled
        Playing : Game is currently running
        Paused : Game is in paused state (Waiting for Enter key)
        Disabled : Game is currently disabled (Event-listeners related to EnterKey will not call playGame()) (Waiting for Restart/Resume)
        */
        let gameStatus = "paused";
        let leftScore = 0;
        let rightScore = 0;
    
    // CREATING BALL
    let ball = {
        x : canvas.width / 2,
        y : canvas.height / 2,
        radius : 10,
        dx : 7,
        dy : 5
    }
    
    // TEMPLATE FOR PADDLES (Class)
    class Paddle {
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.width = 20;
            this.height = 100;
            this.speed = 30;
        }
    }
    
    //CREATING OBJECTS OF PADDLE CLASS
    let p1 = new Paddle(5,(canvas.height/2) - 50);
    let p2 = new Paddle(canvas.width - 25, (canvas.height/2) - 50);
    
    // DRAWING PADDLES AND BALL
    function drawP1(){
        ctx.fillStyle = "#ede1d1";
        ctx.fillRect(p1.x,p1.y,p1.width,p1.height);
    }
    function drawP2(){
        ctx.fillStyle = "#ede1d1";
        ctx.fillRect(p2.x,p2.y,p2.width,p2.height);
    }
    function drawBall(){
        ctx.beginPath();
        ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,false);
        ctx.fillStyle = "bisque";
        ctx.fill();
    }
    drawP1();
    drawP2();
    drawBall();
    
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
    // CREATING SCORE
    createLeftScore(leftScore);
    createRightScore(rightScore);
    
    //Event Listeners
        //EVENT-LISTENERS FOR KEYS (Game controls)
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
                console.log('PressedEnter');
                if(gameStatus === 'paused'){
                    gameStatus = 'playing';
                    playGame();
                }
            }
        });
        
        //EVENT-LISTENER FOR NEWGAME BUTTON
        newGame.addEventListener('click',function(){
            location.reload(true);
        })
        //EVENT-LISTENER FOR RESUME BUTTON 
        resume.addEventListener('click',function(){

            //To disable Resume button when game has over
            if(leftScore + rightScore == games){
                window.alert("This game has already ended. Please start a NEW GAME !");
                return;
            }
            gameStatus = 'paused';
            canvas.style.display = "block";
            menu.style.display = "none";
            ctx.clearRect(0,0,canvas.width,canvas.height);
            createLeftScore(leftScore);
            createRightScore(rightScore);
            resetObjects();
            
        });

        //RESTART BUTTON IS NO MORE REQUIRED 
        //SINCE NOW WE HAVE ADDED NEW FEATURE 
        //WHERE USER WILL INPUT NO. OF GAMES IN THE START ONLY

        //EVENT-LISTENER FOR RESTART BUTTON
        // restart.addEventListener('click',function(){
        //     gameStatus = 'paused';
        //     canvas.style.display = "block";
        //     menu.style.display = "none";
        //     ctx.clearRect(0,0,canvas.width,canvas.height);
        //     resetObjects();
        //     resetScore();
        // });
        
        //EVENT-LISTENER FOR SCORE BUTTON
        showScore.addEventListener('click',function(){
            menu.style.display = "none";
            leaderboard.style.display = "block";
        });
        //EVENT-LISTENER FOR CROSS-BUTTON OF LEADERBOARD
        closeLeaderboard.addEventListener('click',function(){
            leaderboard.style.display = "none";
            menu.style.display = "flex";
        });
        //EVENT-LISTENER FOR CROSS-BUTTON OF MESSAGE-BOX
        closeMessage.addEventListener('click',function(){
            message.style.display = "none";
            menu.style.display = "flex";
        });

    
    //RESETS EVERYTHING TO IT'S INITIAL STATE    
    function resetObjects(){
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        p1.x = 5;
        p1.y = (canvas.height/2) - 50;
        p2.x = canvas.width - 25;
        p2.y = (canvas.height/2) - 50;
        drawBall();
        drawP1();
        drawP2();
    }

    //THIS FUNCTION WAS USED IN RESTART BUTTON
    //BUT SINCE WE HAVE REMOVED THE RESTART BUTTON
    //THIS FUNCTION IS ALSO OF NO USE
    //BUT STILL I AM KEEPING THIS FOR ANY FUTURE REFERENCE

    // function resetScore(){
    //     leftScore = 0;
    //     rightScore = 0;
    //     p1Score.innerText = '0';
    //     p2Score.innerText = '0';
    //     createLeftScore(leftScore);
    //     createRightScore(rightScore);
    // }
    
    //MAIN GAMING FUNCTION 
    function playGame(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // HORIZONTAL BOUNDARIES (Restart game)
        if(ball.x <= ball.radius){
            window.cancelAnimationFrame(gameId);
            gameStatus = 'disabled';
            rightScore++;   //updating score
            p2Score.innerText = rightScore;
            //If game completed open Winning message
            if(rightScore + leftScore == games){
                canvas.style.display = "none";
                if(leftScore > rightScore){
                    winner.innerText = name1;
                    opponent.innerText = name2;
                    scoreDiff.innerText = leftScore - rightScore;
                }
                else{
                    winner.innerText = name2;
                    opponent.innerText = name1;
                    scoreDiff.innerText = rightScore - leftScore;                    
                }
                message.style.display = "block";
                return;
            }
            //Else opening menuBox
            canvas.style.display = "none";
            menu.style.display = "flex";
            return;
        }
        if(ball.x >= canvas.width - ball.radius){
            window.cancelAnimationFrame(gameId);
            gameStatus = 'disabled';
            leftScore++;    //updating score
            p1Score.innerText = leftScore;
            //If game completed open Winning message
            if(rightScore + leftScore == games){
                canvas.style.display = "none";
                if(leftScore > rightScore){
                    winner.innerText = name1;
                    opponent.innerText = name2;
                    scoreDiff.innerText = leftScore - rightScore;
                }
                else{
                    winner.innerText = name2;
                    opponent.innerText = name1;
                    scoreDiff.innerText = rightScore - leftScore;                    
                }
                message.style.display = "block";
                return;
            }
            //Else opening menuBox
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
}

function formValidation(name1,name2,games){
    if(name1.length < 1 || name1.length > 16 || name2.length < 1 || name2.length > 16){
        window.alert("Player's name must have 1 to 16 characters");
        return false;
    }
    else if(games%2 == 0){
        window.alert("Number of games should be odd to avoid ties");
        return false;
    }
    else if(games > 25){
        window.alert("Number of games must be in range of 1 to 25");
        return false;
    }
    return true;
}