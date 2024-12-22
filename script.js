import { confetti } from "./medias/confetti.js";
import { balloonAnimation } from "./medias/balloon.js";

const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("ifrat");
const scoreElement = document.getElementById("score");
const backgroundMusic = document.getElementById("backgroundMusic");
const video1 = document.getElementById("dance1");
const video2 = document.getElementById("dance2");
const video3 = document.getElementById("dance3");
const video4 = document.getElementById("dance4");

const titleDialog = document.querySelector(".title");
const startText = document.getElementById("start-text");
const cakeIcon = document.getElementById("cake");
const endText1 = document.getElementById("end-text-1");
const endText2 = document.getElementById("end-text-2");
const endText3 = document.getElementById("end-text-3");
const startButton = document.getElementById("start");

const objects = [
  ["./medias/objects/momos.png", 20],
  ["./medias/objects/fish.png", 10],
  ["./medias/objects/fastfood.png", 10],
  ["./medias/objects/fruits.png", -10],
  ["./medias/objects/cat.png", -10],
];

objects.forEach((object) => {
  const img = new Image();
  img.src = object[1];
});

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

  const colors = [
    ["#ffc2d1", 18000],
    ["#ffb3c6", 34000],
    ["#ff8fab", 52000],
    ["#fb6f92", 69000],
  ];

  colors.forEach((color) => {
    setTimeout(() => {
      gameArea.style.backgroundColor = color[0];
    }, color[1]);
  });

  setTimeout(() => {
    video1.play();
    video1.style.display = "inline";
  }, 69000);

  setTimeout(() => {
    video2.play();
    video2.style.display = "inline";
  }, 71000);

  setTimeout(() => {
    video3.play();
    video3.style.display = "inline";
  }, 73000);

  setTimeout(() => {
    video4.play();
    video4.style.display = "inline";
  }, 75000);

  setTimeout(() => {
    basket.style.display = "none";
    confetti.start();
    titleDialog.style.display = "flex";
    cakeIcon.style.display = "block";
    endText1.style.display = "block";
  }, 77000);

  setTimeout(() => {
    endText2.style.display = "block";
    clearInterval(createObjectInterval);
  }, 80000);

  setTimeout(() => {
    balloonAnimation.start();
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
