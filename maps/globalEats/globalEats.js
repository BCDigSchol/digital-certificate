

//Define map start up options, here defined to center on Italy
		var mapOptions = {
			center: [42.3, -71], //set center
			zoom: 10 , //set initial zoom
			maxZoom : 20,  //set max zoom
			minZoom : 1,
			maxBounds: [ [-90, -180] , [90,180] ],
			tap: false,
			}

//Creates Map according to map options
		var map = new L.map('map', mapOptions);
//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}).addTo(map);

		var map1896 = L.tileLayer('1896/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 5, maxZoom: 16}).addTo(map);
