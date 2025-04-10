if(localStorage.getItem("login_obj_office_OS.eclub.lk") == "" || localStorage.getItem("login_obj_office_OS.eclub.lk") == null){
	window.location.href= "./index.html";
}
else {
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
	}*/
	document.getElementById('loggin_name').innerHTML =  data[1].FullName;
	document.getElementById('logginID').innerHTML =  data[1].ID;
}

var server = "https://officemanagement-01725a3093a3.herokuapp.com/";

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

function toggleEmailDropdown() {
    const dropdown = document.getElementById("dropdown-menu2");
    const icon = document.getElementById("dropdown-icon2");

    if (dropdown.classList.contains("opacity-0")) {
        dropdown.classList.remove("opacity-0", "invisible");
        dropdown.classList.add("opacity-100", "visible");
        icon.classList.add("rotate-180");
    } else {
        dropdown.classList.add("opacity-0", "invisible");
        dropdown.classList.remove("opacity-100", "visible");
        icon.classList.remove("rotate-180");
    }
}

function selectEmailOption(id){
	toggleEmailDropdown();
	document.getElementById("mainName").innerHTML = id;
	getMeetingDetails(id);
}

function getISTTime(time){
	const utcTime = time;

	// Convert to local timezone (Example: IST)
	const options = {
	  day: "2-digit",
	  month: "2-digit",
	  year: "numeric",
	  hour: "2-digit",
	  minute: "2-digit",
	  second: "2-digit",
	  timeZone: "Asia/Kolkata",
	  hour12: false // Use 24-hour format
	};

	const formattedTime = new Intl.DateTimeFormat("en-GB", options).format(new Date(utcTime));

	// Replace default separators to match DD:MM:YYYY HH:mm:ss
	const finalTime = formattedTime.replace(",", "");

	return finalTime;
}

var topic = "";
var start_time = "";
var created_at = "";

async function getMeetingsData(id) {
    try {
        const response = await fetch(server + "api/zoom/account/meetings/", {
            method: 'POST', // Can be 'POST', 'PUT', or 'PATCH'
            headers: {
                'Content-Type': 'application/json', // Specify JSON content type
            },
            body:  JSON.stringify({
				"email" : id,
				"date" : new Date().toISOString().split('T')[0],
			})
        });
		
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        var result = await response.json();
		result = result.data;
		if(result.length == 0){
			document.getElementById("noMeetingFoundAlert").classList.remove("hidden");
		}
		for(var i = 0 ; i < result.length; i++){
			
			const response2 = await fetch(server + "api/zoom/meeting/get_registrators_counts/", {
				method: 'POST', // Can be 'POST', 'PUT', or 'PATCH'
				headers: {
					'Content-Type': 'application/json', // Specify JSON content type
				},
				body:  JSON.stringify({
					"meeting_id" : result[i].id,
				})
			});

			if (!response2.ok) {
				throw new Error(`HTTP error! Status: ${response2.status}`);
			}

			var result2 = await response2.json();
			
			if(result2.Pending != undefined){
				document.getElementById("meetinList").innerHTML += `<li class="p-4 bg-white rounded-lg shadow-md border border-gray-300 rounded-lg hover:bg-gray-100">
					<div class="flex items-center justify-between">
						<div>
							<h3 class="font-semibold text-gray-700">${result[i].topic}</h3>
							<p class="hidden" id="${result[i].id + "_date"}">${getISTTime(result[i].start_time).split(" ")[0]}</p>
							<p class="text-sm text-gray-500">Scheduled At: ${getISTTime(result[i].start_time)} | Created At: ${getISTTime(result[i].created_at)}</p>
						</div>
						<div class="text-center">
							<table class="border-collapse">
								<thead>
									<tr class="text-sm font-semibold">
										<th class="px-4 py-1 text-gray-600 border-r border-gray-300">Pending</th>
										<th class="px-4 py-1 text-green-600 border-r border-gray-300">Active</th>
										<th class="px-4 py-1 text-red-600">Rejected</th>
									</tr>
								</thead>
								<tbody>
									<tr class="text-sm font-semibold">
										<td class="px-4 py-1 text-gray-600 border-r border-gray-300" id="${result[i].id + "_count1"}">${result2.Pending}</td>
										<td class="px-4 py-1 text-green-600 border-r border-gray-300" id="${result[i].id + "_count2"}">${result2.Approved}</td>
										<td class="px-4 py-1 text-red-600" id="${result[i].id + "_count3"}">${result2.Denied}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="mt-4">
						<div class="flex gap-4 items-center">
							<input type="number" class="w-full md:w-3/12 p-2 border border-gray-200 rounded-md" value="${result[i].id}" id="${result[i].id + "_1"}" disabled>
							<select class="p-2 border rounded w-4/12" id="${result[i].id + "_2"}">
								<option value="">Select Course</option>
								<option value="course1">Digital Wealth Guide</option>
								<option value="course2">Graphic Designing</option>
							</select>
							
							<select class="p-2 border rounded w-2/12" id="${result[i].id + "_3"}">
								<option value="">Select Activation</option>
								<option value="full">Full</option>
								<option value="half">Half</option>
							</select>
							<button class="p-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-900 w-3/12" onclick="ProcessReq('${result[i].id}')">
								Process Request
							</button>
						</div>
					</div>
				</li>`
			}
			else {
				
				document.getElementById("meetinList").innerHTML += `<li class="p-4 bg-white rounded-lg shadow-md border border-gray-300 rounded-lg hover:bg-gray-100">
					<div class="flex items-center justify-between">
						<div>
							<h3 class="font-semibold text-gray-700">${result[i].topic}</h3>
							<p class="hidden" id="${result[i].id + "_date"}">${getISTTime(result[i].start_time).split(" ")[0]}</p>
							<p class="text-sm text-gray-500">Scheduled At: ${getISTTime(result[i].start_time)} | Created At: ${getISTTime(result[i].created_at)}</p>
						</div>
						<div class="text-center">
							<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Open Link</span>
						</div>
					</div>
					<div class="">
						
					</div>
				</li>`
			}
		}
		
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

function ProcessReq(id){
	
	var url = server + "api/add/session";
	
	var obj = {
		"meeting_id" : id,
		"course_name" : document.getElementById(id + "_2").value,
		"activation" : document.getElementById(id + "_3").value,
		"batch" : document.getElementById(id + "_4").value,
		"session" : document.getElementById(id + "_5").value,
		"date" : document.getElementById(id + "_date").innerHTML,
	}
	
	$.ajax({
		type: 'POST',
		url: url,
		data : obj,
		success: function(resultData) {
			
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	});
}

function getMeetingDetails(id){
	document.getElementById("meetinList").innerHTML = "";
	document.getElementById("noMeetingFoundAlert").classList.add("hidden");
	
	getMeetingsData(id);
	
	
}
getMeetingDetails('eclubmeeting300.1@gmail.com');


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
