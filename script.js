
		function toggleDropdown() {
			var dropdownMenu = document.getElementById("dropdownMenu");
			if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
				dropdownMenu.style.display = "block";
			} else {
				dropdownMenu.style.display = "none";
			}
		}


  // Initialize map
  var map = L.map('map', {
    closePopupOnClick: false,
    dragging: false,
    zoomControl: false,
	maxZoom: 10,
	minZoom: 3
  }).setView([47.803320, 13.039210], 4);

  // Add tile layer to the map
 L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map);
			
  // Add GPX tracks using Omnivore
  function addGPXLayer(gpxFile, color, label) {
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

  // Add GPX layers
  var gpxLayers = {
    "2024": addGPXLayer('data/2024/2024full.gpx', '#FF9D8B'),
    "2023": addGPXLayer('data/2023/2023full.gpx', '#FFB797'),
    "2022": addGPXLayer('data/2022/2022full.gpx', '#FFCCA2')
  };

// Add a legend
var legend = L.control({ position: 'topleft' });

legend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.style.color = 'white';      // Set text color to white
  div.style.fontWeight = 'bold';  // Make the text bold
  div.style.fontFamily = 'Arial, sans-serif';  // Change the font

  for (var year in gpxLayers) {
    div.innerHTML +=
      '<i style="background:' + gpxLayers[year].options.style.color + 
      '; width: 20px; height: 8px; display: inline-block; margin-right: 5px;"></i>' +
      year + '<br>';
  }
  return div;
};
legend.addTo(map);

  
		function toggleDropdown() {
			var dropdownMenu = document.getElementById("dropdownMenu");
			if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
				dropdownMenu.style.display = "block";
			} else {
				dropdownMenu.style.display = "none";
			}
		}
