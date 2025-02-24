if(localStorage.getItem("login_obj_for_validate_cco4") == "" || localStorage.getItem("login_obj_for_validate_cco4") == null){
	window.location.href= "./index.html";
}

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function getTimeNow() {
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()), 
        AddZero(now.getMonth() + 1), 
        now.getFullYear()].join("/"), 
        [AddZero(now.getHours()), 
        AddZero(now.getMinutes())].join(":"), 
        now.getHours() >= 12 ? "PM" : "AM"].join(" ");
	return strDateTime;
};

if(getTimeNow().split(" ")[0] != localStorage.getItem("login_obj_for_validate_cco4_time").split(" ")[0]){
	var obj = JSON.parse(localStorage.getItem("login_obj_for_validate_cco4"));
	if(obj.username == "CCO2380" || obj.username == "CCO277065"){
		
	}
	else {
		localStorage.removeItem("login_obj_for_validate_cco4");
		window.location.reload();
	}
}

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
	document.getElementById("ordersSection").classList.add("d-none");
	
	document.getElementById("order").innerHTML = "";
	document.getElementById("msg").innerHTML = "";
	
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
				document.getElementById("ordersSection").classList.remove("d-none");
				for(var x = 0 ; x < resultData.orders.length; x++){
					document.getElementById("order").innerHTML += "<div class=\"row border-bottom p-2\"><div class=\"col-7\">" + resultData.orders[x].product_name + "</div><div class=\"col-5\">" + resultData.orders[x].create_date + "</div></div>";
				}
				console.log(resultData.orders);
			}
			else {
				document.getElementById("SRNo").value = "";
				document.getElementById("email").value = "";
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
		document.getElementById('pay_id').value = "";
	}
	if(id == "email"){
		document.getElementById('SRNo').value = "";
		document.getElementById('pay_id').value = "";
	}
	if(id == "ref"){
		document.getElementById('SRNo').value = "";
		document.getElementById('email').value = "";
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

async function getSR() {
	document.getElementById("msg").innerHTML = "";
	var pay_id = document.getElementById("pay_id").value;
	document.getElementById("loadingSR").classList.remove("d-none");
	
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
	
	const url = server + "api/accounts";
	var obj = new Object({ 
		"pay_id" : pay_id,
	});
	$.ajax({
		type: 'POST',
		url: url,
		data : obj,
		success: function(resultData) {
			if(resultData != 'No user details were found.'){
				console.log(resultData);
				if(resultData.username != null){	
					document.getElementById("loadingSR").classList.add("d-none");
					document.getElementById("SRNo").value = resultData.username.match(/\d/g).join("");
					changeFilter('srno');
					getDetails();
					document.getElementById("pay_id").value = "";
				}
				else {
					document.getElementById("loadingSR").classList.add("d-none");
					document.getElementById("pay_id").value = "";
					if(resultData.files.length > 0){
						document.getElementById("msg").innerHTML = "Payment Slip Uploaded. Activation is Pending.";
					}
					else {
						document.getElementById("msg").innerHTML = "Payment Slip Not Uploaded Yet";
					}
					
					
				}
			}
			else {
				document.getElementById("loadingSR").classList.add("d-none");
				document.getElementById("pay_id").value = "";
				document.getElementById("msg").innerHTML = "Invalid Payment Reference Number";
			}
		},
        error: function (error) {
            console.log(error);
        }
	});
}

window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter") {
		if(document.getElementById("pay_id").value == ""){
			if(document.getElementById("SRNo").value == "" && document.getElementById("email").value == ""){
				
			}
			else {
				getDetails();
			}
		}
		else{
			getSR();
		}
	}
  
});

//getDetails(obj);

function copy(elm){
	// Get the text field
	var copyText = document.getElementById(elm);
	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText.innerHTML);
}