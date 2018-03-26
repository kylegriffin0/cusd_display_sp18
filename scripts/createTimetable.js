function TimeTable(msg) {

  //RouteDirections is an array of Route objects - all buses that stop at the defined StopID, grouped by route
  //Departures is an array of departure + arrival times for each bus in the specific route, within the Route object
  //RouteID is the route number, within the Route object

  //for each route
  var allRoutes = [11, 14, 17, 20, 21, 30, 31, 32, 36, 37, 40, 43, 51, 52, 53, 65, 67, 90];
  
  //console.log("888");
  for (i=0; i<msg[0].RouteDirections.length; i++) {

    var route = msg[0].RouteDirections[i]
    var numOfDeparts = route.Departures.length;
    var routeID = route.RouteId;

	var routestr="route"+routeID.toString();
	
	 //var routestr="route"+"30";
	console.log(routestr);
	
	/*allRoutes.push(routeID);
	console.log("000");
	console.log(allRoutes);
	
  }*/

	console.log("PPP")
	console.log("route"+route);
	console.log(allRoutes.includes(routeID));
	
    //if there are buses running and the routeID = 30:
    if (numOfDeparts != 0){
//		&& allRoutes.includes(routeID)) {
	
	  console.log("OOOQQQ");
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
        document.getElementById("route"+routeID.toString()).innerHTML += formatted + '<br>';
      }

    } else if (numOfDeparts == 0 && allRoutes.includes(routeID)) {

      console.log("There are no scheduled departures.");
      document.getElementById("route"+routeID.toString()).innerHTML += 'There are no scheduled departures. ';
    } 
}
}
