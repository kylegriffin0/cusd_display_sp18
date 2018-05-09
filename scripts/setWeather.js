function setWeather(weather) {
	var panel = document.getElementById("weather_panel");
	var temp = weather["query"]["results"]["channel"]["item"]["condition"]["temp"];
	var weathericon = new Image();

	switch (parseInt(weather["query"]["results"]["channel"]["item"]["condition"]["code"])) {
		case 30:
			weathericon.src = "images/weathericons/partlycloudy 2.png";
			console.log("here");
			break;
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 37:
		case 38:
		case 39:
		case 45:
		case 47:
			weathericon.src = "images/weathericons/lightning.png";
			break;

	}

	weathericon.style = "width:30%;height:70%;display:inline-block"
	panel.innerHTML = temp + "˚ F";
	panel.appendChild(weathericon);
}