window.onload = function() {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('content').style.display = 'block';
};

function toggleDropdown() {
  var dropdownMenu = document.getElementById("dropdownMenu");
  if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
}

var map = L.map('map', {
  closePopupOnClick: false,
  dragging: false,
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  maxZoom: 10,
  minZoom: 3
}).setView([47.803320, 13.039210], 4);

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
  "2024": addGPXLayer('data/2024/2024full.gpx', '#5bbd94'),
  "2023": addGPXLayer('data/2023/2023full.gpx', '#42a496'),
  "2022": addGPXLayer('data/2022/2022full.gpx', '#408a8d')
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


//------------------------------------------------------------------------------------------------------------

		
        function toggleBar() {
            const bar = document.getElementById("slideUpBar");
            bar.classList.toggle("show");
        }
		
				
//------------------------------------------------------------------------------------------------------------



        function toggleTheme() {
            const body = document.body;
            body.classList.toggle("dark-theme");
            body.classList.toggle("darkmode");
            localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
        }

        document.addEventListener("DOMContentLoaded", () => {
            if (localStorage.getItem("theme") === "dark") {
                document.body.classList.add("dark-theme");
                document.body.classList.add("darkmode");
            }
        });
		
//------------------------------------------------------------------------------------------------------------
		
		var swiper = new Swiper(".swiper", {
		  effect: "coverflow",
		  grabCursor: true,
		  centeredSlides: true,
		  slidesPerView: "auto",
		  coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 100,
			modifier: 2,
			slideShadows: true
		  },
		  spaceBetween: 60,
		  loop: true,
		  pagination: {
			el: ".swiper-pagination",
			clickable: true
		  }
		});		
		
//------------------------------------------------------------------------------------------------------------	
	
		// Inicjalizacja mapy
		var map = L.map('wildmap', {
			zoomControl: false
		}).setView([47.609401746377145, 13.783270663071217], 5);

		// Base layers
		var baseLayers = {
			"OSM": L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				maxZoom: 19,
				minZoom: 3,
			}).addTo(map),
			"Base": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 9,
				minZoom: 3,
			}),
			"Carto Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
				maxZoom: 20,
				minZoom: 3,
			}),
			"OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 20,
				minZoom: 3,
			}),
			"Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 19,
				minZoom: 3,
			}),
			"GoogleSatellite": L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
				maxZoom: 20,
				minZoom: 3,
				subdomains:['mt0','mt1','mt2','mt3']
			}),
			"Bike paths": L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
				maxZoom: 20,
				minZoom: 3,
			}),
			"X": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 20,
				minZoom: 3,
			})
		};

		// Ikony dla markerów
		var hotIcon = L.icon({
			iconUrl: 'icons/Camp.png',
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32]
		});

		var sleepIcon = L.icon({
			iconUrl: 'icons/Tent.png',
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32]
		});


    // Lista markerów do dodania do mapy i sidebara
    var locations = [
        { coords: [50.343530, 14.870005], icon: sleepIcon, title: "WILD", description: "1st Brodce" },
        { coords: [50.033846, 14.404621], icon: sleepIcon, title: "WILD", description: "Prague" },
        { coords: [49.410181, 15.076606], icon: hotIcon, title: "CAMP", description: "Moravec" },
        { coords: [48.564758, 16.047581], icon: sleepIcon, title: "WILD", description: "Hollabrunn" },
        { coords: [48.211440, 16.447545], icon: hotIcon, title: "CAMP", description: "Vienna" },
        { coords: [48.209367, 16.468869], icon: sleepIcon, title: "WILD", description: "Vienna" },
        { coords: [47.699867, 17.621120], icon: sleepIcon, title: "WILD", description: "Gyor" },
        { coords: [46.764867, 17.289952], icon: hotIcon, title: "CAMP", description: "Keszthely" },
        { coords: [46.803734, 17.518897], icon: hotIcon, title: "CAMP", description: "Badacsonytomaj" },
        { coords: [46.938394, 18.127529], icon: sleepIcon, title: "WILD", description: "Siofok" },
        { coords: [47.417180, 18.907596], icon: sleepIcon, title: "WILD", description: "Budapest" },
        { coords: [47.476161, 19.083333], icon: hotIcon, title: "CAMP", description: "Budapest" },
        { coords: [47.831521, 18.698297], icon: sleepIcon, title: "WILD", description: "Esztergom" },
        { coords: [48.595192, 18.455335], icon: sleepIcon, title: "WILD", description: "26/27.08.2022" },
        { coords: [49.446265, 18.771056], icon: sleepIcon, title: "WILD", description: "Cadca" },
        { coords: [47.256844, 11.329313], icon: sleepIcon, title: "WILD", description: "Innsbruck" },
        { coords: [46.507881, 11.350628], icon: sleepIcon, title: "WILD", description: "Bolzano" },
        { coords: [45.788343, 10.824790], icon: hotIcon, title: "CAMP", description: "Garda" },
        { coords: [45.373651, 11.427969], icon: sleepIcon, title: "WILD", description: "Lonigo" },
        { coords: [45.645984, 12.654267], icon: sleepIcon, title: "WILD", description: "Venice" },
        { coords: [45.598320, 13.783057], icon: sleepIcon, title: "WILD", description: "Muggia" },
        { coords: [45.309447, 14.284681], icon: hotIcon, title: "CAMP", description: "Icici" },
        { coords: [45.879229, 15.999641], icon: sleepIcon, title: "WILD", description: "Zagreb" },
        { coords: [46.539944, 15.924602], icon: sleepIcon, title: "WILD", description: "Ptuj" },
        { coords: [47.585979, 16.102185], icon: sleepIcon, title: "WILD", description: "Holl" },
        { coords: [48.621341, 16.518346], icon: sleepIcon, title: "WILD", description: "Horesdorf" },
        { coords: [49.683346, 16.620236], icon: sleepIcon, title: "WILD", description: "Krenov" },
        { coords: [46.8505730, 9.4947960], icon: sleepIcon, title: "WILD", description: "Military Base Chur" },
        { coords: [46.1328810, 9.2883730], icon: hotIcon, title: "CAMP", description: "Dongo" },
        { coords: [45.5718960, 8.5406310], icon: sleepIcon, title: "WILD", description: "Momo" },
        { coords: [44.9344880, 7.6514900], icon: sleepIcon, title: "WILD", description: "Brassi" },
        { coords: [44.2903990, 8.4518020], icon: hotIcon, title: "CAMP", description: "Savona" },
        { coords: [44.738556, 8.821508], icon: sleepIcon, title: "WILD", description: "Novi Ligure" },
        { coords: [45.4083410, 9.1414780], icon: sleepIcon, title: "WILD", description: "Milan" },
        { coords: [45.8219370, 9.4146720], icon: hotIcon, title: "CAMP", description: "Lecco" },
        { coords: [46.3102690, 9.3938510], icon: sleepIcon, title: "WILD", description: "Chiavenna" },
        { coords: [46.7047960, 9.4453320], icon: sleepIcon, title: "WILD", description: "Thusis" }
    ];


		// Grupa markerów
		var markerGroup = L.featureGroup();

		// Dodanie markerów do mapy
		locations.forEach(loc => {
			var marker = L.marker(loc.coords, { icon: loc.icon })
				.bindPopup(`<b>${loc.title}</b><br>${loc.description}`)
				.addTo(markerGroup);
		});

		markerGroup.addTo(map);

		// Dodanie warstw do mapy
		L.control.layers(baseLayers, { "Markers": markerGroup }).addTo(map);

		// Dopasowanie mapy do zasięgu wszystkich markerów
		map.fitBounds(markerGroup.getBounds(), { padding: [50, 50] });
