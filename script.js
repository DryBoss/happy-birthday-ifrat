import { confetti } from "./medias/confetti.js";
import { balloonAnimation } from "./medias/balloon.js";

const loading = document.getElementById("loading");
const gameArea = document.getElementById("gameArea");
const peekingIfrat = document.getElementById("peeking-ifrat");
const basket = document.getElementById("ifrat");
const reaction = document.getElementById("reaction");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
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

let time = 68;

document.addEventListener("DOMContentLoaded", () => {
  loading.style.display = "none";
  gameArea.style.display = "block";
});

const objects = [
  ["./medias/objects/momos.png", 20],
  ["./medias/objects/noodles.png", 20],
  ["./medias/objects/fish.png", 10],
  ["./medias/objects/biryani.png", 10],
  ["./medias/objects/pizza.png", 10],
  ["./medias/objects/shawarma.png", 10],
  ["./medias/objects/apple.png", -5],
  ["./medias/objects/dragonfruit.png", -5],
  ["./medias/objects/grapes.png", -5],
  ["./medias/objects/pomegranate.png", -5],
];

objects.forEach((object) => {
  const img = new Image();
  img.src = object[0];
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
      reaction.textContent = randomObject[1] > 0 ? "YUMMY!" : "EWW!";
      setTimeout(() => {
        reaction.textContent = "";
      }, 500);
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
  scoreElement.style.display = "inline";
  timerElement.style.display = "inline";
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

  setInterval(() => {
    time > 0 ? (time -= 1) : (timerElement.style.display = "none");
    timerElement.innerHTML = `Party starts in<br>${time} seconds`;
  }, 1000);

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
    endText3.style.display = "block";
    balloonAnimation.start();
  }, 83000);

  setTimeout(() => {
    peekingIfrat.style.transform = "translateX(0px)";
  }, 86000);

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
