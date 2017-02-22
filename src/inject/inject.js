var bodyTag = document.getElementsByTagName('body')[0];

// Removes HTML inside the body tag and display the timer
function updateTimer(duration){

	// clear body every time
	bodyTag.innerHTML = " ";

	// Displays the timer
	// If the amountOfSeconds is -1, then block infinitly
	// Else block for some amount of time

	// CREATE TIMER ELEMENTS IN DOM
	console.log(duration);
}


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  	if (request.type == "updateInterval") {
  		updateTimer(request.duration);
  	}
});

chrome.extension.sendMessage({type: "newTab"}, function (response) {
	console.log(response);
});
