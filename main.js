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
mapboxgl.accessToken = 'pk.eyJ1Ijoicnl0aXMxMjMiLCJhIjoiY203eDNtdjJuMDFjdjJrcGU1M2Flc2p0ciJ9.5FUpYxv-LQUFSexPW_mCSw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [25.279651, 54.687157], // Vilniaus koordinatės
    zoom: 12
});
