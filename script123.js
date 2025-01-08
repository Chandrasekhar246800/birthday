// Confetti Effect
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiCount = 300;
const confetti = [];

function randomColor() {
  const colors = ['#f9ca24', '#ff6b6b', '#6ab04c', '#f95a5a', '#22a6b3'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function ConfettiParticle() {
  this.x = random(0, canvas.width);
  this.y = random(0, canvas.height);
  this.size = random(5, 10);
  this.color = randomColor();
  this.speedX = random(-2, 2);
  this.speedY = random(1, 3);
  this.opacity = random(0.5, 1);
}

ConfettiParticle.prototype.update = function() {
  this.y += this.speedY;
  this.x += this.speedX;

  if (this.y > canvas.height) {
    this.y = 0;
    this.x = random(0, canvas.width);
  }
};

ConfettiParticle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.size, this.size);
};

function setupConfetti() {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new ConfettiParticle());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < confetti.length; i++) {
    confetti[i].update();
    confetti[i].draw();
  }

  requestAnimationFrame(animateConfetti);
}

setupConfetti();
animateConfetti();