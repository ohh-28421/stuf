const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game Variables
const gravity = 0.5;
const mario = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    velocityY: 0,
    jumpPower: -10,
    isJumping: false
};

const keys = {};
const level = [
    '############',
    '#          #',
    '#  ####    #',
    '#          #',
    '############'
];
const tileSize = 50;

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function drawLevel() {
    for (let row = 0; row < level.length; row++) {
        for (let col = 0; col < level[row].length; col++) {
            if (level[row][col] === '#') {
                ctx.fillStyle = 'green';
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

function drawMario() {
    ctx.fillStyle = 'red';
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function applyGravity() {
    if (mario.y + mario.height < canvas.height) {
        mario.velocityY += gravity;
        mario.isJumping = true;
    } else {
        mario.velocityY = 0;
        mario.y = canvas.height - mario.height;
        mario.isJumping = false;
    }
    mario.y += mario.velocityY;
}

function detectCollisions() {
    const tileX = Math.floor(mario.x / tileSize);
    const tileY = Math.floor(mario.y / tileSize);

    if (level[tileY] && level[tileY][tileX] === '#') {
        mario.y = tileY * tileSize;
        mario.velocityY = 0;
        mario.isJumping = false;
    }
}

function update() {
    if (keys['ArrowLeft']) {
        mario.x -= mario.speed;
    }
    if (keys['ArrowRight']) {
        mario.x += mario.speed;
    }
    if (keys[' ']) {
        if (!mario.isJumping) {
            mario.velocityY = mario.jumpPower;
        }
    }

    applyGravity();
    detectCollisions();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLevel();
    drawMario();
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();