class PortfolioApp {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initParticles();
      this.initMap();
      this.initLanguage();
      this.init3DAvatar();
      this.addEventListeners();
    });
  }

  // *** Particle efektų inicializavimas ***
  initParticles() {
    if (!window.THREE) {
      console.error("Three.js nerastas!");
      return;
    }

    const particleContainer = document.querySelector(".particle-canvas");
    if (!particleContainer) {
      console.error("Klaida: .particle-canvas elementas nerastas dokumente!");
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
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

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
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

  // *** Žemėlapio valdymas ***
  initMap() {
    if (!window.mapboxgl) {
      console.error("Mapbox.js nerastas!");
      return;
    }

    mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: "interactive-map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: CONFIG.INITIAL_COORDS,
      zoom: 12,
      pitch: 45,
      bearing: -17.6,
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
    const button = document.createElement("button");
    button.className = "map-3d-toggle";
    button.textContent = "3D View";
    button.onclick = () => this.toggle3DView();

    document.querySelector(".map-overlay")?.appendChild(button);
  }

  toggle3DView() {
    const currentPitch = this.map.getPitch();
    this.map.easeTo({
      pitch: currentPitch > 0 ? 0 : 60,
      duration: 2000,
    });
  }

  addLocationMarker() {
    new mapboxgl.Marker({
      color: "#00ffff",
      scale: 1.2,
    })
      .setLngLat(CONFIG.INITIAL_COORDS)
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Mano lokacija</h3>"))
      .addTo(this.map);
  }

  // *** Kalbų valdymas ***
  initLanguage() {
    this.currentLang = localStorage.getItem("portfolioLang") || "lt";
    this.applyLanguage(this.currentLang);
  }

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lt], [data-en]").forEach((el) => {
      el.textContent = el.dataset[lang];
    });
    localStorage.setItem("portfolioLang", lang);
  }

  // *** 3D Avataro valdymas ***
  async init3DAvatar() {
    try {
      if (!window.THREE || !THREE.GLTFLoader) {
        console.error("Three.js arba GLTFLoader nerastas!");
        return;
      }

      const loader = new THREE.GLTFLoader();
      loader.load("avatar.glb", (gltf) => {
        const avatarScene = gltf.scene;
        const canvas = document.querySelector(".avatar3d");
        if (!canvas) {
          console.error("Klaida: avatar3d canvas nerastas dokumente!");
          return;
        }

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height);
        camera.position.z = 2;

        scene.add(avatarScene);
        function animate() {
          requestAnimationFrame(animate);
          avatarScene.rotation.y += 0.005;
          renderer.render(scene, camera);
        }
        animate();
      });
    } catch (error) {
      console.error("Klaida įkeliant avatarą:", error);
    }
  }

  // *** Event Listeners ***
  addEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this));

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.currentLang = btn.dataset.lang;
        this.applyLanguage(this.currentLang);
      });
    });
  }

  onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}

// *** Inicijuoti aplikaciją kai užsikrauna DOM ***
new PortfolioApp();
