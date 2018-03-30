function TimeTable(msg) {

  //RouteDirections is an array of Route objects - all buses that stop at the defined StopID, grouped by route
  //Departures is an array of departure + arrival times for each bus in the specific route, within the Route object
  //RouteID is the route number, within the Route object

  //for each route

  var routeNo = [30,32,82,90]
 // document.write(routeNo[0]); 
  
  console.log("HELLO");
  

  for (i=0; i<msg[0].RouteDirections.length; i++) {

    var route = msg[0].RouteDirections[i]
    var numOfDeparts = route.Departures.length;
    var routeID = route.RouteId;
	
	var routelen = route.length;
	
	for(j=0;j<routelen;j++)
	{
    //if there are buses running and the routeID = 30:
	  if (numOfDeparts != 0 && routeID == routeNo[j]) {

      //for each entry in Departures (each bus)
		for (bus=0; bus<route.Departures.length; bus++) {

        //get the ETA of the bus
        var eta = route.Departures[bus].ETA;
        console.log(eta);
        var substring = eta.replace("/Date(", "");
        substring = substring.replace("000-0500)/", "");
        console.log(substring);

        var t = new Date(substring * 1000);
        var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
        console.log(formatted);

        //add the ETA to relevant ID in HTML
        document.getElementById("route30").innerHTML += formatted + '<br>';
      }

    } else if (numOfDeparts == 0 && routeID == routeNo[j]) {

      console.log("There are no scheduled departures.");
      document.getElementById("route30").innerHTML += 'There are no scheduled departures. ';
    } 
   }
}
}
	