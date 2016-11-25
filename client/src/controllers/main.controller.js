const MAP_ID = 'map';
const MAPBOX_DARK_TILEMAP = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}';
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZW1hcnMiLCJhIjoiY2l0dmpuajVxMDA1cjJ0bWw2YTR2NmVwYSJ9.JJeYzcTCnSsAXJ1Xr0zykw';
const TORONTO_COORDS = [43.653, -79.383];
const ZOOM_LEVEL = 13;

export default class MainController {
  constructor (stationsService) {
    this.map = null
    this.interval = null
    this.stationsService = stationsService

    this.createMap()
    this.loadStations()
  }

  /**
   * adds the map to the page
   */
  createMap () {
    this.map = L.map(MAP_ID).setView(TORONTO_COORDS, ZOOM_LEVEL);

    L.tileLayer(MAPBOX_DARK_TILEMAP,  {
        maxZoom: 18,
        id: 'your.mapbox.project.id',
        accessToken: MAPBOX_ACCESS_TOKEN
    }).addTo(this.map);
  }

  setStations (stations) {
    stations.data.forEach(this.addStation.bind(this))
  }

  addStation (station) {
    console.log(station)

    const stationMarkerOptions = {
      radius: 50
    }

    stationMarkerOptions.color = this.mapColor(station.numBikes / station.capacity)

    const popupContent = '<h5>' + station.name + '</h5>' 
      + '<p>' + station.numBikes + '/' + station.capacity+ ' bikes</p>';

    L.circle(station.coords, stationMarkerOptions)
      .bindPopup(popupContent)
      .addTo(this.map)
  }

  loadStations () {
    this.stationsService.getData()
      .then((stations) => {
        console.log(stations)
        this.setStations(stations)
      })
  }

  mapColor (ratio) {
    const amount = Math.floor(255.0 * ratio);
    return `rgb(${255 - amount}, ${amount}, 0)`;
  }
}

MainController.$inject = ['StationsService']
