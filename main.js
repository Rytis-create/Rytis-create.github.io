// Particle efektas su Three.js
function initParticles() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.particle-canvas').appendChild(renderer.domElement);

    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({ size: 0.005 });
    const particleMesh = new THREE.Points(particles, material);
    scene.add(particleMesh);
    camera.position.z = 2;

    function animate() {
        requestAnimationFrame(animate);
        particleMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();
}

// Kalbos perjungimas
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.documentElement.lang = btn.dataset.lang;
        document.querySelectorAll('[data-lt], [data-en]').forEach(el => {
            el.textContent = el.dataset[btn.dataset.lang];
        });
    });
});

// Mapbox žemėlapis
mapboxgl.accessToken = 'pk.eyJ1Ijoicnl0aXMxMjMiLCJhIjoiY203eDRkMXQ5MDFodzJsczZsNmhqbWw0NSJ9.M1CYVTz7inCBl3b2xLq8Ww';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [25.279651, 54.687157], // Vilniaus koordinatės
    zoom: 12
});
// Papildomas žemėlapio funkcionalumas
function initMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [25.279651, 54.687157],
        zoom: 12,
        pitch: 45, // 3D efektas
        bearing: -17.6
    });

    // 3D perjungimas
    document.querySelector('.map-3d-toggle').addEventListener('click', () => {
        const pitch = map.getPitch() === 0 ? 45 : 0;
        map.easeTo({ pitch, duration: 1000 });
    });

    // Markeris su popup
    new mapboxgl.Marker({ color: '#0ff' })
        .setLngLat([25.279651, 54.687157])
        .setPopup(new mapboxgl.Popup().setHTML("<h3>Mano lokacija</h3>"))
        .addTo(map);
}

// Inicijuoti žemėlapį po puslapio užkrovimo
window.addEventListener('load', initMap);
