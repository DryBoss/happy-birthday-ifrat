export const balloonAnimation = {
  balloons: [],
  animationFrame: null,
  maxBalloons: 5,
  speed: 1.5,
  isRunning: false,

  start() {
    const canvas = document.createElement("canvas");
    canvas.id = "balloonCanvas";
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Start spawning balloons only if animation is not already running
    if (!this.isRunning) {
      this.isRunning = true;

      // Create initial balloons
      for (let i = 0; i < this.maxBalloons; i++) {
        this.balloons.push(this.createBalloon(canvas));
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.balloons.forEach((balloon, index) => {
          balloon.y -= balloon.speed; // Move balloon upwards

          // Redraw the balloon
          this.drawBalloon(ctx, balloon);

          // Respawn balloon if it moves off screen and if the animation is still running
          if (
            balloon.y + balloon.size + balloon.y + balloon.size * 1.5 + 250 <
              0 &&
            this.isRunning
          ) {
            this.balloons[index] = this.createBalloon(canvas, true);
          }
        });

        this.animationFrame = requestAnimationFrame(animate);
      };

      animate();
    }
  },

  stop() {
    // Stop the animation and prevent spawning of new balloons
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrame);
  },

  remove() {
    this.stop();
    const canvas = document.getElementById("balloonCanvas");
    if (canvas) {
      canvas.remove();
    }
    this.balloons = [];
  },

  createBalloon(canvas, respawn = false) {
    const size = Math.random() * 30 + 20;
    // Spawning outside the visible canvas area (above or below the screen)
    return {
      x: Math.random() * canvas.width,
      y: respawn ? canvas.height + size + 10 : Math.random() * -size - size, // Ensure balloon starts above or below the screen
      size,
      color: this.randomColor(),
      speed: this.speed + Math.random(),
    };
  },

  randomColor() {
    const colors = [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange",
      "pink",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  },

  drawBalloon(ctx, balloon) {
    // Save the canvas state
    ctx.save();

    // Scale vertically to create an oval shape
    ctx.translate(balloon.x, balloon.y); // Move origin to balloon center
    ctx.scale(1, 1.5); // Stretch vertically by 1.5x

    // Create a radial gradient for solid light reflection (top right)
    const gradient = ctx.createRadialGradient(
      balloon.size / 3,
      -balloon.size / 3,
      0,
      balloon.size / 3,
      -balloon.size / 3,
      balloon.size / 2
    );
    gradient.addColorStop(0, "white"); // Solid white reflection at the top right
    gradient.addColorStop(0.3, "white"); // Solid white fading a little
    gradient.addColorStop(1, balloon.color); // Balloon color at the outer edges

    // Draw the balloon body with gradient for reflection effect
    ctx.beginPath();
    ctx.arc(0, 0, balloon.size, 0, Math.PI * 2); // Balloon shape (circle)
    ctx.fillStyle = gradient; // Use the gradient as the fill style
    ctx.fill();

    // Draw the outline of the balloon
    ctx.lineWidth = 2; // Set the width of the outline
    ctx.strokeStyle = "black"; // Set the outline color
    ctx.stroke(); // Draw the outline

    // Restore canvas state to prevent the scale from affecting other objects
    ctx.restore();

    // Draw the string of the balloon
    ctx.beginPath();
    ctx.moveTo(balloon.x, balloon.y + balloon.size * 1.5); // Move to the bottom of the balloon
    ctx.lineTo(balloon.x, balloon.y + balloon.size * 1.5 + 100); // Draw the string
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  },
};
