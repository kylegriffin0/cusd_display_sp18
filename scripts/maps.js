
var map;

function initMap() {
  return;
}

function DrawMap() {
  var latlng = new google.maps.LatLng(42.438618, -76.497658);
  var myOptions =
  {
      zoom: 16,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById("map_panel"), myOptions);
  var bounds = new google.maps.LatLngBounds();

}
  

function MapRoute(msg, colormap, colors, colorcount) {
  var markers = [];
  var i;
  var image;
  var greenstreet = [11, 14, 17, 20, 21, 30, 31, 32, 36, 37, 40, 43, 51, 52, 53, 65, 67, 90];
  var greenStMarker = new google.maps.Marker({
              position: new google.maps.LatLng(42.438618, -76.497658),
              map: map,
              icon: './images/stop-icon.png'
              });
 
  //var greenstreet = [30];
  for (i = 0; i < msg.length; i++) {
    if (greenstreet.includes(msg[i].RouteId)) {
      var address = [msg[i].Latitude, msg[i].Longitude];
      var position = new google.maps.LatLng(address[0], address[1]);
      var fill;


      //fill = "hsl (" + (i * (360 / msg.length) % 360) + ",100%,50%)";
      //want to use a different color for each marker

      if (!colormap[msg[i].RouteId]) {
        colormap[msg[i].RouteId] = colors[colorcount];
        colorcount++;
      } 
      var test = parseInt((Math.floor(Math.random() * 0xfffa00) + 0x0000ff));
      //var fill = i * Math.floor((0xffff00 / numcolors))
      //console.log(fill.toString(16));

      /*marker = new google.maps.Marker({
        position: position,
        map: map,
        //icon: image,
        label: msg[i]["RouteId"].toString(),
        animation: google.maps.Animation.DROP
      }); */

      marker = new google.maps.Marker({
              position: position,
              map: map,
              icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 20,
                    fillColor: colormap[msg[i].RouteId],
                    fillOpacity: 0.75,
                    strokeWeight: 20,
                    strokeOpacity:0,
                    //radius:20
                    },
              label: {
                      text: msg[i]["RouteId"].toString(),
                      color: "black",
                      fontFamily: "Roboto",
                      fontSize: "20px",
                      fontWeight: "bold"
                    }
              })
      markers.push(marker);
    }
  }
  return colormap;
}

function DeleteMarkers() {
  //Loop through all the markers and remove
  for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
  }
  markers = [];
};