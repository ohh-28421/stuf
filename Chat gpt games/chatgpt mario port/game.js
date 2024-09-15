// Get the canvas element and set its width and height
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player settings
const player = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    width: 50,
    height: 10,
    speed: 5,
    dx: 0,
};

// Bullet settings
const bullets = [];
const bulletSpeed = 7;
const bulletWidth = 5;
const bulletHeight = 20;

// Key states
const keys = {};

// Event listeners for keydown and keyup
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Function to update game elements
function update() {
    // Update player position
    player.x += player.dx;

    // Boundary detection
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Update bullets
    bullets.forEach(bullet => bullet.y -= bulletSpeed);

    // Remove bullets off-screen
    for (let i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].y < 0) bullets.splice(i, 1);
    }
}

// Function to draw game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    bullets.forEach(bullet => {
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
    });
}

// Function to handle game logic
function gameLoop() {
    if (keys['ArrowLeft']) player.dx = -player.speed;
    if (keys['ArrowRight']) player.dx = player.speed;
    if (!keys['ArrowLeft'] && !keys['ArrowRight']) player.dx = 0;
    if (keys[' ']) shootBullet();

    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Function to shoot a bullet
function shootBullet() {
    bullets.push({
        x: player.x + player.width / 2 - bulletWidth / 2,
        y: player.y,
    });
}

// Start the game loop
gameLoop();
