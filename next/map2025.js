var map = L.map('map', {
  closePopupOnClick: false,
  dragging: false,
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  maxZoom: 10,
  minZoom: 3
}).setView([43, 13], 5);

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
  "2022": addGPXLayer('data/2025/20250.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20251.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20252.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20253.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20254.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20255.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20256.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20257.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20258.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/20259.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/202510.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/202511.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/202512.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/202513.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/202514.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2025/202515.gpx', '#0e323a')
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