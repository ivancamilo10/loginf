document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initScrollReveal();
    initGalleryLightbox();
    initFloatingIcons();
});

/* Scroll suave en los enlaces del menú */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({
                    top,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* Efecto reveal al hacer scroll */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback simple
        revealElements.forEach(el => el.classList.add("is-visible"));
    }
}

/* Lightbox para galería */
function initGalleryLightbox() {
    const photoCards = document.querySelectorAll(".photo-card");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    photoCards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            const caption = card.dataset.caption || card.querySelector("figcaption")?.textContent || "";

            if (img) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt || "Foto de Valentina";
                lightboxCaption.textContent = caption;
                lightbox.classList.add("active");
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        lightboxImage.src = "";
    };

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
}

/* Iconos flotando (corazones, estetoscopios, etc.) */
function initFloatingIcons() {
    const icons = ["💚", "🩺", "✨", "🎓"];

    setInterval(() => {
        const icon = document.createElement("span");
        icon.classList.add("floating-icon");
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];

        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight - 40 - Math.random() * 60;

        icon.style.left = `${startX}px`;
        icon.style.top = `${startY}px`;
        icon.style.opacity = "0";

        document.body.appendChild(icon);

        // Se elimina cuando termina la animación
        icon.addEventListener("animationend", () => {
            icon.remove();
        });
    }, 1800);
}
