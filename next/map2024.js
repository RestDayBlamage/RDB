var map = L.map('map', {
  closePopupOnClick: false,
  dragging: false,
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  maxZoom: 10,
  minZoom: 3
}).setView([46, 9], 5);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map);

function addGPXLayer(gpxFile, color) {
  return omnivore.gpx(gpxFile, null, L.geoJson(null, {
    style: {
      color: color,
      weight: 6,
      opacity: 0.9
    }
  })).on('ready', function() {
    this.eachLayer(function(layer) {
      layer.on('click', function() {
        map.fitBounds(layer.getBounds());
      });
    });
  }).addTo(map);
}

var gpxLayers = {
  "2022": addGPXLayer('data/2024/20240.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20241.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20242.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20243.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20244.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20245.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20246.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20247.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20248.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/20249.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/202410.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/202411.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/202412.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/202413.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/202414.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2024/202415.gpx', '#0e323a')
};

var legend = L.control({ position: 'topleft' });

legend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.style.color = 'white';
  div.style.fontWeight = 'bold';
  div.style.fontFamily = 'Arial, sans-serif';

  for (var year in gpxLayers) {
    div.innerHTML += '<i style="background:' + gpxLayers[year].options.style.color + 
      '; width: 20px; height: 8px; display: inline-block; margin-right: 5px;"></i>' +
      year + '<br>';
  }
  return div;
};
legend.addTo(map);