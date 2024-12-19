const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("ifrat");
const scoreElement = document.getElementById("score");
const finalScore = document.getElementById("final-score");
const backgroundMusic = document.getElementById("backgroundMusic");
const video1 = document.getElementById("dance1");
const video2 = document.getElementById("dance2");

const titleDialog = document.querySelector(".title");
const startText = document.getElementById("start-text");
const endText1 = document.getElementById("end-text-1");
const endText2 = document.getElementById("end-text-2");
const startButton = document.getElementById("start");

const objects = [
  ["./objects/momos.png", 20],
  ["./objects/fish.png", 10],
  ["./objects/fastfood.png", 10],
  ["./objects/fruits.png", -10],
  ["./objects/cat.png", -10],
];

startButton.addEventListener("click", () => {
  backgroundMusic.play();
  startGame();
});

let score = 0;

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
  let randomObject = objects[Math.floor(Math.random() * objects.length)];
  const object = document.createElement("img");
  object.src = randomObject[0];
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
      score += randomObject[1];
      scoreElement.textContent = `Score: ${score}`;
      finalScore.textContent = `you scored ${score}`;
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
  titleDialog.style.display = "none";
  startText.style.display = "none";
  startButton.style.display = "none";

  const colors = ["#FBE8E7", "#F7DDDE", "#FFC4D0"];

  colors.forEach((color, index) => {
    setTimeout(() => {
      gameArea.style.backgroundColor = color;
    }, (index + 1) * 20000);
  });

  setTimeout(() => {
    video1.play();
    video1.style.display = "inline";
  }, 69000);

  setTimeout(() => {
    video2.play();
    video2.style.display = "inline";
  }, 73000);

  setTimeout(() => {
    titleDialog.style.display = "block";
    endText1.style.display = "block";
  }, 77000);

  setTimeout(() => {
    video1.style.display = "none";
    video2.style.display = "none";
    endText2.style.display = "block";
    clearInterval(createObjectInterval);
  }, 80000);

  setTimeout(() => {
    finalScore.style.display = "block";
  }, 83000);

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
  let createObjectInterval = setInterval(() => {
    createObject();
  }, 750); // Spawn every 500ms (adjust for more/less frequency)
}
