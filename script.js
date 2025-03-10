document.getElementById("leftBtn").addEventListener("click", function() {
    moveCar("left");
});

document.getElementById("rightBtn").addEventListener("click", function() {
    moveCar("right");
});

// Function to move car left-right
function moveCar(direction) {
    let car = document.getElementById("playerCar");
    let position = car.getBoundingClientRect();

    if (direction === "left" && position.left > 10) {
        car.style.left = position.left - 20 + "px";
    } else if (direction === "right" && position.right < window.innerWidth - 10) {
        car.style.left = position.left + 20 + "px";
    }
}