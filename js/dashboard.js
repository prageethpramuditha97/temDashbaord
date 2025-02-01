var filter = "srno";

var server = "https://officemanagement-01725a3093a3.herokuapp.com/";
function getDetails(){
	var url = server + "api/student_info/"
	var sr = "";
	if(filter == "srno"){
		sr = document.getElementById("SRNo").value;
	}
	if(filter == "email"){
		sr = document.getElementById("email").value;
	}
	
	var obj = {
		"SR_no" : sr,
		"type" : filter,
	}
	document.getElementById("loading").classList.remove("d-none");
	
	
	document.getElementById("name").innerHTML = "";
	document.getElementById("Memebr_ID").innerHTML = "";
	document.getElementById("nic").innerHTML = "";
	document.getElementById("email_on_list").innerHTML = "";
	document.getElementById("mobile_on_list").innerHTML = "";
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
			console.log(resultData);
			if(resultData != 'No user details were found.'){
				var fullName = resultData.firstname.charAt(0).toUpperCase() + resultData.firstname.slice(1) + " " + resultData.lastname.charAt(0).toUpperCase() + resultData.lastname.slice(1);
				document.getElementById("name").innerHTML = fullName;
				document.getElementById("Memebr_ID").innerHTML = resultData.username;
				document.getElementById("nic").innerHTML = resultData.nic;
				document.getElementById("email_on_list").innerHTML = resultData.email;
				document.getElementById("mobile_on_list").innerHTML = resultData.mobile;
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
			}
			else {
				document.getElementById("loading").classList.add("d-none");
				alert("No user found");
			}
			
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	});
}

function changeFilter(id){
	if(id == "srno"){
		document.getElementById('email').value = "";
	}
	if(id == "email"){
		document.getElementById('SRNo').value = "";
	}
	//document.getElementById(filter).classList.remove("btn-success");
	filter = id;
	//document.getElementById(filter).classList.add("btn-success");
	/*if (event.key === "S") {
		console.log(filterList[filter]);
		document.getElementById(filterList[filter]).classList.remove("selected_filter");
		filter = filter + 1;
		if(filter == 3){
			filter = 0;
		}
		document.getElementById(filterList[filter]).classList.add("selected_filter");
	}*/
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