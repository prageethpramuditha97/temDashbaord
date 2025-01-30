

var server = "https://officemanagement-01725a3093a3.herokuapp.com/";
function getDetails(){
	var url = server + "api/student_info/"
	var obj = {
		"SR_no" : document.getElementById("SRNo").value
	}
	document.getElementById("loading").classList.remove("d-none");
	
	
	document.getElementById("name").innerHTML = "";
	document.getElementById("Memebr_ID").innerHTML = "";
	document.getElementById("nic").innerHTML = "";
	document.getElementById("email").innerHTML = "";
	document.getElementById("mobile").innerHTML = "";
	document.getElementById("activation").innerHTML = "";
	document.getElementById("marketplace").innerHTML = "";
	document.getElementById("courseType").innerHTML = "";
	document.getElementById("Medium").innerHTML = "";
			
	document.getElementById("j").innerHTML = "";
	document.getElementById("a").innerHTML = "";
	document.getElementById("h").innerHTML = "";
	document.getElementById("f").innerHTML = "";
			
	document.getElementById("Sponser").innerHTML = "";
	document.getElementById("Sponser_Name").innerHTML = "";
			
			
			
	$.ajax({
		type: 'POST',
		url: url,
		data : obj,
		success: function(resultData) {
			var fullName = resultData.firstname.charAt(0).toUpperCase() + resultData.firstname.slice(1) + " " + resultData.lastname.charAt(0).toUpperCase() + resultData.lastname.slice(1);
			document.getElementById("name").innerHTML = fullName;
			document.getElementById("Memebr_ID").innerHTML = resultData.username;
			document.getElementById("nic").innerHTML = resultData.nic;
			document.getElementById("email").innerHTML = resultData.email;
			document.getElementById("mobile").innerHTML = resultData.mobile;
			document.getElementById("activation").innerHTML = resultData.subscription;
			document.getElementById("marketplace").innerHTML = resultData.marketplace;
			document.getElementById("courseType").innerHTML = resultData.class_type;
			document.getElementById("Medium").innerHTML = resultData.medium;
			
			document.getElementById("j").innerHTML = resultData.join_date;
			document.getElementById("a").innerHTML = resultData.activation_date ;
			document.getElementById("h").innerHTML = resultData.half_act_date;
			document.getElementById("f").innerHTML = resultData.full_act_date;
			
			document.getElementById("Sponser").innerHTML = "CCO" + resultData.sponsor;
			document.getElementById("Sponser_Name").innerHTML = resultData.sponsor_name;
			document.getElementById("loading").classList.add("d-none");
			console.log(resultData);
			
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	});
}

window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    getDetails();
  }
});

//getDetails(obj);

function copy(elm){
	// Get the text field
	var copyText = document.getElementById(elm);
	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText.innerHTML);
}