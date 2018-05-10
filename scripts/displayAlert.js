function displayAlerts(alertMsg) {

	var greenstreet = [11, 14, 17, 20, 21, 30, 31, 32, 36, 37, 40, 43, 51, 52, 53, 65, 67, 90];
	var i,scrollbar;
	
	scrollbar = document.createElement('div');
	scrollbar.id = "scrollbar";
	scrollbar.behavior = "scroll";
	scrollbar.direction = "left";
//	scrollbar.innerHTML = "testing";
	console.log("HE");
	var temp = document.createElement("p");
	temp.innerHTML = "SERVICE ALERTS"; 
	scrollbar.appendChild(temp);
	//scrollbar.innerHTML = "<marquee behavior=\"scroll\" direction=\"left\">SERVICE ALERTS !! </marquee>";
	document.getElementById("back_panel").appendChild(scrollbar);

	for (i = 0; i < alertMsg.length; i++)
	{	
		
		
			console.log("HELO");
			temp.innerHTML = alertMsg.messageId;
			temp.innerHTML = alertMsg.Message;
				
	}
}
		
		
	/*if ((greenstreet.includes(alertMsg[i].Routes)) && (greenstreet.Priority ==1))
		{	
			console.log(alertMsg.Message);
	*/
	