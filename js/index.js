/*if(localStorage.getItem("login_obj_for_validate_cco4") == "" || localStorage.getItem("login_obj_for_validate_cco4") == null){
	
}
else {
	if(getTimeNow().split(" ")[0] != localStorage.getItem("login_obj_for_validate_cco4_time").split(" ")[0]){
		var obj = JSON.parse(localStorage.getItem("login_obj_for_validate_cco4"));
		if(obj.username == "CCO2380" || obj.username == "CCO277065"){
			window.location.href= "./New/Dashboard.html";
		}
	}
	else {
		window.location.href= "./New/Dashboard.html";
	}
}
*/
/*var obj = JSON.parse(localStorage.getItem("login_obj_for_validate_cco4"));
if(obj.username == "CCO2380" || obj.username == "CCO277065"){
	window.location.href= "./dashboard.html";
}*/


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
  "CCO1030",
  "CCO508",
  "CCO238",
  "CCO514",
  "CCO1024",
  "CCO5611",
  "CCO3184",
  "CCO16045",
  "CCO18484",
  "CCO170016",
  "CCO342204",
  "CCO23230",
  "CCO235619",
  "CCO28675",
  "CCO30826",
  "CCO6058",
  "CCO3511",
  "CCO39637",
  "CCO324426",
  "CCO37138",
  "CCO78677",
  "CCO79133",
  "CCO292947",
  "CCO320220",
  "CCO78863",
  "CCO376830",
  "CCO32218",
  "CCO205",
  "CCO174538",
  "CCO279549",
  "CCO220225",
  "CCO306089",
  "CCO294546",
  "CCO180922",
  "CCO263022",
  "CCO135726",
  "CCO2380",
  "CCO136803",
  "CCO277065",
];
//pasidu818@gmail.com //invalid

function findSR(id){
	return ccoCodes.includes(id);
}

var server = "https://officemanagement-01725a3093a3.herokuapp.com/";
function validateEmail(){
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
						localStorage.setItem("login_obj_for_validate_cco4", JSON.stringify(resultData));
						localStorage.setItem("login_obj_for_validate_cco4_time", getTimeNow());
						sendOTP();
						document.getElementById("loading").classList.add("d-none");
					}
					else {
						document.getElementById("loading").classList.add("d-none");
						alert("Access Denied");
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
