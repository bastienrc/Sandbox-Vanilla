import { home } from "../../pages/home.js";
import { statistique } from "../../pages/statistique.js";
import { router } from "./router.js";

// Routes de l'application
const routes = {
  "/": home(),
  "/statistique": statistique(),
  "/about": `<h1>À propos</h1><p>Bienvenue dans la page À propos.</p>`,
  "/contact": `<h1>Contact</h1><p>Contactez-nous ici.</p>`,
};

router(routes);
