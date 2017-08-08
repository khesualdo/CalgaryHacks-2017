$('#datepick').datetimepicker();
$("#duration").durationPicker();

// Formats the seconds into hours, minutes, and seconds
// Example: 3780 seconds --> 1h 3m
function formatSeconds(sec) {

	let hrs = Math.floor(sec / 3600);
    let min = Math.floor(sec % 3600 / 60);

    let display = "";

    if (hrs > 0) display += hrs + "h ";
    display += min + "m";

    return display;
}

// Creates a new timeout and sends a message to `background.js`
function createTimeout() {

	// Get the element containing all current timeouts
	let timeoutList = document.getElementById("timeoutList");

	// Get information entered by the user
	let url = document.getElementById("url").value.replace("www.", "").replace("https://", "").replace("http://", "").split("/")[0];
	let date = document.getElementById("datepick").value;
	let duration = parseInt(document.getElementById("duration").value);

	// Create a new timeout, if user entered valid information
	if (url && date && duration > 0) {

		// Create a new div with necessary information
		let newTimeout = document.createElement("div");
		newTimeout.appendChild(document.createTextNode(url + " - " + date + " - " + formatSeconds(duration)));

		// Add a new div to the list of other timeouts
		timeoutList.appendChild(newTimeout);

		// Create a call object
		let obj = {
			startAt: Date.parse(date)/1000,
			duration: duration,
			filters: [url],
			type: "addTimeout"
		};

		// Send a message to `background.js`
		chrome.extension.sendMessage(obj, () => {});
	}
}

// Gets the URL of the current page and pastes it into the `Website Filter:` input field
function getCurrentUrl() {
	chrome.extension.sendMessage({type: "getActiveTab"}, (tab) => {
		if (!tab) return;
		document.getElementById("url").value = tab.url.replace("http://", "").replace("https://", "");
	});
}

// Fetched timeouts from Chrome storage and displays them
function populateTimeouts() {
	chrome.extension.sendMessage({type: "getTimeouts"}, (timeouts) => {

		// Timeouts from Chrome storage
		timeouts = timeouts.timeouts;

		// Get the element containing all current timeouts
		let timeoutList = document.getElementById("timeoutList");

		// Iterate over timeouts and append them to `timeoutList`
		for (let timeout of timeouts) {

			let newTimeout = document.createElement("div");
			let date = moment.unix(timeout.startAt).format('MM/DD/YYYY h:mm A');

			newTimeout.appendChild(document.createTextNode(timeout.filters[0] + " - " + date + " - " + formatSeconds(timeout.duration)));

			timeoutList.appendChild(newTimeout);
		}
	});
}

// Displays all current timeouts
populateTimeouts();

$("#createTimeout").click(() => {
	createTimeout();
});

$("#getCurrentUrl").click(() => {
	getCurrentUrl();
});