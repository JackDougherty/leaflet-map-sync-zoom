
var lightAll1 = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png');
var lightAll2 = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});



// UConn MAGIC WMS settings - see http://geoserver.lib.uconn.edu:8080/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage
var aerial1934 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:1934 Connecticut Aerial Photography',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '1934 <a href="http://magic.library.uconn.edu">MAGIC UConn</a> and <a href="http://cslib.org">CSL</a>'
});

var esriSatellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
   attribution: 'Tiles &copy; Esri'
});

var startZoom = 10; // initial zoom level for both maps

var map1 = L.map('map1', {
  layers: [lightAll1],
  center: [41.76, -72.67], // Hartford
  zoom: startZoom,
  minZoom: 6,
  zoomControl: false, // add later to position below geocoder
  scrollWheelZoom: false
})
// .addControl(L.mapbox.geocoderControl('mapbox.places', {
//       autocomplete: true,
//       keepOpen: true,
//       placeholder: " "
// }));

// var inputForm1 = document.querySelector('#map1 .leaflet-control-mapbox-geocoder input');
// inputForm1.placeholder='Hartford, CT';

new L.Control.Zoom({ position: 'topleft'}).addTo(map1);

var map2 = L.map('map2', {
    layers: [lightAll2],
    center: [35.22, -80.84], // Charlotte NC
    zoom: startZoom,
    minZoom: 6,
    zoomControl: false,  // add later to map in top-right
    scrollWheelZoom: false
})
// .addControl(L.mapbox.geocoderControl('mapbox.places', {
//       autocomplete: true,
//       keepOpen: true,
//       placeholder: " "
// }));

// var inputForm2 = document.querySelector('#map2 .leaflet-control-mapbox-geocoder input');
// inputForm2.placeholder='Charlotte, NC';

new L.Control.Zoom({ position: 'topleft'}).addTo(map2);

// customize source link to your GitHub repo on map1, blank prefix on map 2
map1.attributionControl.setPrefix('View  <a href="http://github.com/jackdougherty/leaflet-map-sync-zoom" target="_blank">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
map2.attributionControl.setPrefix(''); //intentionally blank to avoid redundancy

// add scales to both maps
L.control.scale().addTo(map1);
L.control.scale().addTo(map2);

// looking to optimize these sync functions, if possible, since not instantaneous
map1.on('zoomend', function(e) {
  zoomValue = map1.getZoom(),
  map2.setZoom(zoomValue);
});

map2.on('zoomend', function(e) {
  zoomValue = map2.getZoom(),
  map1.setZoom(zoomValue);
});
