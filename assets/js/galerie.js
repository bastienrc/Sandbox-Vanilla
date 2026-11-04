const projects = [
    {
        title: "Identité visuelle",
        category: "Design",
        description: "Création d'un univers graphique cohérent : couleurs, typographies et déclinaisons.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1100&q=85",
        url: "projets/identite-visuelle.html"
    },
    {
        title: "Carnet de voyage",
        category: "Éditorial",
        description: "Un récit illustré qui rassemble photographies, notes et découvertes.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1100&q=85",
        url: "projets/carnet-de-voyage.html"
    },
    {
        title: "Boutique en ligne",
        category: "Web",
        description: "Une expérience de navigation claire, pensée pour mettre les produits en valeur.",
        image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1100&q=85",
        url: "projets/boutique-en-ligne.html"
    },
    {
        title: "Objets du quotidien",
        category: "Design",
        description: "Recherche de formes simples et fonctionnelles pour une petite collection d'objets.",
        image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1100&q=85",
        url: "projets/objets-du-quotidien.html"
    },
    {
        title: "Série photographique",
        category: "Photo",
        description: "Une exploration photographique de la lumière, des textures et des lieux.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85",
        url: "projets/serie-photographique.html"
    },
    {
        title: "Magazine indépendant",
        category: "Éditorial",
        description: "Direction artistique et mise en page d'une publication autour de la création.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1100&q=85",
        url: "projets/magazine-independant.html"
    },
    {
        title: "Page de lancement",
        category: "Web",
        description: "Une page web responsive qui présente un service et guide vers l'action.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=85",
        url: "projets/page-de-lancement.html"
    },
    {
        title: "Fragments de nature",
        category: "Photo",
        description: "Une collection d'images consacrée aux détails et aux paysages naturels.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=85",
        url: "projets/fragments-de-nature.html"
    }
];

export function initGalerie() {

    const batchSize = 9;
    let activeCategory = "Toutes";
    let renderedCount = 0;
    let visibleProjects = [...projects];

    const gallery = document.getElementById("gallery");
    const filters = document.getElementById("filters");
    const loader = document.getElementById("loader");

    function categories() {
        return ["Toutes", ...new Set(projects.map(project => project.category))];
    }

    function renderFilters() {
        filters.innerHTML = "";
        categories().forEach(category => {
            const button = document.createElement("button");
            button.className = "filter" + (category === activeCategory ? " active" : "");
            button.type = "button";
            button.textContent = category;
            button.setAttribute("aria-pressed", String(category === activeCategory));
            button.addEventListener("click", () => {
                activeCategory = category;
                visibleProjects = category === "Toutes"
                    ? [...projects]
                    : projects.filter(project => project.category === category);
                renderedCount = 0;
                gallery.innerHTML = "";
                renderFilters();
                loadBatch();
            });
            filters.appendChild(button);
        });
    }

    function createCard(project, index) {
        const article = document.createElement("article");
        article.className = "card";

        const imageLink = document.createElement("a");
        imageLink.className = "image-link";
        imageLink.href = project.url;
        imageLink.setAttribute("aria-label", `${project.title} — ouvrir le projet`);

        const img = document.createElement("img");
        img.src = project.image;
        img.alt = project.title;
        img.loading = "lazy";
        img.decoding = "async";

        const description = document.createElement("span");
        description.className = "description";
        description.textContent = project.description;

        imageLink.append(img, description);

        const meta = document.createElement("div");
        meta.className = "card-meta";
        const category = document.createElement("span");
        category.className = "category";
        category.textContent = project.category;
        meta.appendChild(category);

        const heading = document.createElement("h2");
        const titleLink = document.createElement("a");
        titleLink.href = project.url;
        titleLink.textContent = project.title;
        heading.appendChild(titleLink);

        article.append(imageLink, meta, heading);
        return article;
    }

    function loadBatch() {
        if (!visibleProjects.length) {
            gallery.innerHTML = '<p class="empty">Aucun projet dans cette catégorie.</p>';
            loader.hidden = true;
            return;
        }

        // Le tableau est parcouru par lots ; il recommence ensuite pour créer un flux infini.
        for (let i = 0; i < batchSize; i++) {
            const project = visibleProjects[renderedCount % visibleProjects.length];
            gallery.appendChild(createCard(project, renderedCount));
            renderedCount++;
        }
        loader.hidden = false;
    }

    const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) loadBatch();
    }, { rootMargin: "500px" });

    renderFilters();
    loadBatch();
    observer.observe(loader);
    document.getElementById("year").textContent = new Date().getFullYear();

}
