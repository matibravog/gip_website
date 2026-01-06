/* ================= HEADER INTERACTIONS ================= */
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Background blur on scroll
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close menu when clicking a link (UX PRO)
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

/* ================= HERO ================= */
const heroText = document.querySelector(".hero-text");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  heroText.style.transform = `translateY(${scrollY * 0.15}px)`;
});

// --------------------------------------------
document.querySelectorAll(".rocket-chart").forEach(canvas => {
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.strokeStyle = "#4cc9f0";
  ctx.lineWidth = 2;
  ctx.beginPath();

  if (canvas.dataset.chart === "parabola") {
    for (let x = 0; x < canvas.width; x++) {
      const y = -0.015 * (x - canvas.width/2) ** 2 + canvas.height * 0.8;
      ctx.lineTo(x, y);
    }
  }

  if (canvas.dataset.chart === "velocity") {
    let y = canvas.height;
    for (let x = 0; x < canvas.width; x += 10) {
      y -= Math.random() * 4;
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
});
