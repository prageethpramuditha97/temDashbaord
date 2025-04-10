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
