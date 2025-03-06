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

        this.initMap();
        this.initLanguageSwitcher();
        this.initScrollAnimations();
    }

    // Žemėlapio inicializavimas
    initMap() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoicnl0aXMxMjMiLCJhIjoiY203eDRkMXQ5MDFodzJsczZsNmhqbWw0NSJ9.M1CYVTz7inCBl3b2xLq8Ww';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [25.2797, 54.6872],
            zoom: 12
        });

        new mapboxgl.Marker({ color: '#009ffd' })
            .setLngLat([25.2797, 54.6872])
            .setPopup(new mapboxgl.Popup().setHTML("<h3>Mano lokacija</h3>"))
            .addTo(this.map);
    }

    // Kalbų keitimo logika
    initLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.updateUIText(lang);
            });
        });
    }

    // UI teksto atnaujinimas
    updateUIText(lang) {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            el.textContent = this.translations[lang][key];
        });
    }

    // Scroll animacijos
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        });

        document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    }
}

// Paleisti aplikaciją
document.addEventListener('DOMContentLoaded', () => new CVApp());
