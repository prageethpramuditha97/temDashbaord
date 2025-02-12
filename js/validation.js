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

var server = "https://officemanagement-01725a3093a3.herokuapp.com/";


window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
	verifyOTP()
  }
  
});

function moveNext(input, index) {
        const inputs = document.querySelectorAll(".otp-input");

        // Allow only numeric input
        input.value = input.value.replace(/[^0-9]/g, '');

        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

        // Move back on backspace
        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && !input.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    }

    function verifyOTP() {
        const inputs = document.querySelectorAll(".otp-input");
        let otp = "";
        inputs.forEach(input => otp += input.value);
		
		var url = server + "api/cco4/validate_otp/"
		document.getElementById("loading").classList.remove("d-none");
		document.getElementById("msg").innerHTML = "";
		var obj = {
			"username" : JSON.parse(localStorage.getItem("login_obj_for_validate_cco4")).username,
			"otp" : otp,
		}
		
		$.ajax({
			type: 'POST',
			url: url,
			data : obj,
			success: function(resultData) {
				document.getElementById("loading").classList.add("d-none");
				if(resultData){
					window.location.href = "./dashboard.html";
				}
				else {
					document.getElementById("msg").innerHTML = "Invalid OTP";
				}
			},
			error: function(xhr, status, error) {
				console.log(error);
			}
		});
    }
