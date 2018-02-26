var map;
var markers = [];

function DrawMap() {
  var latlng = new google.maps.LatLng(42.46, -76.496506);
  var myOptions =
  {
      zoom: 13,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  var bounds = new google.maps.LatLngBounds();
}

function MapRoute(msg) {

  var i;
  var image;
  var greenstreet = [11, 14, 17, 20, 21, 30, 31, 32, 36, 37, 40, 43, 51, 52, 53, 65, 67, 90];
  for (i = 0; i < msg.length; i++) {
    if (greenstreet.includes(msg[i].RouteId)) {
      var address = [msg[i].Latitude, msg[i].Longitude];
      var position = new google.maps.LatLng(address[0], address[1]);
      if (msg[i].Direction == 'O') {
        image = './images/bus-icon-outbound.png'
      } else {
        image = './images/bus-icon-inbound.png'
      }
      marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP
      });
      markers.push(marker);
    }
  }
}

function DeleteMarkers() {
  //Loop through all the markers and remove
  for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
  }
  markers = [];
};