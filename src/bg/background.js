// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(sender);
});


var seconds = 500;

function updateInterval() {
	seconds -= 1;
	// UPDATE ALL THE TABS HERE

	chrome.tabs.query({}, function(tabs) {
		for (var tab of tabs) {
			chrome.tabs.sendMessage(tab.id, {type: "updateInterval", duration: seconds});
		}
	});
};

// Update interval every second
setInterval(() => {
	updateInterval();
}, 1000);
