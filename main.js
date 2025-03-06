class PortfolioApp {
  constructor() {
    this.initParticles();
    this.initMap();
    this.initLanguage();
    this.init3DAvatar();
    this.addEventListeners();
  }

  // Particle efektų inicializavimas
  initParticles() {
    if (!window.THREE) {
      console.error('Three.js nerastas!');
      return;
    }

    const canvasContainer = document.querySelector('.particle-canvas');
    if (!canvasContainer) {
      console.error('Elementas .particle-canvas nerastas!');
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.appendChild(this.renderer.domElement);

    this.createParticles();
    this.animateParticles();
  }
  initParticles() {
    if (!window.THREE) {
        console.error('Three.js nerastas!');
        return;
    }

    const particleContainer = document.querySelector('.particle-canvas');
    if (!particleContainer) {
        console.error('Klaida: .particle-canvas elementas nerastas dokumente!');
        return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    particleContainer.appendChild(this.renderer.domElement);

    this.createParticles();
    this.animateParticles();
}


  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
    this.camera.position.z = 5;
  }

  animateParticles() {
    requestAnimationFrame(() => this.animateParticles());
    this.particles.rotation.x += 0.001;
    this.particles.rotation.y += 0.002;
    this.renderer.render(this.scene, this.camera);
  }

  // Žemėlapio valdymas
  initMap() {
    mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;
    
    this.map = new mapboxgl.Map({
      container: 'interactive-map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: CONFIG.INITIAL_COORDS,
      zoom: 12,
      pitch: 45,
      bearing: -17.6
    });

    this.addMapControls();
    this.add3DToggle();
    this.addLocationMarker();
  }

  addMapControls() {
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
  }

  add3DToggle() {
    const button = document.createElement('button');
    button.className = 'map-3d-toggle';
    button.textContent = '3D View';
    button.onclick = () => this.toggle3DView();
    
    document.querySelector('.map-overlay').appendChild(button);
  }

  toggle3DView() {
    const currentPitch = this.map.getPitch();
    this.map.easeTo({
      pitch: currentPitch > 0 ? 0 : 60,
      duration: 2000
    });
  }

  addLocationMarker() {
    new mapboxgl.Marker({
      color: '#00ffff',
      scale: 1.2
    })
      .setLngLat(CONFIG.INITIAL_COORDS)
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Mano lokacija</h3>'))
      .addTo(this.map);
  }

  // Kalbų valdymas
  initLanguage() {
    this.currentLang = localStorage.getItem('portfolioLang') || 'lt';
    this.applyLanguage(this.currentLang);
  }

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lt], [data-en]').forEach(el => {
      el.textContent = el.dataset[lang];
    });
    localStorage.setItem('portfolioLang', lang);
  }

  // 3D Avataro valdymas
  async init3DAvatar() {
    try {
      const loader = new THREE.GLTFLoader();
      this.avatar = await loader.loadAsync('avatar.glb');
      
      const canvas = document.querySelector('.avatar3d');
      const renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: true,
        antialias: true
      });
      
      const scene = this.avatar.scene;
      const camera = new THREE.PerspectiveCamera(75, canvas.width/canvas.height);
      camera.position.z = 2;
      
      const animate = () => {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.005;
        renderer.render(scene, camera);
      };
      animate();
    } catch (error) {
      console.error('Klaida įkeliant avatarą:', error);
    }
  }

  // Event listeners
  addEventListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentLang = btn.dataset.lang;
        this.applyLanguage(this.currentLang);
      });
    });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Inicijuoti aplikaciją kai užsikrauna DOM
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
