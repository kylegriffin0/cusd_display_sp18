function createDropdown(msg) {
	var dropdowndiv = document.getElementById("dropdown")
	var stops = document.createElement('select')
	stops.setAttribute("id", "stopsDropdown")
	var item = new Option("testing", "123");
	stops.appendChild(item);
	dropdowndiv.appendChild(stops);
}