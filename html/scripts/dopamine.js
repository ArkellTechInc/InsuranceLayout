//Id names of elements that will be affected by orientation changes
var elements = ["topMenu", "menuButton", "container", "botMenu", "sideMenu", "content", "topTitle", "sideMenuTitle", "sideMenuPhone", "blackBox", "boxContainer"];

var mySwiper = undefined;
var menuVisible;

//Animation variables
var menuAnimation = 0; //Means no menuAnimation currently playing
var menuProgress = 0; //Number from 0 to 1, 0 means menu closed, 1 means menu open
var menuTarget = 0;
var menuWidth = 300;


//-- Media query handling -------------------------------------------------

var portraitBool = true;
var currentOrientation = "Portrait";
var portraitQuery = window.matchMedia("(orientation: portrait)");

//-- Document is ready :0 ---------------
$(document).ready(function(){
	// Attach listeners to trigger updates on state changes
	portraitQuery.addListener(portraitUpdate); 
	// Call update functions once at run time, Swiper is now initialized here
	portraitUpdate(portraitQuery);
	updateMenu(); 
	//Prevent animation from running if site is loaded on desktop
	menuProgress = menuTarget;
	


});

function initSwiper(){
	mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		direction: 'horizontal',
		longSwipesRatio: 0.35,
		
		// If we need pagination
		pagination: {
		  el: '.swiper-pagination',
		},
		

	});
}

function portraitUpdate(portraitQuery) {
	portraitBool = portraitQuery.matches;
	switchLayout();
}


function switchLayout(){
	//Determines layout to switch to based on portraitBool, then switches to it
	if (portraitBool) { 	// Portrait phone mode
		currentOrientation = "Portrait";
	} else {
		currentOrientation = "Landscape";
	}

	switchOrientation(currentOrientation);
}


function switchOrientation(mode) {
	//mode must be "Portrait" or "Landscape"
	//Switch classes
	for (i = 0; i < elements.length; i++){
		if ($("#" + elements[i]).length > 0){
			$("#" + elements[i]).removeClass();
			$("#" + elements[i]).addClass(elements[i] + mode);//Set corresponding class by concatenating the name with mode
		} else {
			console.log(elements[i] + " doesn't exist");
		}

	}
	
	switch (mode) {
		case "Portrait": 
			//Responsive anim tings go here
			hideMenu();
			
			window.scrollTo(0, 0); //scrolls to top
			
			//Enable pagination
			if(mySwiper == undefined){
				initSwiper();
			}
			
			//Prevent vertical scrolling
			$("body").css("overflow-y", "hidden");
			
			togglePaginationClasses(mode);
			
			
			break;
		case "Landscape":
			//Responsive anim tings go here
			showMenu();
			
			//Disable pagination
			if(mySwiper != undefined){
				mySwiper.destroy();	
			}
			mySwiper = undefined;
			
			//Allow vertical scrolling
			$("body").css("overflow-y", "auto");
			
			togglePaginationClasses(mode);
			
			break;
	}
	
}

function togglePaginationClasses(mode){
	//pages must have id "page1", "page2", etc
	var pageNum = 1;
	while($("#page" + pageNum).length > 0) { //while there exists a page
		switch(mode){
			case "Portrait": 
				$("#page" + pageNum).removeClass();
				$("#page" + pageNum).addClass("swiper-slide");
				break;
			case "Landscape":
				$("#page" + pageNum).removeClass();
				$("#page" + pageNum).addClass("pageLandscape");
				break;
		}
		pageNum++;
	}
}


// -- Menu Functions ------------------------------------------------------

function toggleMenu() {
	if(menuVisible){
		hideMenu();
	} else {
		showMenu();
	}
}

function showMenu() {
	menuVisible = true;
	
	menuTarget = 1;
	clearInterval(menuAnimation);                 //interrupt menu animation if it's already underway
	menuAnimation = setInterval(updateMenu, 15);
}

function hideMenu() {
	menuVisible = false;
	
	menuTarget = 0;
	clearInterval(menuAnimation);                 //interrupt menu animation if it's already underway
	menuAnimation = setInterval(updateMenu, 15);
}

function updateMenu(){
	
	if (Math.abs(menuProgress - menuTarget) < 0.005) { //Close enough to target, snap to target and stop animation
		menuProgress = menuTarget;
		clearInterval(menuAnimation);
		menuAnimation = 0;
	} else {
		menuProgress = (menuProgress * 9 + menuTarget) / 10; //Smooth animate function 
	}
	
	//Update CSS based on menuProgress and other variables
	
	$("#sideMenu").css("left", -menuWidth + menuProgress * menuWidth + 'px'); 
	
	if (menuProgress > 0.5){
		$("#blackBox").css("pointer-events","auto");
	} else {
		$("#blackBox").css("pointer-events","none");
	}
	
	
	if(currentOrientation == "Portrait"){
		
		$("#container").css("left", (menuProgress * menuWidth) / 2 + "px");
		$("#container").css("width", 100 + "vw");
		$("#blackBox").css("opacity",menuProgress);
		
	}
	if(currentOrientation == "Landscape"){
		$("#container").css("left", (menuProgress * menuWidth) + "px");
		$("#container").css("width", "calc(100vw - " + (menuProgress * menuWidth) + "px)");
		$("#blackBox").css("opacity",0);
		$("#blackBox").css("pointer-events","none");
	}
	
	if(mySwiper != undefined){
		mySwiper.update();
	}
}


// -- Pagination Functions ------------------------------------------------


//switches between pagination and scrolling page styles depending on orientation
function pageStyleUpdate() {
	switch (currentOrientation) {
		case "Portrait":
		
			break;
		case "Landscape":
		
			break;
	}
}
