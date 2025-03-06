class CVApp {
    constructor() {
        this.translations = {
            lt: {
                name: "RYTIS ALIŠAUSKAS",
                experience: "PATIRTIS",
                education: "ŠVIETIMAS",
                download: "📥 Parsisiųsti CV"
            },
            en: {
                name: "RYTIS ALIŠAUSKAS",
                experience: "EXPERIENCE",
                education: "EDUCATION",
                download: "📥 Download CV"
            }
        };

        // Inicializuoti komponentus
        this.initStars();
        this.initMap();
        this.initLanguageSwitcher();
        this.initScrollAnimations();
    }

    // ----------------------------------------
    // Žvaigždžių fonas
    // ----------------------------------------
    initStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'star-background';
        document.body.prepend(starsContainer);

        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            starsContainer.appendChild(star);
        }
    }

    // ----------------------------------------
    // Žemėlapis
    // ----------------------------------------
    initMap() {
        mapboxgl.accessToken = 'JŪSŲ_MAPBOX_TOKENAS'; // ❗ Pakeisti čia
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [25.2797, 54.6872],
            zoom: 12
        });

        // Žymeklis
        new mapboxgl.Marker({ color: '#009ffd' })
            .setLngLat([25.2797, 54.6872])
            .setPopup(new mapboxgl.Popup().setHTML("<h3>Mano lokacija</h3>"))
            .addTo(this.map);
    }

    // ----------------------------------------
    // Kalbų keitimas
    // ----------------------------------------
    initLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Pašalinti aktyvų klasę visiems
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                // Pridėti aktyvų klasę paspaustam
                e.target.classList.add('active');
                // Keisti kalbą
                this.updateUIText(e.target.dataset.lang);
            });
        });
    }

    updateUIText(lang) {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            el.textContent = this.translations[lang][key];
        });
    }

    // ----------------------------------------
    // Scroll animacijos
    // ----------------------------------------
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    }
}

// Paleisti aplikaciją
document.addEventListener('DOMContentLoaded', () => new CVApp());
