/* =========================
   MODELES : Carrousel + lignes (2 colonnes)
   - click sur une thumb => ouvre une ligne (photo gauche / texte droite)
   - pedales prev/next => scroll du carrousel
   ========================= */

const thumbs = Array.from(document.querySelectorAll(".thumb"));
const track = document.getElementById("track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const lines = Array.from(document.querySelectorAll(".line")); // line-p1, line-p2, line-p3...

function hideAllLines() {
  lines.forEach((l) => (l.hidden = true));
}

function setActiveThumb(activeEl) {
  thumbs.forEach((t) => t.classList.remove("is-active"));
  activeEl.classList.add("is-active");
}

function openLineFromThumb(thumb) {
  const id = thumb.dataset.id;       // ex: "p1"
  const full = thumb.dataset.full;   // ex: "Stretch_swim_photo.png"
  const title = thumb.dataset.title; // ex: "Modèle 1 — Stretch Swim"
  const text = thumb.dataset.text;   // description

  const line = document.getElementById(`line-${id}`);
  if (!line) return;

  // Remplit la ligne
  const img = line.querySelector(".line-photo");
  const h3 = line.querySelector(".line-title");
  const p = line.querySelector(".line-text");

   // Titre
   if (h3) h3.textContent = title || "";

    if (p) {
        const raw = text || "";
        const html = raw.replace(/\\n/g, "<br>");
        p.innerHTML = html;
    }
    // Image (fallback si data-full vide)
if (img) img.src = full || thumb.src;
  // Ouvre la bonne ligne, ferme les autres
  hideAllLines();
  line.hidden = false;

  // Active la thumb
  setActiveThumb(thumb);

  // Scroll doux vers la ligne ouverte (optionnel mais agréable)
  line.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Click sur une thumb => ouvre la ligne correspondante
thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => openLineFromThumb(thumb));
});

// Boutons "Fermer"
document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    hideAllLines();
    // optionnel : on enlève l'actif
    thumbs.forEach((t) => t.classList.remove("is-active"));
  });
});

// Pedales / carrousel
if (prevBtn && track) {
  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -220, behavior: "smooth" });
  });
}
if (nextBtn && track) {
  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: 220, behavior: "smooth" });
  });
}

// Optionnel : au chargement, aucune ligne ouverte
hideAllLines();
