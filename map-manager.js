class MapManager {
  constructor(token, containerId) {
    this.token = token;
    this.containerId = containerId;
    this.map = null;
  }

  initialize() {
    mapboxgl.accessToken = this.token;
    this.map = new mapboxgl.Map({
      container: this.containerId,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [25.2797, 54.6872],
      zoom: 12
    });

    this._addMarker();
  }

  _addMarker() {
    new mapboxgl.Marker({ color: '#009ffd' })
      .setLngLat([25.2797, 54.6872])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Mano lokacija</h3>"))
      .addTo(this.map);
  }
}
