const STORAGE_KEY = "selected-theme";

export function initThemeSwitcher() {
  const toggle = document.querySelector("#theme-toggle");
  const menu = document.querySelector("#theme-menu");
  const label = document.querySelector("#theme-label");
  const container = document.querySelector(".theme-switcher");

  if (!toggle || !menu || !label || !container) return;

  // Découvrir les thèmes depuis les feuilles CSS
  function getThemes() {
    const themes = [
      { id: "dark", name: "Dark" }
    ];

    function scan(sheet) {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSImportRule) {
          try {
            scan(rule.styleSheet);
          } catch (error) {
            console.warn("Import inaccessible :", error);
          }
          continue;
        }

        if (!(rule instanceof CSSStyleRule)) continue;

        const match = rule.selectorText.match(
          /^\[data-theme="([^"]+)"\]$/
        );

        if (!match) continue;

        const id = match[1];

        themes.push({
          id,
          name: id.split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        });
      }
    }

    for (const sheet of document.styleSheets) {
      try {
        scan(sheet);
      } catch (error) {
        console.warn("Feuille inaccessible :", sheet.href, error);
      }
    }

    return [...new Map(themes.map(theme => [theme.id, theme])).values()];
  }


  // Lire les couleurs calculées du thème
  function getColors(id) {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-theme");

    if (id === "dark") {
      root.removeAttribute("data-theme");
    } else {
      root.dataset.theme = id;
    }

    const styles = getComputedStyle(root);

    const colors = [
      "--color-bg",
      "--color-primary",
      "--color-secondary",
      "--color-accent"
    ].map(variable => styles.getPropertyValue(variable).trim());

    // Restaurer le thème précédent
    if (previousTheme === null) {
      root.removeAttribute("data-theme");
    } else {
      root.dataset.theme = previousTheme;
    }

    return colors;
  }

  const themes = getThemes();

  // Construire le menu
  themes.forEach(theme => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-option";
    button.dataset.theme = theme.id;

    const name = document.createElement("span");
    name.textContent = theme.name;

    const colors = document.createElement("span");
    colors.className = "theme-colors";

    getColors(theme.id).forEach(color => {
      const swatch = document.createElement("span");
      swatch.style.backgroundColor = color;
      colors.appendChild(swatch);
    });

    button.append(name, colors);

    button.addEventListener("click", () => {
      applyTheme(theme.id);
      closeMenu();
    });

    menu.appendChild(button);
  });

  function applyTheme(id) {
    if (!themes.some(theme => theme.id === id)) {
      id = "dark";
    }

    if (id === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset.theme = id;
    }

    const theme = themes.find(theme => theme.id === id);

    label.textContent = theme.name;

    menu.querySelectorAll(".theme-option").forEach(button => {
      button.setAttribute(
        "aria-pressed",
        button.dataset.theme === id
      );
    });

    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (error) {
      console.warn("Impossible de sauvegarder le thème.", error);
    }
  }

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    menu.hidden ? openMenu() : closeMenu();
  });

  document.addEventListener("click", event => {
    if (!container.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem(STORAGE_KEY) || "dark";
  } catch (error) {
    console.warn("Impossible de récupérer le thème.", error);
  }

  applyTheme(savedTheme);
}
