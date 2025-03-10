const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// Load Images
const playerCar = new Image();
playerCar.src = "assets/player_car.png";

const enemyCar = new Image();
enemyCar.src = "assets/enemy_car.png";

const crashedCar = new Image();
crashedCar.src = "assets/crashed_car.png";

const roadImg = new Image();
roadImg.src = "assets/road.png";

const trafficLight = new Image();
trafficLight.src = "assets/traffic_light.png";

const roadBarrier = new Image();
roadBarrier.src = "assets/road_barrier.png";

const trees = new Image();
trees.src = "assets/trees.png";

const pedestrianCrossing = new Image();
pedestrianCrossing.src = "assets/pedestrian_crossing.png";

// Game Objects
let car = { x: 175, y: 500, width: 50, height: 80, speed: 0 };
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let traffic = [];
let barriers = [{ x: 100, y: -150 }, { x: 250, y: -300 }];
let score = 0;

// Handle Key Events
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Generate Traffic Cars
function createTraffic() {
    for (let i = 0; i < 5; i++) {
        traffic.push({ x: Math.random() * 350, y: i * -200, width: 50, height: 80, speed: 2 });
    }
}

// Update Game Logic
function update() {
    // Car controls
    if (keys.ArrowUp) car.speed = Math.min(car.speed + 0.1, 5);
    if (keys.ArrowDown) car.speed = Math.max(car.speed - 0.1, -2);
    if (keys.ArrowLeft) car.x = Math.max(car.x - 3, 0);
    if (keys.ArrowRight) car.x = Math.min(car.x + 3, canvas.width - car.width);

    car.y -= car.speed; // Move car

    // Update traffic
    for (let t of traffic) {
        t.y += t.speed;
        if (t.y > canvas.height) {
            t.y = -200;
            t.x = Math.random() * 350;
            score += 10;
        }

        // Collision Detection with Traffic
        if (
            car.x < t.x + t.width &&
            car.x + car.width > t.x &&
            car.y < t.y + t.height &&
            car.y + car.height > t.y
        ) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }
    }

    // Update barriers
    for (let b of barriers) {
        b.y += 2;
        if (b.y > canvas.height) {
            b.y = -300;
            b.x = Math.random() * 350;
        }
    }

    requestAnimationFrame(update);
}

// Draw Game Elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Road
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);

    // Draw Traffic Lights
    ctx.drawImage(trafficLight, 150, 10, 100, 50);

    // Draw Trees
    ctx.drawImage(trees, 0, 50, 50, 500);
    ctx.drawImage(trees, 350, 50, 50, 500);

    // Draw Pedestrian Crossing
    ctx.drawImage(pedestrianCrossing, 100, 300, 200, 40);

    // Draw Car
    ctx.drawImage(playerCar, car.x, car.y, car.width, car.height);

    // Draw Traffic Cars
    for (let t of traffic) {
        ctx.drawImage(enemyCar, t.x, t.y, t.width, t.height);
    }

    // Draw Barriers
    for (let b of barriers) {
        ctx.drawImage(roadBarrier, b.x, b.y, 50, 50);
    }

    // Display Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(draw);
}

// Start Game
createTraffic();
update();
draw();