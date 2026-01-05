
/* ================= HERO ROCKET SCROLL ANIMATION ================= */


const hero = document.getElementById("hero");
const sticky = hero.querySelector(".hero-sticky");
const rocket = document.getElementById("rocket");
const parachute = document.getElementById("parachute");
const cansat = document.getElementById("cansat");
const heroText = document.querySelector(".hero-text");


function updateRocket() {
  const heroRect = hero.getBoundingClientRect();
  const scrollRange = hero.offsetHeight - sticky.offsetHeight;

  const t = Math.min(
    Math.max(-heroRect.top / scrollRange, 0),
    1
  );

  const W = sticky.offsetWidth;
  const H = sticky.offsetHeight;

  const marginX = W * 0.08;
  const groundY = H * 0.82;

  /* ================= COHETE ================= */

  const xStart = marginX;
  const xEnd = W - marginX;
  const x = xStart + t * (xEnd - xStart);

  const parabola = 4 * t * (1 - t);
  const maxHeight = H * 0.6;

  let y = groundY - parabola * maxHeight;

  /* Orientación según fase */
  let rotation;

  if (t < 0.5) {
    // Ascenso
    rotation = t * 70 - 35;
  } else {
    // Transición suave a vertical
    const descendT = Math.min((t - 0.5) / 0.3, 1);
    rotation = 0 * descendT;
  }


  rocket.style.transform = `
    translate(${x}px, ${y}px)
    rotate(${rotation}deg)
  `;

/* ================= CANSAT ================= */

/* ================= CANSAT ================= */

if (t > 0.5) {
  const releaseT = Math.min((t - 0.5) / 0.5, 1);

  // Se queda atrás en X (pierde velocidad horizontal)
  const cansatX = x - releaseT * W * 0.15;

  // MISMA caída vertical que el cohete
  const cansatY = y;

  cansat.style.opacity = 1;
  cansat.style.transform = `
    translate(${cansatX}px, ${cansatY}px)
  `;
} else {
  cansat.style.opacity = 0;
}




  /* ================= PARACHUTE ================= */

  if (t > 0.55) {
    const deployT = Math.min((t - 0.55) / 0.25, 1);

    // Apertura progresiva (no lineal)
    const scaleX = deployT;
    const scaleY = Math.min(deployT * 1.3, 1);

    parachute.style.opacity = deployT;

    parachute.style.transform = `
      translate(${x - 40}px, ${y - 50}px)
      scale(${scaleX}, ${scaleY})
    `;
  } else {
    parachute.style.opacity = 0;
  }

}


// Inicializar bien (MUY importante)
updateRocket();

window.addEventListener("scroll", updateRocket);
window.addEventListener("resize", updateRocket);
