var centerParent = document.createElement("div");
centerParent.setAttribute("id", "centerParent");

var timer = document.createElement("div");

timer.setAttribute('id', 'cd94ec90364da372eb1a980c7ffb36e5654d7e2cd92cb810be418adb36fe2434');

timer.appendChild(document.createTextNode("This Page is Blocked By Timeout and will be Unlocked In:"));
timerText = document.createElement("div");
timerText.style.fontSize = '15vw';
timer.appendChild(timerText);

centerParent.appendChild(timer);

// Removes HTML inside the body tag and display the timer
function updateTimer(duration) {

	// Erase body if a div tag with an id of cd94ec90364da372eb1a980c7ffb36e5654d7e2cd92cb810be418adb36fe2434 does not exist
	if(document.getElementById('cd94ec90364da372eb1a980c7ffb36e5654d7e2cd92cb810be418adb36fe2434') == null){
		removeBodyHTML();
	}
	displayTimer(duration);
}

// Removes HTML inside the body tag
function removeBodyHTML() {
	window.stop();

	var bodyTag = document.body;
	bodyTag.setAttribute('id', 'newBody');

	if (!bodyTag) return;

	// Clear the original body tag
	bodyTag.innerHTML = "";

	// Append the timer to the body tag
	bodyTag.appendChild(timer);
}


function formatSeconds(sec) {
	let hrs = Math.floor(sec / 3600);
    let min = Math.floor(sec % 3600 / 60);
    sec = sec % 60;

    let display = "";

    if (hrs > 0) display += hrs + "h ";
    display += min + "m ";
    display += sec + "s";

    return display;
}

// Displays the timer
// If the amountOfSeconds is -1, then block infinitly
// Else block for some amount of time
function displayTimer(amountOfSeconds) {
	if (amountOfSeconds > -1) {
		timerText.innerText = formatSeconds(amountOfSeconds);
	}
	else if (amountOfSeconds == -1) {
		// Block infinitly
		timerText.innerHTML = '∞';
	}
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  	if (request.type == "updateInterval") {
  		updateTimer(request.duration);
  	}
  	else if(request.type == "endInterval"){
		window.location.reload();
	}
});
