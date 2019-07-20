
// show loading screen: https://docs.mapbox.com/mapbox.js/example/v1.0.0/show-loading-screen/
var coords_center = [8.501694, 47.376888];
var change = true;

mapboxgl.accessToken = 'pk.eyJ1IjoiaW1mZWxkIiwiYSI6ImNqMzR2aTE0dDAwaGYyd3Fncmc1ODRkemcifQ.HTl7csPq_0VP3yO28G2u8Q';
	var map = new mapboxgl.Map({
		container: 'map',
		center: [8.531694, 47.376888],
		pitch: change,
		zoom: 13,
    minZoom:12,
    maxZoom:16,
		style: 'mapbox://styles/imfeld/cjxhlidyx3jq71crnvoxgp5ns',
    attributionControl: false
	});


var url = "../data/churches2.geojson";
var loader = document.getElementById("loader");

startLoading();
//mapload();

map.on('load', function() {

  mapload();
  finishedLoading();


});



function mapload() {
    console.log("map startloading");
    map.addSource("my-data", {
      type: "geojson",
      data: url
    });

  map.addLayer({
    'id': 'extrusion',
    'type': 'fill-extrusion',
    "source": 'my-data',
    'paint': {
      'fill-extrusion-color': ['match', ['get', 'type', ],
      'Kirche', '#084081',
      'Kirche ','#084081',
      'Kirchgemeindehaus', '#2b8cbe', 
      'Kirchgemeindehaus ', '#2b8cbe',
      'Pfarrhaus ', '#4eb3d3',
      'Pfarrhaus', '#4eb3d3',
      'Wohnen', '#7bccc4',
      'Gewerbehaus & Geschäftshaus','#a8ddb5',
      'Pfarrhaus + Kirche', '#e0f3db',
      'Baurecht', '#ccebc5',
      '#ccc'],
      'fill-extrusion-height': ['get', 'measuredHeight'],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 0.9
    }
  });

$.getJSON("data/points.geojson", function(geojson){
  console.log("hello");
  geojson.features.forEach(function(marker){
    console.log(marker.properties.latitude);
    var el = document.createElement('div');
    el.className = 'marker';

//offset: [-10, 0,50]
    new mapboxgl.Marker(el, {"offset":[0,-20]})
        .setLngLat([marker.properties.longitude, marker.properties.latitude])
        .setPopup(new mapboxgl.Popup({"offset": 35})
            .setHTML('<h2>' + marker.properties.type + '</h2> <hr noshade> <p> Quartier: ' + marker.properties.kreis + '<br> Addresse: ' + marker.properties.input_string + '<br> Baujahr: ' + Math.floor(marker.properties.year) + '</p>')
        )
        // .setOffset(1)
        .addTo(map);
  })
})


}


$('#toggle').click(function() {

  if (change){
    map.setPitch(90);
    change = false;
  }
  else {
    map.setPitch(0);
    change = true;
  }


})


function startLoading() {
  console.log("startloading");
    loader.className = '';
}

function finishedLoading() {
  console.log("finished loading");
    // first, toggle the class 'done', which makes the loading screen
    // fade out
    loader.className = 'done';
    setTimeout(function() {
        // then, after a half-second, add the class 'hide', which hides
        // it completely and ensures that the user can interact with the
        // map again.
        loader.className = 'hide';
    }, 200);
}
