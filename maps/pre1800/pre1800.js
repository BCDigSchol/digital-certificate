

//Define map start up options, here defined to center on Italy
		var mapOptions = {
			center: [41.8875, 12.72], //set center
			zoom: 1 , //set initial zoom
			maxZoom : 12,  //set max zoom
			minZoom : 2,
			maxBounds: [ [-90, -180] , [90,180] ],
			tap: false
			}

//Creates Map according to map options
		var map = new L.map('map', mapOptions);

//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}).addTo(map);
/*

//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available)
			//var piriReis1525 = L.tileLayer('https://maps.georeferencer.com/georeferences/bb2ea065-7ee6-55fa-a29e-1ccb6cc568a9/2020-12-06T14:11:56.847793Z/map/{z}/{x}/{y}.png?key=rFFmpdCwWU8gzjF5Xbgk', {attribution: "David Rumsey Map Collection"}).addTo(map);

			//var piriReis1554 = L.tileLayer('./PiriReis1554/{z}/{x}/{y}.png',{attribution: "David Rumsey Map Collection"}).addTo(map);
var piriReis1554;

*/
var places = L.geoJson(data, {
	onEachFeature: popUp
}
);

function popUp(f,l) {
	var out = [];

	//adds spaces in between entries
	if (f.properties) {
		out.push(f.properties.PlaceName + ' (' + f.properties.PlaceNameModern + ') <br>');
		out.push('<b>Traveller: </b>' + f.properties.NameOfTraveler);
		out.push('<b>Date: </b>' + f.properties.YearOfTravel);
		out.push('<b>Description: </b>' + f.properties.Description);
		out.push('<br>');
		out.push('<b>Citation: </b>' + f.properties.Citation);
		out.push('<a href="'+ f.properties.Hyperlink + '" target="_blank">Link</a>');  //allows for link to external URL via attribute in .geoJson table
		l.bindPopup(out.join("<br />"));
	}
}

			var cluster_places= new L.MarkerClusterGroup({showCoverageOnHover: false});
				 cluster_places.addLayer(places);
				 cluster_places.addTo(map);

//Lets you see lat/long in the console window. Useful for placing non-georeferenced maps in the correct location or for placing markers

			var baseLayers = {
				"Satellite Imagery" : Esri_WorldImagery,
				};

			var overlayMaps = {
		//		"<a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~299966~90071732:fol--41a-Oval-world-map-with-the-At?sort=Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No&qvq=q:%3Dworld%20AND%20pub_date%3D1500...1700%20;sort:Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No;lc:RUMSEY~8~1&mi=190&trs=10031'>Pirî Reis, 1554</a>" : layer_map_geo_0,
				"Locations" : cluster_places
				};
				L.control.layers(baseLayers, overlayMaps).addTo(map);

				L.control.pan().addTo(map);
				L.control.scale().addTo(map);
