// Kalbos perjungimas
const translations = {
    lt: {
        name: "RYTIS ALIŠAUSKAS",
        tagline: "Programuotojas | Web kūrėjas",
        download: "📥 Parsisiųsti CV",
        about: "Apie mane",
        aboutText: "Esu programuotojas iš Lietuvos...",
        projects: "Projektai",
        project1: "Portfolio puslapis",
        project1Desc: "Šis portfolio puslapis...",
        viewProject: "Žiūrėti projektą",
        skills: "Įgūdžiai",
        html: "HTML",
        css: "CSS",
        js: "JavaScript",
        contact: "Kontaktai",
        send: "Siųsti"
    },
    en: {
        name: "RYTIS ALIŠAUSKAS",
        tagline: "Programmer | Web Developer",
        download: "📥 Download CV",
        about: "About Me",
        aboutText: "I am a programmer from Lithuania...",
        projects: "Projects",
        project1: "Portfolio Website",
        project1Desc: "This portfolio website...",
        viewProject: "View Project",
        skills: "Skills",
        html: "HTML",
        css: "CSS",
        js: "JavaScript",
        contact: "Contact",
        send: "Send"
    }
};

document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[lang][key];
        });
    });
});

// Žemėlapis
mapboxgl.accessToken = 'pk.eyJ1Ijoicnl0aXMxMjMiLCJhIjoiY203eDRkMXQ5MDFodzJsczZsNmhqbWw0NSJ9.M1CYVTz7inCBl3b2xLq8Ww';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [25.4167, 55.2333], // Lietuvos koordinatės
    zoom: 12
});
new mapboxgl.Marker()
    .setLngLat([25.4167, 55.2333])
    .addTo(map);
