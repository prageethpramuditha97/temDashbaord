if(localStorage.getItem("tem_access") == "nuwan@eclub.lk"){
	
}
else {
	if(localStorage.getItem("login_obj_for_validate_support") == "" || localStorage.getItem("login_obj_for_validate_support") == null){
		window.location.href= "./index.html";
	}
	else {
		data = JSON.parse(localStorage.getItem("login_obj_for_validate_support"));
		
		document.getElementById("profile_pic").src = data.profile_image;
		document.getElementById("loggin_name").innerHTML = data.firstname + " " + data.lastname;
		document.getElementById("logginID").innerHTML = data.username;
	}
}

function logOut(){
	localStorage.setItem("login_obj_for_validate_support", "");
	localStorage.setItem("login_obj_for_validate_st_time", "");
	localStorage.setItem("tem_access", "");
	window.location.href= "./index.html";
}
/*else {
	data = JSON.parse(localStorage.getItem("login_obj_office_OS.eclub.lk"));
	
	/*if(data[1].ID == "OS003"){
		document.getElementById("profile_pic").src = "../images/prageeth.jpg";
	}
	if(data[1].ID == "OS004"){
		document.getElementById("profile_pic").src = "https://firebasestorage.googleapis.com/v0/b/eclubhr-ffe79.appspot.com/o/sasanthi.png?alt=media&token=493ff9dc-bdbc-4746-9dc8-12dbab87cf23";
	}
	if(data[1].ID == "OS005"){
		document.getElementById("profile_pic").src = "https://firebasestorage.googleapis.com/v0/b/eclubhr-ffe79.appspot.com/o/lakshan.png?alt=media&token=4dd48f65-7cd8-41d6-97e3-c3b1d59ea4ae";
	}
	if(data[1].ID == "OS006"){
		document.getElementById("profile_pic").src = "https://firebasestorage.googleapis.com/v0/b/eclubhr-ffe79.appspot.com/o/thiwanka.png?alt=media&token=dfa96497-1783-4d8a-ae3c-4dc57076ed3b";
	}
	if(data[1].ID == "OS007"){
		document.getElementById("profile_pic").src = "https://firebasestorage.googleapis.com/v0/b/eclubhr-ffe79.appspot.com/o/sudeshini.png?alt=media&token=13f29309-6658-47f4-bb71-42acef20a9f0";
	}
	if(data[1].ID == "OS008"){
		document.getElementById("profile_pic").src = "";
	}
	if(data[1].ID == "OS009"){
		document.getElementById("profile_pic").src = "https://firebasestorage.googleapis.com/v0/b/eclubhr-ffe79.appspot.com/o/charith.png?alt=media&token=1bb9c458-f584-4275-9bcd-df6e376f7aec";
	}
	if(data[1].ID == "OS010"){
		document.getElementById("profile_pic").src = "https://firebasestorage.googleapis.com/v0/b/eclubhr-ffe79.appspot.com/o/randika.png?alt=media&token=3f8ee6b6-1f2a-4a6f-aa66-b0ecf3c6ea9a";
	}
	document.getElementById('loggin_name').innerHTML =  data[1].FullName;
	document.getElementById('logginID').innerHTML =  data[1].ID;
	
}*/

function toggleDropdown() {
    const menu = document.getElementById("dropdown-menu");
    const icon = document.getElementById("dropdown-icon");

    if (menu.classList.contains("max-h-0")) {
        menu.classList.remove("max-h-0", "opacity-0");
        menu.classList.add("max-h-60", "opacity-100");
        icon.classList.add("rotate-180");
    } else {
        menu.classList.remove("max-h-60", "opacity-100");
        menu.classList.add("max-h-0", "opacity-0");
        icon.classList.remove("rotate-180");
    }
}
		
function resetUI(){
	document.getElementById("std_name").innerHTML = "<div class=\"h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2\"></div>";
	document.getElementById("std_sr").innerHTML = "<div class=\"h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mb-2\"></div>";
	
	document.getElementById("spnsr_name").innerHTML = "<div class=\"h-2.5 bg-gray-200 rounded-full w-48 mb-2 animate-pulse \"></div>";
	document.getElementById("spnsr_cco").innerHTML = "<div class=\"h-2 bg-gray-200 rounded-full w-28 mb-2  animate-pulse \"></div>";
	
	document.getElementById("std_avtivation").innerHTML = "";
	document.getElementById("std_marketplace").innerHTML = "";
	document.getElementById("spnsr_placement").innerHTML = "";
	
	document.getElementById("std_profile").src = "https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg"; 
	document.getElementById("spnsr_profile").src = "https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg"; 
	
	document.getElementById("lvl1").innerHTML = "-- -- ----";
	document.getElementById("lvl2").innerHTML = "-- -- ----";
	document.getElementById("lvl3").innerHTML = "-- -- ----";
	document.getElementById("lvl4").innerHTML = "-- -- ----";
	updateProgress(0);
}

resetUI();

var server = "https://officemanagement-01725a3093a3.herokuapp.com/";
function getDetails(){
	resetUI();
	var url = server + "api/student_info/"
	input = document.getElementById("input").value;
	filter = document.getElementById("filter").value;
	
	let spinner = document.getElementById("loadingSpinner");
    spinner.classList.remove("hidden");
	
	var obj = {
		"SR_no" : input,
		"type" : filter,
	}
	let statusOfFindData = "";
	$.ajax({
		type: 'POST',
		url: url,
		data : obj,
		success: function(resultData) {
			//document.getElementById("accountsList").innerHTML  = "";
			if(resultData != 'No user details were found.'){
				statusOfFindData == "Record Founded";
				spinner.classList.add("hidden");
				document.getElementById("std_sr").innerHTML = resultData.username;
				document.getElementById("std_name").innerHTML = resultData.firstname + " " + resultData.lastname;
				document.getElementById("std_avtivation").innerHTML = resultData.subscription;
				
				document.getElementById("std_avtivation").classList.remove("bg-green-100");
				document.getElementById("std_avtivation").classList.remove("text-green-800");
				document.getElementById("std_avtivation").classList.remove("bg-yellow-100");
				document.getElementById("std_avtivation").classList.remove("text-yellow-800");
				document.getElementById("std_avtivation").classList.remove("bg-red-100");
				document.getElementById("std_avtivation").classList.remove("text-red-800");
				if(resultData.subscription == "full"){
					document.getElementById("std_avtivation").classList.add("bg-green-100");
					document.getElementById("std_avtivation").classList.add("text-green-800");
										
					updateProgress(4); 
					
					document.getElementById("lvl1").innerHTML = resultData.join_date.split(" ")[0];
					document.getElementById("lvl2").innerHTML = resultData.activation_date.split(" ")[0];
					if(resultData.half_act_date != null){
						document.getElementById("lvl3").innerHTML = resultData.half_act_date.split(" ")[0];
					}
					document.getElementById("lvl4").innerHTML = resultData.full_act_date.split(" ")[0];
					
					
				}
				if(resultData.subscription == "half"){
					document.getElementById("std_avtivation").classList.add("bg-yellow-100");
					document.getElementById("std_avtivation").classList.add("text-yellow-800");
					updateProgress(3); 
					
					document.getElementById("lvl1").innerHTML = resultData.join_date.split(" ")[0];
					document.getElementById("lvl2").innerHTML = resultData.activation_date.split(" ")[0];
					document.getElementById("lvl3").innerHTML = resultData.half_act_date.split(" ")[0];
					
				}
				if(resultData.subscription == "pending"){
					document.getElementById("std_avtivation").classList.add("bg-red-100");
					document.getElementById("std_avtivation").classList.add("text-red-800");
					if(resultData.join_date != null){
						document.getElementById("lvl1").innerHTML = resultData.join_date.split(" ")[0];
					}
					else {
						document.getElementById("lvl1").innerHTML = resultData.created_date.split(" ")[0];
					}
					updateProgress(1); 
				}
				document.getElementById("std_marketplace").innerHTML = resultData.marketplace; 

				document.getElementById("spnsr_name").innerHTML = resultData.sponsor.fullname;
				document.getElementById("spnsr_cco").innerHTML = "CCO" + resultData.sponsor.id;
				document.getElementById("spnsr_placement").innerHTML = "Placement : " + resultData.placement_id; 
				
				
				checkImageURL(resultData.profile_image).then((isAccessible) => {
					if (isAccessible) {
						document.getElementById("std_profile").src = resultData.profile_image; 
					} else {
						document.getElementById("std_profile").src = "https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg"; 
					}
				});	

				document.getElementById("order_list").innerHTML = "";
				
				
				document.getElementById("username").innerHTML = resultData.username + "<span class=\"bg-blue-100 text-blue-800 text-xs font-medium me-2 ms-4 px-2.5 py-0.5 rounded-full\">Pay ID : " + resultData.payid + "</span>"; 
				document.getElementById("full_name").innerHTML = resultData.firstname + " " + resultData.lastname; 
				document.getElementById("marketplace").innerHTML = resultData.marketplace; 
				document.getElementById("medium").innerHTML = resultData.medium; 
				document.getElementById("contact_number").innerHTML = resultData.mobile; 
				document.getElementById("nic").innerHTML = resultData.nic; 
				document.getElementById("email").innerHTML = resultData.email; 
				document.getElementById("grp").innerHTML = resultData.team; 
				
				document.getElementById("dob").innerHTML = resultData.dob; 
				document.getElementById("gender").innerHTML = resultData.gender; 
				
				
				
				for(var b = 0 ; b < resultData.orders.length; b++){
					if(resultData.orders[b].notes != ""){
						document.getElementById("order_list").innerHTML += `
						  <li class="p-4 flex flex-col justify-between items-start hover:bg-gray-50 transition">
							<div class="flex justify-between w-full">
							  <span class="font-semibold text-gray-900">${resultData.orders[b].product_name}</span>
							  <span class="text-sm text-gray-500 text-end">${resultData.orders[b].create_date}</span>
							</div>
							<div class="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
							  ${resultData.orders[b].notes}
							</div>
						  </li>`;
					}
					else{
						document.getElementById("order_list").innerHTML +=	"<li class=\"p-4 flex justify-between items-center hover:bg-gray-50 transition\">" +
									"	<span class=\"font-semibold text-gray-900\">" + resultData.orders[b].product_name + "</span>" +
									"	<span class=\"text-sm text-gray-500 text-end\">" + resultData.orders[b].create_date + "</span>" +
									"</li>";
					}
					
				}
				
	
			}
			else {
				spinner.classList.add("hidden");
				alert("No user found");
				statusOfFindData == "Record Not-Founded";
			}

			var obj2 = {
				"data" : document.getElementById("input").value + " was searched by " + document.getElementById("loggin_name").innerHTML + "( " + 
					document.getElementById("logginID").innerHTML + " )" + " on",
				"result" : statusOfFindData
			}
			let url2 = server + "api/log/"
			$.ajax({
				type: 'POST',
				url: url2,
				data : obj2,
				success: function(resultData) {
					
				}
			});
			
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	});

	
}

// Function to update the progress bar and step circles
function updateProgress(completedSteps) {
	//get all steps borders
	let borders = [document.getElementById("step-1T"), document.getElementById("step-2T"), document.getElementById("step-3T"), document.getElementById("step-4T")];
    // Get all step circles
    let steps = [document.getElementById("step-1"), document.getElementById("step-2"), document.getElementById("step-3"), document.getElementById("step-4")];

	// Loop through and update step circle colors
    borders.forEach((borders, index) => {
        if (index < completedSteps) {
            borders.classList.remove("border-gray-200");
            borders.classList.add("border-green-600");
        } else {
            borders.classList.remove("border-green-600");
            borders.classList.add("border-gray-200");
        }
    });
	
    // Loop through and update step circle colors
    steps.forEach((step, index) => {
        if (index < completedSteps) {
            step.classList.remove("bg-gray-200");
            step.classList.add("bg-gradient-to-r" , "from-green-600", "to-green-400");
        } else {
            step.classList.remove("bg-gradient-to-r" , "from-green-600", "to-green-400");
            step.classList.add("bg-gray-200");
        }
    });
}

// Example Usage - Change the number inside updateProgress(n) to see updates dynamically
updateProgress(0); // Updates step 1 & 2 to green, keeps the rest gray

var tabs = [
	"activation_tab",
	"basic_ifo_tab",
	"orders_tab",
	"interview_details_tab",
	"teligram_grps_tab",
]


var divs = [
	"activation_details",
	"basic_info",
	"order_details",
	"interview_details",
	"teligram_grps",
]

function viewDetails(tabid , divId){
	for(var a = 0; a < tabs.length; a++){
		document.getElementById(tabs[a]).classList.remove("text-blue-600" , "border-blue-600" , "active");
		document.getElementById(tabs[a]).classList.add("border-transparent" , "hover:text-gray-600" , "hover:border-gray-300");
		
	}
	document.getElementById(tabid).classList.add("text-blue-600" , "border-blue-600" , "active");
	document.getElementById(tabid).classList.remove("border-transparent" , "hover:text-gray-600" , "hover:border-gray-300");
	
	for(var b = 0; b < divs.length; b++){
		document.getElementById(divs[b]).classList.add("hidden");
	}
	document.getElementById(divId).classList.remove("hidden");
	
}

function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let menuBtn = document.getElementById("menu-btn");

    sidebar.classList.toggle("-translate-x-full");

    // Hide menu button when sidebar is open
    if (!sidebar.classList.contains("-translate-x-full")) {
        menuBtn.classList.add("hidden");
    } else {
        menuBtn.classList.remove("hidden");
    }
}

function checkImageURL(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(true);  // Image loaded successfully
        img.onerror = () => resolve(false); // Error loading image
    });
}

window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter") {
		getDetails();
	}
  
});



