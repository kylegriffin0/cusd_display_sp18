function Timetable(msg) {
  console.log(msg);
  //RouteDirections is an array of Route objects - all buses that stop at the defined StopID, grouped by route
  //Departures is an array of departure + arrival times for each bus in the specific route, within the Route object
  //RouteID is the route number, within the Route object

  //for each route
  var schedule = [];
  var api_eta, api_edt, unix_eta, unix_edt, hours, mins, formatted_eta, formatted_edt, until_arriv, until_dep;


  // For loop to iterate through the list of Departures 
  // (msg[0].RouteDirections[i].Departures[j].ETA)
  // Gives us a JSON date
  for (var i = 0; i < msg[0].RouteDirections.length; i ++) {

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
      until_dep = Math.ceil((parseInt(api_edt.substr(6, 13)) - Date.now()) / 60000);
      //console.log(formatted_eta);
      //console.log(formatted_edt);
      //console.log(until_arriv);

      // Put it all into a bus_time 'object' which is pushed onto the schedule
      bus_time.Route = (msg[0].RouteDirections[i].RouteId)
      bus_time.NextStop = 
      bus_time.ETA = formatted_eta;
      bus_time.UntilArriv = until_arriv;
      bus_time.EDT = formatted_edt;
      bus_time.UntilDep = until_dep;
      bus_time.Destination = msg[0].RouteDirections[i].Departures[j].Trip.InternetServiceDesc;
      schedule.push(bus_time);


      var linebreak = document.createElement('br');


    }
    j = 0;
  }

  schedule.sort(sortFunction);
  console.log(schedule);
  return schedule;

}
  

// Sorting the schedule based on ETA - might want to use ETD?

function sortFunction(a, b) {

  if (a.EDT === b.EDT) {
    return 0;
  }
  else {
    return (a.EDT < b.EDT ? -1 : 1);
  }
}

function displayTimetable (schedule) {
  var timediv = document.getElementById("timetable_panel");
  var linebreak = document.createElement("br");
  var eta, dest, route, edt, flag;

  var posi = document.getElementById("timetable_panel").getBoundingClientRect();

  // WILL NEED TO CHANGE FOR LOOP SIZE TO ACCOUNT FOR SCREEN SIZE
  for (var i = 0; i < schedule.length; i++) {
      var div = document.createElement("div");
      div.setAttribute("id", "div" + schedule[i].Route);
      div.className = "timedata";
      div.style.fontFamily = "Helvetica Neue"
      //div.style.height = ((posi.height - posi.height * .05) / 10).toString() + "px";
      div.style.height = (95 / 9).toString() + "%";
      //div.innerHTML = "<span style=\'font-size:20px\''> " + msg[0].RouteDirections[i].RouteId.toString() +
      //"</span>";
     // div.style.fontSize = "150%";
      timediv.appendChild(div);
          // div.appendChild(linebreak);
      

      route = document.createElement("div");
      route.className = "timeroute";
      route.innerHTML = schedule[i].Route;

      dest = document.createElement("div");
      dest.className = "timedest";
      dest.innerHTML = schedule[i].Destination;

      edt = document.createElement("div");
      edt.className = "timeedt";
      edt.innerHTML = schedule[i].UntilDep + " min";

      div.appendChild(route);
      div.appendChild(dest);
      div.appendChild(edt);

  }
}



