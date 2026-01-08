/* ================= HEADER INTERACTIONS ================= */
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});


/* ================= INTRO PARALLAX ================= */
const introSection = document.getElementById("intro-parallax");
const bgImage = document.querySelector(".intro-bg");

function updateIntroParallax() {
  if (!introSection || !bgImage) return;

  const vh = window.innerHeight;
  const scrollY = window.scrollY;
  const start = introSection.offsetTop;
  const distance = vh * 1.5;

  let progress = (scrollY - start) / distance;
  progress = Math.min(Math.max(progress, 0), 1);

  const scale = 1 + progress * 0.9;
  const blur = progress * 12;

  bgImage.style.transform = `scale(${scale})`;
  bgImage.style.filter = `blur(${blur}px)`;
}

window.addEventListener("scroll", updateIntroParallax);
window.addEventListener("resize", updateIntroParallax);
updateIntroParallax();


// ocultar texto 
const introContent = document.querySelector(".intro-content");

if (introContent) {
  const introTop = introSection.offsetTop;
  const introHeight = introSection.offsetHeight;
  const vh = window.innerHeight;

  const insideIntro =
    window.scrollY < introTop + introHeight - vh;

  introContent.classList.toggle("intro-hidden", !insideIntro);
}

/* ================= ROCKET CHARTS ================= */
document.querySelectorAll(".rocket-chart").forEach(canvas => {
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.strokeStyle = "#4cc9f0";
  ctx.lineWidth = 2;
  ctx.beginPath();

  if (canvas.dataset.chart === "parabola") {
    for (let x = 0; x < canvas.width; x++) {
      const y = -(-0.015 * (x - canvas.width / 2) ** 2 + canvas.height * 0.8) + 100;
      ctx.lineTo(x, y);
    }
  }

  if (canvas.dataset.chart === "velocity") {
    let y = canvas.height;
    for (let x = 0; x < canvas.width; x += 10) {
      y -= Math.exp(x / 120) * Math.random();
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
});


/* ================= ROCKET CARDS + TITLE ================= */
const cards = document.querySelectorAll(".rocket-card");
const rocketTitle = document.querySelector(".rocket-title");

function updateRocketCards() {
  const vh = window.innerHeight;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const visibleTop = vh * 0.15;
    const visibleBottom = vh * 0.85;

    const visible =
      rect.top < visibleBottom &&
      rect.bottom > visibleTop;

    card.classList.toggle("visible", visible);
    card.classList.toggle("fade-out", !visible);
  });

  // ---- TÍTULO ----
  if (rocketTitle && cards.length) {
    const firstRect = cards[0].getBoundingClientRect();
    rocketTitle.classList.toggle("fade-out", firstRect.top < vh * 0.65);
  }
}

window.addEventListener("scroll", updateRocketCards);
window.addEventListener("resize", updateRocketCards);
updateRocketCards();


/* ================= ABOUT REVEAL ================= */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle(
        "reveal-visible",
        entry.isIntersecting
      );
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".reveal-title, .reveal-text")
  .forEach(el => revealObserver.observe(el));
