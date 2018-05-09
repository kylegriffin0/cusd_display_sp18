function Timetable(msg) {
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
      bus_time.ETA_for_sort = unix_eta;
      bus_time.UntilArriv = until_arriv;
      bus_time.EDT = formatted_edt;
      bus_time.EDT_for_sort = unix_edt;
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
  

// Sorting the schedule based on EDT. Need a specific EDT_for_sort that uses the
// unix time format, as otherwise would run into issues with buses that leave early
// the next morning. (i.e. a bus leaving at 12:30 AM Tuesday would show up as leaving before
// a bus that departs at 11:00 PM Monday, since 12:30 AM is earlier than 11:00 PM)

function sortFunction(a, b) {
  if (a.EDT_for_sort === b.EDT_for_sort) {
    return 0;
  }
  else {
    return (a.EDT_for_sort < b.EDT_for_sort ? -1 : 1);
  }
}

function displayTimetable (schedule, colormap, colors, colorcount) {
  var timediv = document.getElementById("timetable_panel");
  var linebreak = document.createElement("br");
  var eta, dest, route, edt, flag;

  var posi = document.getElementById("timetable_panel").getBoundingClientRect();

  // Remove all of the previous timetable data (would otherwise just keep appending)
  $('.timedata').remove();
  // WILL NEED TO CHANGE FOR LOOP SIZE TO ACCOUNT FOR SCREEN SIZE
  for (var i = 0; i < schedule.length; i++) {

      if (!colormap[schedule[i].Route]) {
        colormap[schedule[i].Route] = colors[colorcount];
        colorcount++;
      } 

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
      div.appendChild(route);
      
      route.innerHTML = "<svg height=\"75px\" width=\"100%\" top=\"50%\" left=\"50%\"  display=\"block\"> " + 
        "<circle r=\"25\" cx=\"50%\" cy=\"50%\" fill=\"" + 
        colormap[schedule[i].Route] + "\" /> " +
        "<text x=\"50%\" y=\"50%\" font-size=\"30px\" fill=\"white\" text-anchor=\"middle\" dy=\".3em\">" +
        schedule[i].Route.toString() + "</text></svg>";


      dest = document.createElement("div");
      dest.className = "timedest";
      dest.innerHTML = schedule[i].Destination;

      edt = document.createElement("div");
      edt.className = "timeedt";

      // This currently stops the countdown until departure at 0 mins - might want to account for buses being 
      // late
      edt.innerHTML = ((schedule[i].UntilDep >= 0) ? schedule[i].UntilDep + " min" : 0 + " min (late)");
      div.appendChild(dest);
      div.appendChild(edt);

  }
  return colormap;
}



