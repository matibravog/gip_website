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

// --------------------hero--------------------
const hero = document.getElementById("hero");
const heroBg = document.querySelector(".hero-bg");
const rocketSection = document.getElementById("rocket-section");

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      heroBg.classList.add("hidden");
    } else {
      heroBg.classList.remove("hidden");
    }
  },
  {
    threshold: 0.1
  }
);

heroObserver.observe(hero);


/* ================= ROCKET CARDS REVEAL ================= */
const cards = document.querySelectorAll(".rocket-card");

function updateRocketCards() {
  const vh = window.innerHeight;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();

    // Zona activa real
    const visibleZoneTop = vh * 0.15;
    const visibleZoneBottom = vh * 0.85;

    const fullyVisible =
      rect.top < visibleZoneBottom &&
      rect.bottom > visibleZoneTop;

    if (fullyVisible) {
      card.classList.add("visible");
      card.classList.remove("fade-out");
    } else {
      card.classList.remove("visible");
      card.classList.add("fade-out");
    }
  });
}

window.addEventListener("scroll", updateRocketCards);
window.addEventListener("resize", updateRocketCards);
updateRocketCards();

// ------------------------FADE OUT ROCKET CARD --------------
window.addEventListener("scroll", () => {
  const viewportHeight = window.innerHeight;

  document.querySelectorAll(".rocket-card.visible").forEach(card => {
    const rect = card.getBoundingClientRect();

    const topFadeZone = viewportHeight * 0.45;
    const bottomFadeZone = viewportHeight * 0.85;

    // Si entra en la zona superior de salida
    if (rect.top < topFadeZone && rect.top > -rect.height) {
      card.classList.add("fade-out");
    }
    // Si entra en la zona inferior de salida
    else if (rect.bottom > bottomFadeZone && rect.bottom < viewportHeight + rect.height) {
      card.classList.add("fade-out");
    }
    // Zona segura: totalmente visible
    else {
      card.classList.remove("fade-out");
    }
  });
});

// ---------------------- TITULO --------------------
const rocketTitle = document.querySelector(".rocket-title");

function updateRocketCards() {
  const vh = window.innerHeight;

  document.querySelectorAll(".rocket-card").forEach(card => {
    const rect = card.getBoundingClientRect();

    const visibleZoneTop = vh * 0.15;
    const visibleZoneBottom = vh * 0.85;

    const fullyVisible =
      rect.top < visibleZoneBottom &&
      rect.bottom > visibleZoneTop;

    if (fullyVisible) {
      card.classList.add("visible");
      card.classList.remove("fade-out");
    } else {
      card.classList.remove("visible");
      card.classList.add("fade-out");
    }
  });

  // -------- ROCKET TITLE BEHAVIOR --------
  const rocketTitle = document.querySelector(".rocket-title");
  const firstCard = document.querySelector(".rocket-card");

  if (rocketTitle && firstCard) {
    const rect = firstCard.getBoundingClientRect();

    // Cuando la primera tarjeta empieza a entrar
    if (rect.top < vh * 0.65) {
      rocketTitle.classList.add("fade-out");
    } else {
      rocketTitle.classList.remove("fade-out");
    }
  }

  
}
