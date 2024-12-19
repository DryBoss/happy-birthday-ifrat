const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("ifrat");
const scoreElement = document.getElementById("score");
const backgroundMusic = document.getElementById("backgroundMusic");
const startButton = document.getElementById("start");

const objects = [
  ["./objects/momos.png", 20],
  ["./objects/momos.png", 10],
  ["./objects/momos.png", 10],
  ["./objects/momos.png", 10],
  ["./objects/momos.png", 5],
  ["./objects/momos.png", 5],
  ["./objects/momos.png", 5],
  ["./objects/momos.png", -5],
  ["./objects/apple.png", -10],
  ["./objects/cat.png", -20],
];

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

// Create a single falling object
function createObject() {
  let randomObject = Math.floor(Math.random() * objects.length);
  const object = document.createElement("img");
  object.classList.add("object");
  object.style.left = `${Math.random() * (gameArea.offsetWidth - 20)}px`;
  object.style.top = "0px";
  object.style.width = "20px";
  object.style.height = "20px";
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
      score += objects[randomObject][1];
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

function startGame() {
  //hide start button
  startButton.style.display = "none";

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

  // Continuously spawn multiple objects at staggered intervals
  setInterval(() => {
    createObject();
  }, 500); // Spawn every 500ms (adjust for more/less frequency)
}
