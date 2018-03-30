<!DOCTYPE html>
<html>

	<head>
		<script src="scripts/getTimetable.js" type="text/javascript"></script> 
	</head>
 
	<body>
		<script>
		   function myFunction(){
			document.write("<p><strong>Estimated Arrival Times</p>");
			var a= document.createElement("script");
			a.src="scripts/getTimetable.js";
			document.body.appendChild(a)
			var x= document.createElement("BUTTON");
			var t = document.createTextNode("Click me");
			
			x.appendChild(t);
			document.body.appendChild(x);
		}
  
		</script>
  
	</body>
</html>