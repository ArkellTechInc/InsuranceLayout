

//Id names of elements that will be affected by orientation changes
var elements = ["topMenu", "menuButton", "container", "botMenu", "sideMenu", "content"];

var menuVisible;
var menuShowing = false;
var menuHiding = false;

//Animation variables
var menuAnimation = 0; //Means no menuAnimation currently playing
var menuPosition = -250;
var menuPositionTarget = -250;

//---------------------------------------------------- Media query handling

var portraitBool = true;
var desktopBool = false;
var orientation = "Portrait";

var portraitQuery = window.matchMedia("(orientation: portrait)");
var desktopQuery = window.matchMedia("(min-device-width: 800px)");

//Update functions set the bools that can be accessed at any time
function portraitUpdate(portraitQuery) {
	portraitBool = portraitQuery.matches;
	switchLayout();
}
function desktopUpdate(desktopQuery) {
	desktopBool = desktopQuery.matches;
	switchLayout();
}
portraitUpdate(portraitQuery); // Call update functions once at run time
desktopUpdate(desktopQuery);
portraitQuery.addListener(portraitUpdate); // Attach listeners to trigger updates on state changes
desktopQuery.addListener(desktopUpdate);



function switchLayout(){
	//Determines layout to switch to based on portraitBool and desktopBool, then switches to it
	if (portraitBool) { 	// Portrait phone mode
		orientation = "Portrait";
	} else {
		if (!desktopBool) { //Landscape iPad mode
			orientation = "Landscape";
		} else { 			//Desktop mode
			orientation = "Desktop";
		}
	}
	switchOrientation(orientation);
}


function switchOrientation(mode) {
	//mode must be "Portrait", "Landscape", or "Desktop"
	//Switch classes
	for (i = 0; i < elements.length; i++){
		var divElement = document.getElementById(elements[i]); //Get id by name
		divElement.className = elements[i] + mode; //Set corresponding class by concatenating the name with mode
	}
	
	switch (mode) {
		case "Portrait": 
			hideMenu();
			//Other responsive anim tings go here
			break;
		case "Landscape":
			hideMenu();
			//Other responsive anim tings go here
			break;
		case "Desktop":
			showMenu();
			//Other responsive anim tings go here
			break;
	}
}



// ---------------------------------------------------- Menu Functions


function toggleMenu() {
	if(menuVisible){
		hideMenu();
	} else {
		showMenu();
	}
}

function showMenu() {
	menuVisible = true;
	
    menuPositionTarget = 0;
	clearInterval(menuAnimation);
    menuAnimation = setInterval(updateMenu, 15);
	
}

function hideMenu() {
	menuVisible = false;
	
    menuPositionTarget = -250;
	clearInterval(menuAnimation);
    menuAnimation = setInterval(updateMenu, 15);
}

function updateMenu(){
	//Math.do()
	
	if (Math.abs(menuPosition - menuPositionTarget) < 1) { //Close enough to target, snap to target and stop animation
		menuPosition = menuPositionTarget;
		clearInterval(menuAnimation);
		menuAnimation = 0;
	} else {
		menuPosition = (menuPosition * 9 + menuPositionTarget) / 10; //Smooth animate function 
	}
	
	//Update CSS based on menuPosition and other variables
	
	document.getElementById("sideMenu").style.left = menuPosition + 'px'; 
	
	if(orientation == "Portrait"){
		document.getElementById("container").style.left	 = (menuPosition + 250) / 2 + "px";
		document.getElementById("container").style.width = "100vw";
	}
	if(orientation == "Landscape"){
		document.getElementById("container").style.left	 = (menuPosition + 250) + "px";
		document.getElementById("container").style.width = "calc(100vw - " + (menuPosition + 250) + "px)";
	}
	if(orientation == "Desktop"){
		document.getElementById("container").style.left	 = (menuPosition + 250) + "px";
		document.getElementById("container").style.width = "calc(100vw - " + (menuPosition + 250) + "px)";
	}
	
}