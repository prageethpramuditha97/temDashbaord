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
  "CCO238",
  "CCO1030",
	"CCO16045",
  "CCO23230",
  "CCO2380",
  "CCO263022",
  "CCO28675",
  "CCO30826",
  "CCO3184",
  "CCO3511",
  "CCO39637",
  "CCO4216",
  "CCO508",
  "CCO514",
  "CCO5611",
  "CCO6058",
  "CCO78677",
  "CCO78863",
  "CCO79133",
  "CCO85581",
  "CCO1024",
  "CCO128550",
  "CCO136803",
  "CCO170016",
  "CCO174538",
  "CCO180922",
  "CCO18484",
  "CCO277065",
  "CCO279549",
  "CCO285549",
  "CCO292947",
  "CCO293778",
  "CCO294546",
  "CCO306087",
  "CCO306089",
  "CCO318150",
  "CCO320220",
  "CCO32218",
  "CCO324426",
  "CCO333315",
  "CCO336524",
  "CCO337524",
  "CCO342204",
  "CCO345141",
  "CCO350802",
  "CCO37138",
  "CCO376416",
  "CCO376830",
  "CCO401640",
  "CCO422994",
  "CCO455497",
  "CCO235619",
  "CCO68954",
  "CCO41047",
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
