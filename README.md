# Sandbox Vanilla

Retour au source avec HTML, CSS et JavaScript.

- Page Home: Ajout d'une galerie infinie de projets
- Page Statistique:
  - 3 pie-charts
  - 1 github-contribution-graph

## Architecture : pages modulaires et initialisation

```mermaid
flowchart TD
    A["app.js"] --> B["router.js"]
    A --> C["home.js"]
    C --> D["Import CSS"]
    C --> E["Import initPieCharts()"]
    C --> F["Retourne un objet"]
    F --> G["html : contenu HTML"]
    F --> H["init : fonction d'initialisation"]

    B --> I["navigateTo()"]
    I --> J["renderPage()"]
    J --> K["Injection dans #app"]
    K --> L["Appel de init()"]
    L --> M["Initialisation des graphiques"]

    style B fill:#dceeff,stroke:#3984c6,color:#16324f
    style C fill:#e5f5e5,stroke:#479447,color:#183d18
    style M fill:#fff0d9,stroke:#d99a36,color:#573800
```

### Le principe à retenir

| Élément         | Responsabilité                         |
| --------------- | -------------------------------------- |
| `app.js`        | Déclare les pages et lance le routeur  |
| `router.js`     | Gère la navigation et l'affichage      |
| `home.js`       | Fournit le HTML et ses initialisations |
| `pie-charts.js` | Contient la logique des graphiques     |


### Exemple de contrat entre une page et le routeur

```js
// home.js
export function home() {
  return {
    html: `<h1>Accueil</h1>`,
    init: initPieCharts
  };
}
```

Le routeur ne connaît que deux propriétés :
  - `html` : ce qu'il doit afficher.
  - `init` : ce qu'il doit exécuter après l'injection dans le DOM.

La règle d'or : une page est responsable de ses fonctionnalités. Le routeur est responsable de leur affichage, pas de leur fonctionnement interne.
