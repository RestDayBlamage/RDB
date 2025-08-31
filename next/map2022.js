var map = L.map('map', {
  closePopupOnClick: false,
  dragging: false,
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  maxZoom: 10,
  minZoom: 3
}).setView([49, 17], 6);

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
  "2022": addGPXLayer('data/2022/20220.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20221.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20222.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20223.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20224.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20225.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20226.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20227.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20228.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/20229.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/202210.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/202211.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/202212.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/202213.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/202214.gpx', '#0e323a'),
  "2022": addGPXLayer('data/2022/202215.gpx', '#0e323a')
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