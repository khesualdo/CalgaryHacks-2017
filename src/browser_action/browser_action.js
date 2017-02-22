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

function createTimeout()
{
	let timeoutList = document.getElementById("timeoutList");
	let url = document.getElementById("url").value;
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

$("#createTimeout").click(() => {
	createTimeout();
});