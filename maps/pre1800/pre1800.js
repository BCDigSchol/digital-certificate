

//Define map start up options, here defined to center on Italy
		var mapOptions = {
			center: [41.8875, 0], //set center
			zoom: 2 , //set initial zoom
			maxZoom : 7,  //set max zoom
			minZoom : 1,
			maxBounds: [ [-90, -180] , [90,180] ],
			tap: false
			}

//Creates Map according to map options
		var map = new L.map('map', mapOptions);

//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}).addTo(map);


//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available)
			var piriReis1554 = L.tileLayer('WorldMap2/{z}/{x}/{y}.png', {tms: true, attribution: "David Rumsey Map Collection"});


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
		  	"<a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~299966~90071732:fol--41a-Oval-world-map-with-the-At?sort=Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No&qvq=q:%3Dworld%20AND%20pub_date%3D1500...1700%20;sort:Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No;lc:RUMSEY~8~1&mi=190&trs=10031'>Pirî Reis, 1554</a>" : piriReis1554,
				"Locations" : cluster_places,

				};
				L.control.layers(baseLayers, overlayMaps).addTo(map);

				L.control.pan().addTo(map);
				L.control.scale().addTo(map);

				var searchLayers = L.layerGroup([cluster_places]);

				var searchControl = new L.Control.Search({
					layer: searchLayers,
					propertyName: 'PlaceName',
					marker: false,
					textPlaceholder: 'Search by Location',
					textErr: 'Location not found',
					moveToLocation: function(latlng, title, map) {
						//map.fitBounds( latlng.layer.getBounds() );
						//var zoom = map.getBoundsZoom(latlng.layer.getBounds());
						var zoom = 8;
						map.setView(latlng, zoom); // access the zoom
					}
				});
				map.addControl( searchControl );  //inizialize search control

				searchControl.on('search:locationfound', function(e) {
					if(e.layer._popup)
						e.layer.openPopup();
				}).on('search:collapsed', function(e) {
				});

var yearSlider = document.getElementById('slider-year');
noUiSlider.create(yearSlider, {
    start: [1500, 1800],
    connect: true,
		step:5,
		pips: {
        mode: 'positions',
        values: [0, 25, 50, 75, 100],
        density: 4,
        stepped: true
    },
    range: {
        'min': 1500,
        'max': 1800
    },
		format: wNumb({
        decimals: 0})
});
var yearValues = [
	document.getElementById('event-start'),
	document.getElementById('event-end')
];
yearValues[0].innerHTML=1500;
yearValues[1].innerHTML=1800;

yearSlider.noUiSlider.on('change', function (values, handle) {
	yearValues[handle].innerHTML = values[handle];
	rangeMin= yearValues[0].innerHTML; //set min for filtering
	rangeMax= yearValues[1].innerHTML; //set max for filtering
	console.log(rangeMin);
	console.log(rangeMax);
	cluster_places.clearLayers();
	places = new L.geoJson(data,{
		onEachFeature: popUp,
		filter:
			function(feature, layer) {
				return (feature.properties.YearOfTravel <= rangeMax) && (feature.properties.YearOfTravel >= rangeMin);
			}
	});
	cluster_places.addLayer(places);
});
