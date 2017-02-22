var bodyTag = document.getElementsByTagName('body')[0];
var timer = document.createElement("div");
timer.setAttribute('id', 'cd94ec90364da372eb1a980c7ffb36e5654d7e2cd92cb810be418adb36fe2434');

var counterColor = '';

// Removes HTML inside the body tag and display the timer
function updateTimer(duration){

	// Erase body if a div tag with an id of cd94ec90364da372eb1a980c7ffb36e5654d7e2cd92cb810be418adb36fe2434 does not exit
	// if( document.getElementById('cd94ec90364da372eb1a980c7ffb36e5654d7e2cd92cb810be418adb36fe2434') == null ){
	// 	removeBodyHTML();
	// }
	displayTimer(duration);
}

// Removes HTML inside the body tag
function removeBodyHTML(){

	// Clear the original body tag
	bodyTag.innerHTML = "";

	// Set the body background color
	document.body.style.backgroundColor = "black";

	// Append the timer to the body tag
	bodyTag.appendChild(timer);
}

// Displays the timer
// If the amountOfSeconds is -1, then block infinitly
// Else block for some amount of time
function displayTimer(amountOfSeconds){

		if(amountOfSeconds > -1){

			// Convert seconds to HH:MM:SS
			var date = new Date(null);
			date.setSeconds(amountOfSeconds);
			var result = date.toISOString().substr(11, 8);

			timer.innerHTML = result;
		}else if(amountOfSeconds == -1){

			// Block infinitly
			timer.innerHTML = '∞';

		}
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  	if (request.type == "updateInterval") {
  		updateTimer(request.duration);
  	}else if(request.type == "endInterval"){

		}
});
