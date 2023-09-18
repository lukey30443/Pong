const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Paddle settings
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

// Ball settings
const ballSize = 10;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Paddle positions
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;

// Score variables
let playerScore = 0;
let aiScore = 0;

// Update canvas
function update() {
    moveAI();
    moveBall();
    drawCanvas();
}

// Move AI
function moveAI() {
    const aiCenter = aiY + paddleHeight / 2;
    if (aiCenter < ballY - 35) {
        aiY += paddleSpeed;
    } else if (aiCenter > ballY + 35) {
        aiY -= paddleSpeed;
    }
}

// Move ball
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        ballX < paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
        playerScore++;
    }

    if (
        ballX > canvas.width - paddleWidth &&
        ballY > aiY &&
        ballY < aiY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
        aiScore++;
    }

    // Ball out of bounds
    if (ballX < 0 || ballX > canvas.width) {
        resetBall();
    }
}

// Reset the ball
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() < 0.5 ? -5 : 5;
}

// Draw canvas
function drawCanvas() {
    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = "white";
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw scores
    ctx.font = "24px Arial";
    ctx.fillText("Player: " + playerScore, 50, 30);
    ctx.fillText("AI: " + aiScore, canvas.width - 150, 30);
}

// Initialize ball position
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
resetBall();

// Game loop
setInterval(update, 1000 / 60);
