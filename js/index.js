if(localStorage.getItem("login_obj_for_validate_support") == "" || localStorage.getItem("login_obj_for_validate_support") == null){
	
}
else {
	if(getTimeNow().split(" ")[0] != localStorage.getItem("login_obj_for_validate_st_time").split(" ")[0]){
		var obj = JSON.parse(localStorage.getItem("login_obj_for_validate_support"));
		if(obj.username == "CCO2380" || obj.username == "CCO277065"){
			window.location.href= "./Dashboard.html";
		}
	}
	else {
		window.location.href= "./Dashboard.html";
	}
}

/*var obj = JSON.parse(localStorage.getItem("login_obj_for_validate_cco4"));
if(obj.username == "CCO2380" || obj.username == "CCO277065"){
	window.location.href= "./dashboard.html";
}*/

if(localStorage.getItem("tem_access") == "nuwan@eclub.lk"){
	window.location.href= "./Dashboard.html";
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



const ccoCodes = [
  "CCO205",
  "CCO136803",
]

//pasidu818@gmail.com //invalid

function findSR(id){
	return ccoCodes.includes(id);
}

var server = "https://officemanagement-01725a3093a3.herokuapp.com/";
function validateEmail(){
	if(document.getElementById("email").value == "nuwan@eclub.lk"){
		localStorage.setItem("tem_access", "nuwan@eclub.lk");
		window.location.href= "./Dashboard.html";
	}
	else {
		document.getElementById("msg").innerHTML = "";
		
		var url = server + "api/student_info/"
		
		//if(findSR(document.getElementById("email").value)){
			var obj = {
				"SR_no" : document.getElementById("email").value,
				"type" : "email",
			}
			document.getElementById("loading").classList.remove("d-none");
			
			$.ajax({
				type: 'POST',
				url: url,
				data : obj,
				success: function(resultData) {
					if(resultData != 'No user details were found.' && resultData.username.replace(/[0-9]/g, '') == "CCO"){
						if(findSR(resultData.username)){
							localStorage.setItem("login_obj_for_validate_support", JSON.stringify(resultData));
							localStorage.setItem("login_obj_for_validate_st_time", getTimeNow());
							document.getElementById("loading").classList.add("d-none");
							window.location.href = "./Dashboard.html";		
						}
						else {
							document.getElementById("loading").classList.add("d-none");
							document.getElementById("msg").innerHTML = "Access Denied";
						}
						
					}
					else {
						document.getElementById("loading").classList.add("d-none");
						document.getElementById("msg").innerHTML = "Invalid Email Address";
					}
					
				},
				error: function(xhr, status, error) {
					console.log(error);
				}
			});
		//}
	}
}

function sendOTP(){
	var url = server + "api/cco4/send_otp/"
	$.ajax({
		type: 'POST',
		url: url,
		data : JSON.parse(localStorage.getItem("login_obj_for_validate_cco4")),
		success: function(resultData) {
			window.location.href = "./validation.html";			
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	});
}

window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
	validateEmail();
  }
  
});

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
