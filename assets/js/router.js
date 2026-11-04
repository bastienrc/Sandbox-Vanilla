export function router(routes) {

  // Détection automatique de la racine
  const BASE_URL = new URL(".", document.baseURI).pathname;

  // Construire une URL publique
  function getUrl(path) {
    return BASE_URL + path.replace(/^\/+/, "");
  }

  // Normaliser une URL en route interne
  function normalizeUrl(url) {
    const pathname = new URL(url, window.location.href).pathname;

    const path = pathname.startsWith(BASE_URL)
      ? pathname.slice(BASE_URL.length)
      : pathname;

    return "/" + path.replace(/^\/+/, "");
  }

  // Afficher une page
  function renderPage(route) {
    const page = routes[route];

    const html = typeof page === "string"
      ? page
      : page?.html ?? "<h1>404</h1><p>Page non trouvée</p>";

    document.getElementById("app").innerHTML = html;

    if (typeof page === "object") {
      page.init?.();
    }
  }

  // Naviguer
  function navigateTo(url) {
    const route = normalizeUrl(url);

    window.history.pushState({ page: route }, "", getUrl(route));
    renderPage(route);
  }

  // Gérer précédent / suivant
  window.addEventListener("popstate", () => {
    renderPage(normalizeUrl(window.location.href));
  });

  // Intercepter les liens du menu
  document.querySelector("nav").addEventListener("click", (e) => {
    const link = e.target.closest("a");

    if (!link) return;

    e.preventDefault();
    navigateTo(link.href);
  });

  // Afficher la page correspondant à l'URL actuelle
  renderPage(normalizeUrl(window.location.href));
}
