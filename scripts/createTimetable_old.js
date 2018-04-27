function TimeTable(msg) {
  console.log(msg);
  //RouteDirections is an array of Route objects - all buses that stop at the defined StopID, grouped by route
  //Departures is an array of departure + arrival times for each bus in the specific route, within the Route object
  //RouteID is the route number, within the Route object

  //for each route
  var schedule = [];
  var api_eta, api_edt, unix_eta, unix_edt, hours, mins, formatted_eta, formatted_edt, until_arriv;

  var timediv = document.getElementById("time");
  var linebreak = document.createElement("br");
  // For loop to iterate through the list of Departures 
  // (msg[0].RouteDirections[i].Departures[j].ETA)
  // Gives us a JSON date
  for (var i = 0; i < msg[0].RouteDirections.length; i ++) {

    //This if statement filters out non-active routes
    if (msg[0].RouteDirections[i].Departures.length != 0) {
      var div = document.createElement("div");
      div.setAttribute("id", "div" + msg[0].RouteDirections[i].RouteId.toString());;
      div.style.width = "100px";
      div.style.height = "200px";
      div.innerHTML = "<span style=\'font-size:20px\''> Route " + msg[0].RouteDirections[i].RouteId.toString() +
        "</span>";
     // div.style.fontSize = "150%";
      timediv.appendChild(div);
    }
    for (var j = 0; j < msg[0].RouteDirections[i].Departures.length; j++) {
      var bus_time = {};
      api_eta = (msg[0].RouteDirections[i].Departures[j].ETA);
      api_edt = (msg[0].RouteDirections[i].Departures[j].EDT);
      // Need to chop off the "/Date(" in the API ETA. Apparently .substr(6) just works
      // and is able to parse the ")/" at the end of a JSON date. Date format here will now be
      // "15XXXXXXXXXXX-500", with the -500 just indicating EST.
      unix_eta = new Date(parseInt(api_eta.substr(6)));
      hours = unix_eta.getHours(); 
      // Need to format for minutes that are < 10; getMinutes will return single digits,
      // resulting in times like 17:4 instead of 17:04
      if (unix_eta.getMinutes() < 10 ) {
        mins = '0' + unix_eta.getMinutes();
      } else {
        mins = unix_eta.getMinutes();
      }
      formatted_eta = hours + ':' + mins;

      unix_edt = new Date(parseInt(api_edt.substr(6)));
      hours = unix_edt.getHours();
      if (unix_edt.getMinutes() < 10) {
        mins = '0' + unix_edt.getMinutes();
      } else {
        mins = unix_edt.getMinutes();
      }
      formatted_edt = hours + ':' + mins;

      // UNIX format ETA time minus the current time converted to minutes and rounded up
      until_arriv = Math.ceil((parseInt(api_eta.substr(6, 13)) - Date.now()) / 60000); 
      //console.log(formatted_eta);
      //console.log(formatted_edt);
      //console.log(until_arriv);

      // Put it all into the bus_time object which is pushed onto the schedule
      bus_time.Route = (msg[0].RouteDirections[i].RouteId)
      bus_time.ETA = formatted_eta;
      bus_time.until_arriv = until_arriv;
      bus_time.EDT = formatted_edt;
      schedule.push(bus_time);


      var linebreak = document.createElement('br');
      div.appendChild(linebreak);
      var time = document.createTextNode(bus_time.ETA);
      div.appendChild(time);

    }
    j = 0;
  }
  console.log(schedule);
  // When displaying schedule info will need to account for "arrived but not yet departed"


  return(schedule);
}


/*
    if (numOfDeparts != 0 && routeID == 32) {

      for (bus=0; bus<route.Departures.length; bus++) {

        var eta = route.Departures[bus].ETA;
        console.log(eta);
        var substring = eta.replace("/Date(", "");
        substring = substring.replace("000-0500)/", "");
        console.log(substring);

        var t = new Date(substring * 1000);
        var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
        console.log(formatted);
        document.getElementById("route32").innerHTML += formatted + '<br>';
      }

    } else if (numOfDeparts == 0 && routeID == 32) {

      console.log("There are no scheduled departures.");
      document.getElementById("route32").innerHTML += 'There are no scheduled departures. ';

    }

    if (numOfDeparts != 0 && routeID == 82) {

      for (bus=0; bus<route.Departures.length; bus++) {

        var eta = route.Departures[bus].ETA;
        console.log(eta);
        var substring = eta.replace("/Date(", "");
        substring = substring.replace("000-0500)/", "");
        console.log(substring);

        var t = new Date(substring * 1000);
        var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
        console.log(formatted);
        document.getElementById("route82").innerHTML += formatted + '<br>';
      }

    } else if (numOfDeparts == 0 && routeID == 82) {

      console.log("There are no scheduled departures.");
      document.getElementById("route82").innerHTML += 'There are no scheduled departures. ';

    }
    
    if (numOfDeparts != 0 && routeID == 90) {

      for (bus=0; bus<route.Departures.length; bus++) {

        var eta = route.Departures[bus].ETA;
        console.log(eta);
        var substring = eta.replace("/Date(", "");
        substring = substring.replace("000-0500)/", "");
        console.log(substring);

        var t = new Date(substring * 1000);
        var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
        console.log(formatted);
        document.getElementById("route90").innerHTML += formatted + '<br>';
      }

    } else if (numOfDeparts == 0 && routeID == 90) {

      console.log("There are no scheduled departures.");
      document.getElementById("route90").innerHTML += 'There are no scheduled departures. ';

    }
  }
} */