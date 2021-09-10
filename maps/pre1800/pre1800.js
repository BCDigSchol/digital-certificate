
//Define map start up options, here defined to center on Italy
		var mapOptions = {
			center: [41.8875, 12.72], //set center
			zoom: 4 , //set initial zoom
			maxZoom : 12,  //set max zoom
			minZoom : 2,
			maxBounds: [ [-90, -180] , [90,180] ]
			}

//Creates Map according to map options
		var map = new L.map('map', mapOptions);


//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}).addTo(map);


//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available)
			var piriReis1525 = L.tileLayer('https://maps.georeferencer.com/georeferences/bb2ea065-7ee6-55fa-a29e-1ccb6cc568a9/2020-12-06T14:11:56.847793Z/map/{z}/{x}/{y}.png?key=rFFmpdCwWU8gzjF5Xbgk', {attribution: ""}).addTo(map);

			var baseLayers = {
				"Satellite Imagery" : Esri_WorldImagery,
				};

			var overlayMaps = {
				"Pirî Reis, 1525" : piriReis1525,

				};
				L.control.layers(baseLayers, overlayMaps).addTo(map);

//Lets you see lat/long in the console window. Useful for placing non-georeferenced maps in the correct location or for placing markers
			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});
