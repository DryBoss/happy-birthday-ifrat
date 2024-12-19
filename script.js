const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreElement = document.getElementById("score");
const backgroundMusic = document.getElementById("backgroundMusic");
const startButton = document.getElementById("startGame");

startButton.addEventListener("click", () => {
  backgroundMusic.play();
  startGame();
});

let score = 0;

backgroundMusic.play();

// Function to move the basket
function moveBasket(x) {
  const basketWidth = basket.offsetWidth;
  const areaWidth = gameArea.offsetWidth;
  const adjustedX = Math.min(
    Math.max(x - basketWidth / 2, 0),
    areaWidth - basketWidth
  );
  basket.style.left = `${adjustedX + basketWidth / 2}px`;
}

// Mouse movement
document.addEventListener("mousemove", (e) => {
  moveBasket(e.pageX);
});

// Touch movement
document.addEventListener("touchmove", (e) => {
  // Prevent default behavior to avoid scrolling
  e.preventDefault();
  const touch = e.touches[0]; // Get the first touch point
  moveBasket(touch.pageX);
});

// Create a single falling object
function createObject() {
  const object = document.createElement("div");
  object.classList.add("object");
  object.style.left = `${Math.random() * (gameArea.offsetWidth - 20)}px`;
  object.style.top = "0px";
  gameArea.appendChild(object);

  let fallingInterval = setInterval(() => {
    const objectTop = object.offsetTop;
    const basketRect = basket.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    // If object collides with basket
    if (
      objectRect.bottom >= basketRect.top &&
      objectRect.right >= basketRect.left &&
      objectRect.left <= basketRect.right
    ) {
      score += 10;
      scoreElement.textContent = `Score: ${score}`;
      object.remove();
      clearInterval(fallingInterval);
    } else if (objectTop > gameArea.offsetHeight) {
      // If object falls out of bounds
      object.remove();
      clearInterval(fallingInterval);
    } else {
      object.style.top = `${objectTop + 5}px`;
    }
  }, 10);
}

// Continuously spawn multiple objects at staggered intervals
setInterval(() => {
  createObject();
}, 500); // Spawn every 500ms (adjust for more/less frequency)
