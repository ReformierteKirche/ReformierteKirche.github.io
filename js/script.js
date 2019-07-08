
// show loading screen: https://docs.mapbox.com/mapbox.js/example/v1.0.0/show-loading-screen/
var coords_center = [8.501694, 47.376888];

mapboxgl.accessToken = 'pk.eyJ1IjoiaW1mZWxkIiwiYSI6ImNqMzR2aTE0dDAwaGYyd3Fncmc1ODRkemcifQ.HTl7csPq_0VP3yO28G2u8Q';
	var map = new mapboxgl.Map({
		container: 'map',
		center: [8.531694, 47.376888],
		pitch:80,
		zoom: 15,
    minZoom:13,
    maxZoom:16,
		style: 'mapbox://styles/imfeld/cjxhlidyx3jq71crnvoxgp5ns'
	});

var url = "../data/churches.geojson";
var loader = document.getElementById("loader");

startLoading();

map.on('load', function() {
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
      'fill-extrusion-color': '#d90b2d',
      'fill-extrusion-height': ['get', 'measuredHeight'],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 0.9
    }
  });

$.getJSON("data/points.geojson", function(geojson){
  geojson.features.forEach(function(marker){
    //console.log(marker.properties.latitude);
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

finishedLoading();


});

// map.on("click", function(e){
//   //map.setView([e.lngLat.lat, e.lngLat.lng], 12);
//   map.flyTo({
//   center: [
//     e.lngLat.lng,
//     e.lngLat.lat],
//     zoom: 17
//   });
//   //console.log(e.lngLat.lat, e);
// })



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
