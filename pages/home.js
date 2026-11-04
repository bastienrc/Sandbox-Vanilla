import { initGalerie } from "../assets/js/galerie.js";

export function home() {
  return {
    html: `
      <h1>Accueil</h1>
      <nav class="filters" id="filters" aria-label="Filtrer les projets"></nav>
      <section class="gallery" id="gallery" aria-label="Galerie de projets"></section>
      <div class="loader" id="loader" aria-live="polite">
        <span><i class="dot"></i> Chargement des projets...</span>
      </div>
    `,
    init: initGalerie
  };
}
