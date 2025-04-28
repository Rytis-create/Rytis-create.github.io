// Language Switching
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

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Star Animation
const starBackground = document.querySelector('.star-background');

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    starBackground.appendChild(star);
}

for (let i = 0; i < 100; i++) {
    createStar();
}

document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[lang][key];
        });
    });
});
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', function() {
    const userGuess = Number(document.getElementById('guess').value);
    attempts++;

    if (userGuess === randomNumber) {
        document.getElementById('result').textContent = `Teisingai! Jūs atspėjote skaičių ${randomNumber} per ${attempts} bandymus!`;
    } else if (userGuess < randomNumber) {
        document.getElementById('result').textContent = 'Per mažai! Bandykite dar kartą.';
    } else {
        document.getElementById('result').textContent = 'Per daug! Bandykite dar kartą.';
    }
});

// Map Initialization
mapboxgl.accessToken = 'pk.eyJ1Ijoicnl0aXMxMjMiLCJhIjoiY203eDRkMXQ5MDFodzJsczZsNmhqbWw0NSJ9.M1CYVTz7inCBl3b2xLq8Ww';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [25.4167, 55.2333],
    zoom: 12
});
new mapboxgl.Marker()
    .setLngLat([25.4167, 55.2333])
    .addTo(map);
