
//Define map start up options, here defined to center on Italy
		var mapOptions = {
			center: [41.8875, 12.72], //set center
			zoom: 1 , //set initial zoom
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
			var piriReis1525 = L.tileLayer('https://maps.georeferencer.com/georeferences/bb2ea065-7ee6-55fa-a29e-1ccb6cc568a9/2020-12-06T14:11:56.847793Z/map/{z}/{x}/{y}.png?key=rFFmpdCwWU8gzjF5Xbgk', {attribution: "David Rumsey Map Collection"}).addTo(map);

			var piriReis1554 = L.tileLayer('https://maps.georeferencer.com/georeferences/0c4a3a8a-d799-532b-8028-492d017cc8d6/2017-09-21T09:12:07.141853Z/map/{z}/{x}/{y}.png?key=rFFmpdCwWU8gzjF5Xbgk',{attribution: "David Rumsey Map Collection"}).addTo(map);


			var baseLayers = {
				"Satellite Imagery" : Esri_WorldImagery,
				};

			var overlayMaps = {
				"<a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~300654~90071746'>Pirî Reis, 1525</a>" : piriReis1525,
				"<a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~299966~90071732:fol--41a-Oval-world-map-with-the-At?sort=Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No&qvq=q:%3Dworld%20AND%20pub_date%3D1500...1700%20;sort:Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No;lc:RUMSEY~8~1&mi=190&trs=10031'>Pirî Reis, 1554</a>" : piriReis1554

				};
				L.control.layers(baseLayers, overlayMaps).addTo(map);

				// Read markers data from data.csv
			  $.get('./data.csv', function(csvString) {

			    // Use PapaParse to convert string to array of objects
			    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

			    // For each row in data, create a marker and add it to the map
			    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
			    for (var i in data) {
			      var row = data[i];
						var popupContent = "Title: " + row.Title;
			      var marker = L.marker([row.Latitude, row.Longitude], {
			        opacity: 1
			      }).bindPopup(popupContent);

			      marker.addTo(map);
			    }
				});

			   map.attributionControl.setPrefix(
			     'View <a href="https://github.com/HandsOnDataViz/leaflet-map-csv" target="_blank">code on GitHub</a>'
			   );



//Lets you see lat/long in the console window. Useful for placing non-georeferenced maps in the correct location or for placing markers
			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});
