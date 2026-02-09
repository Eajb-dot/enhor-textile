const openBtn = document.getElementById("openPatron");
  const overlay = document.getElementById("patronOverlay");
  const closeBtn = document.getElementById("closePatron");

  if (openBtn && overlay && closeBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault(); // empêche le # de remonter en haut
      overlay.classList.add("is-open");
    });

    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("is-open");
    });

    // clic en dehors de la vignette = fermer
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("is-open");
    });

    // touche ESC = fermer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") overlay.classList.remove("is-open");
    });
  } else {
    console.warn("IDs manquants : openPatronModal / patronOverlay / closePatron");
  }


