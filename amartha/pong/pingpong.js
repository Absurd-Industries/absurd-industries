const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paddleHitSound = new Audio('paddle_hit.wav');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();

window.addEventListener('resize', () => {
    setCanvasSize();
    draw();
});

const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 150;
const BALL_RADIUS = 10;
const MIN_BALL_SPEED = 3;
const BALL_ENTRANCE_ANIMATION_DURATION = 60;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
let ballEntranceAnimationProgress = BALL_ENTRANCE_ANIMATION_DURATION;

let paddle1Y = (canvas.height - PADDLE_HEIGHT) / 2;
let paddle2Y = (canvas.height - PADDLE_HEIGHT) / 2;

let player1Score = 0;
let player2Score = 0;

let amarthaTargetY = paddle2Y;
let amarthaUpdateInterval = 10;
let amarthaCurrentInterval = 0;

canvas.addEventListener('mousemove', (evt) => {
    const mouseY = evt.clientY - canvas.getBoundingClientRect().top;
    paddle1Y = mouseY - (PADDLE_HEIGHT / 2);
});

function playBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
  
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
  
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  
    oscillator.start(audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    oscillator.stop(audioContext.currentTime + 0.2);
  }
  


function handlePaddleCollision(paddleY) {
    const deltaY = ballY - (paddleY + PADDLE_HEIGHT / 2);
    ballSpeedY = deltaY * 0.3;
    ballSpeedX = -ballSpeedX;
  
    // Ensure the ball speed doesn't go below the minimum speed
    if (Math.abs(ballSpeedX) < MIN_BALL_SPEED) {
      ballSpeedX = MIN_BALL_SPEED * Math.sign(ballSpeedX);
    }
    if (Math.abs(ballSpeedY) < MIN_BALL_SPEED) {
      ballSpeedY = MIN_BALL_SPEED * Math.sign(ballSpeedY);
    }
  
    // Play sound
    playBeep();
  }
  

function drawBackground() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPaddle(x, y, collided) {
    ctx.fillStyle = collided ? '#FFA500' : '#FFF';
    ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawBall(x, y, entranceProgress) {
    const progress = Math.min(1, 1 - entranceProgress / BALL_ENTRANCE_ANIMATION_DURATION);
    const radius = BALL_RADIUS * progress;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF';
    ctx.fill();
}

function drawScore() {
    ctx.font = '24px monospace';
    ctx.fillStyle = '#FFF';
    ctx.fillText(`Human: ${player1Score}`, canvas.width / 4, 30);
    ctx.fillText(`Amartha: ${player2Score}`, (canvas.width / 4) * 3, 30);
}

function draw() {
    drawBackground();
    drawPaddle(0, paddle1Y, ballX < PADDLE_WIDTH && ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT);
    drawPaddle(canvas.width - PADDLE_WIDTH, paddle2Y, ballX > canvas.width - PADDLE_WIDTH * 2 && ballY > paddle2Y && ballY < paddle2Y+ PADDLE_HEIGHT);
    drawBall(ballX, ballY, ballEntranceAnimationProgress);
    drawScore();
}

function calculateBallSpeedY(paddleY) {
    const relativeIntersectY = (paddleY + PADDLE_HEIGHT / 2) - ballY;
    const normalizedIntersectY = relativeIntersectY / (PADDLE_HEIGHT / 2);
    const MAX_BOUNCE_ANGLE = Math.PI / 4;
    const newBallSpeedY = ballSpeedX * Math.tan(MAX_BOUNCE_ANGLE * normalizedIntersectY);
    return newBallSpeedY;
}

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX < PADDLE_WIDTH && ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
        ballSpeedY = calculateBallSpeedY(paddle1Y);
        handlePaddleCollision(paddle1Y);
    }

    if (ballX > canvas.width - PADDLE_WIDTH * 2 && ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
        ballSpeedY = calculateBallSpeedY(paddle2Y);
        handlePaddleCollision(paddle2Y);
    }

    if (ballX < 0) {
        player2Score++;
        resetBall();
    } else if (ballX > canvas.width) {
        player1Score++;
        resetBall();
    }
}

function updateAmartha() {
    if (amarthaCurrentInterval++ >= amarthaUpdateInterval) {
        amarthaCurrentInterval = 0;
        amarthaTargetY = ballY + (Math.random() * 2 - 1) * 40;
    }

    const AMARTHA_PERSONALITY = 0.1;
    paddle2Y += (amarthaTargetY - paddle2Y) * AMARTHA_PERSONALITY;

    paddle2Y = Math.max(Math.min(paddle2Y, canvas.height - PADDLE_HEIGHT), 0);
}

function update() {
    updateBall();
    updateAmartha();

    if (ballEntranceAnimationProgress > 0) {
        ballEntranceAnimationProgress--;
    }
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() * 6 - 3;
    ballEntranceAnimationProgress = BALL_ENTRANCE_ANIMATION_DURATION;
}

