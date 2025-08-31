var map = L.map('map', {
  closePopupOnClick: false,
  dragging: false,
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  maxZoom: 10,
  minZoom: 3
}).setView([49, 14], 5);

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
  "2022": addGPXLayer('data/2023/20230.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20231.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20232.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20233.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20234.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20235.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20236.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20237.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20238.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/20239.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/202310.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/202311.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/202312.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/202313.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/202314.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2023/202315.gpx', '#0e323a')
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