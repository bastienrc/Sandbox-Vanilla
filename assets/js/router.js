export function router(routes) {
  // Fonction pour naviguer vers une nouvelle page
  function navigateTo(url) {
    // Change l'URL et ajoute une nouvelle entrée dans l'historique
    window.history.pushState({ page: url }, "", url);
    renderPage(url);
  }

  // Fonction pour afficher la page en fonction de l'URL
  function renderPage(url) {
    const view = routes[url] || `<h1>404</h1><p>Page non trouvée</p>`;

    // Vider le contenu existant
    const app = document.getElementById("app");
    // app.innerHTML = ""; // Vider le contenu de l'élément parent pour éviter la réutilisation des anciens enfants

    // Créer un nouvel élément avec le contenu de la route
    // const div = document.createElement("div");
    // div.innerHTML = view;

    // Ajouter le nouvel élément au DOM
    // app.appendChild(div);
    app.innerHTML = view;
  }

  // Gestion de l'événement popstate
  window.addEventListener("popstate", (event) => {
    const state = event.state;
    renderPage(state ? state.page : "/");
  });

  // Exemple d'utilisation
  document.querySelector("nav").addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      navigateTo(e.target.getAttribute("href"));
    }
  });

  navigateTo("/");
}
