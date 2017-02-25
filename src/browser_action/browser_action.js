$('#datepick').datetimepicker();
$("#duration").durationPicker();

function formatSeconds(sec) {
	let hrs = Math.floor(sec / 3600);
    let min = Math.floor(sec % 3600 / 60);

    let display = "";

    if (hrs > 0) display += hrs + "h ";
    display += min + "m";

    return display;
}

function createTimeout() {
	let timeoutList = document.getElementById("timeoutList");
	let url = document.getElementById("url").value.replace("www.", "").replace("https://", "").replace("http://", "").split("/")[0];
	let date = document.getElementById("datepick").value;
	let duration = parseInt(document.getElementById("duration").value);
	
	if (url && date && duration > 0) {
		let newTimeout = document.createElement("div");
		newTimeout.appendChild(document.createTextNode(url + " - " + date + " - " + formatSeconds(duration)));

		timeoutList.appendChild(newTimeout);

		let obj = {
			startAt: Date.parse(date)/1000,
			duration: duration,
			filters: [url],
			type: "addTimeout"
		};

		chrome.extension.sendMessage(obj, () => {});
	}
}

function getCurrentUrl() {
	chrome.extension.sendMessage({type: "getActiveTab"}, (tab) => {
		if (!tab) return;
		
		document.getElementById("url").value = tab.url.replace("http://", "").replace("https://", "");
	});
}

function populateTimeouts() {
	chrome.extension.sendMessage({type: "getTimeouts"}, (timeouts) => {
		timeouts = timeouts.timeouts;

		let timeoutList = document.getElementById("timeoutList");

		for (let timeout of timeouts) {
			let newTimeout = document.createElement("div");
			let date = moment.unix(timeout.startAt).format('MM/DD/YYYY h:mm A');

			newTimeout.appendChild(document.createTextNode(timeout.filters[0] + " - " + date + " - " + formatSeconds(timeout.duration)));

			timeoutList.appendChild(newTimeout);
		}
	});
}

populateTimeouts();

$("#createTimeout").click(() => {
	createTimeout();
});

$("#getCurrentUrl").click(() => {
	getCurrentUrl();
});