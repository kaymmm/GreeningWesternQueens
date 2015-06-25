var map;
var geocoder;
var marker;

function initialize() {
  console.log("initializing google maps");
  /* initialize geocoder to for address-lookup functionality */
  geocoder = new google.maps.Geocoder();

  /* set up the map */
  var myOptions = {
    zoom: 14,
    center: new google.maps.LatLng(40.762341,-73.909321),
    mapTypeId: google.maps.MapTypeId.HYBRID
  };

  /* set up the outage overlay */
  var outageOverlay;

  map = new google.maps.Map(document.getElementById("map_canvas"),
    myOptions);

  var outageCoords1 = [
  new google.maps.LatLng(40.781376163,    -73.914147223),
  new google.maps.LatLng(40.782334418,    -73.904392496),
  new google.maps.LatLng(40.779644361,    -73.903873043),
  new google.maps.LatLng(40.780495199,    -73.894041352),
  new google.maps.LatLng(40.772303888,    -73.892625818),
  new google.maps.LatLng(40.772664935,    -73.887697525),
  new google.maps.LatLng(40.767182435,    -73.886794907),
  new google.maps.LatLng(40.765234586,    -73.906446699),
  new google.maps.LatLng(40.759769167,    -73.905592996),
  new google.maps.LatLng(40.759208623,    -73.910471093),
  new google.maps.LatLng(40.753757677,    -73.909650785),
  new google.maps.LatLng(40.752866479,    -73.919457228),
  new google.maps.LatLng(40.758224473,    -73.920451050),
  new google.maps.LatLng(40.758872617,    -73.915525152),
  new google.maps.LatLng(40.761638034,    -73.915914038),
  new google.maps.LatLng(40.761162728,    -73.920883146),
  new google.maps.LatLng(40.774873144,    -73.923130047),
  new google.maps.LatLng(40.775391660,    -73.918204149),
  new google.maps.LatLng(40.778157076,    -73.918593036),
  new google.maps.LatLng(40.778718802,    -73.913710347),
  new google.maps.LatLng(40.781376163,    -73.914147223)
  ];
  outageOverlay1 = new google.maps.Polygon({
    paths: outageCoords1,
    strokeColor: "#FF00FF",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#FF00FF",
    fillOpacity: 0.0
  });

  var outageCoords2 = [
  new google.maps.LatLng(40.744000245,    -73.923097039),
  new google.maps.LatLng(40.749496206,    -73.923923499),
  new google.maps.LatLng(40.750938379,    -73.909138125),
  new google.maps.LatLng(40.748252383,    -73.908704233),
  new google.maps.LatLng(40.748727598,    -73.903867375),
  new google.maps.LatLng(40.751351609,    -73.904177297),
  new google.maps.LatLng(40.751847485,    -73.899319777),
  new google.maps.LatLng(40.749223474,    -73.898844562),
  new google.maps.LatLng(40.749595381,    -73.893931256),
  new google.maps.LatLng(40.744161405,    -73.893022150),
  new google.maps.LatLng(40.742140710,    -73.912716698),
  new google.maps.LatLng(40.739438184,    -73.912241483),
  new google.maps.LatLng(40.738900985,    -73.917160988),
  new google.maps.LatLng(40.733498001,    -73.916313866),
  new google.maps.LatLng(40.732919479,    -73.921192048),
  new google.maps.LatLng(40.735646798,    -73.921605278),
  new google.maps.LatLng(40.735212906,    -73.926574371),
  new google.maps.LatLng(40.740688206,    -73.927462815),
  new google.maps.LatLng(40.740274976,    -73.932376122),
  new google.maps.LatLng(40.734737692,    -73.931590984),
  new google.maps.LatLng(40.733828585,    -73.941401068),
  new google.maps.LatLng(40.736514581,    -73.941855621),
  new google.maps.LatLng(40.737051780,    -73.936917521),
  new google.maps.LatLng(40.739799761,    -73.937330751),
  new google.maps.LatLng(40.743078742,    -73.932826543),
  new google.maps.LatLng(40.744000245,    -73.923097039)
  ];
  outageOverlay2 = new google.maps.Polygon({
    paths: outageCoords2,
    strokeColor: "#FF00FF",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#FF00FF",
    fillOpacity: 0.0
  });

  outageOverlay1.setMap(map);
  outageOverlay2.setMap(map);

}
google.maps.event.addDomListener(window, 'load', initialize);


function codeAddress() {
  var address = document.getElementById("address").value;
  console.log("geocoding: " + address);
  if (geocoder) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var isWithinPolygon = outageOverlay1.containsLatLng(results[0].geometry.location) || outageOverlay2.containsLatLng(results[0].geometry.location);
        var strPolygonTest = isWithinPolygon?"is":"is not"; 
        var contentString = "The address, " + address + ", <strong>" + strPolygonTest + "</strong> within the prioritized boundary area of the Greening Western Queens Fund.";
        /* initialize info window for popping up lat-lon */
        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200,
        });
        infowindow.setPosition(results[0].geometry.location);
        infowindow.open(map);

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  } else {
    console.log("geocoder not loaded");
  }
}

// Ray Cast Point in Polygon extension for Google Maps GPolygon
// App Delegate Inc <htttp://appdelegateinc.com> 2010

google.maps.Polygon.prototype.containsLatLng = function(latLng) {
  /* Raycast point in polygon method */
  var numPoints = this.getPath().getLength();
  var inPoly = false;
  var i;
  var j = numPoints-1;

  for(i=0; i < numPoints; i++) {
    var vertex1 = this.getPath().getAt(i);
    var vertex2 = this.getPath().getAt(j);

    if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng())     {
      if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
        inPoly = !inPoly;
      }
    }

    j = i;
  }

  return inPoly;
};
