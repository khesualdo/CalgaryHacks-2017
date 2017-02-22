// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == "addTimeout") addTimeout();

    sendResponse();
});



function addTimeout(timeout) {//function that is subscribed to event
    chrome.storage.sync.get("timeouts", function (timeouts) {//gets timeouts, then calls timeouts function
        var timeoutArray = timeouts.timeouts;

        delete timeout.type;

        timeoutArray.push(timeout);

        chrome.storage.sync.set({ 'timeouts': timeoutArray }, function () { })
    });

}

function updateInterval() {
	chrome.tabs.query({}, function(tabs) {
		chrome.storage.sync.get('timeouts', function (timeouts) {

			let updatedTimeouts = [];


			for (let timeout of timeouts.timeouts) {
				// Get the tabs that match this timeout
				let matchedTabs = getTabsThatMatch(tabs, timeout.filters);

				let timeoutEnd = timeout.startAt + timeout.duration;
				let currentTime = Math.floor(Date.now() / 1000);

				if (currentTime > timeoutEnd) {
					// tell any applicable tabs the timeout ended
					for (let tab of matchedTabs) {
						chrome.tabs.sendMessage(tab.id, {type: "endInterval"});
					}
				}
				else if (currentTime >= timeout.startAt) {
					// update each tab
					for (let tab of matchedTabs) {
						chrome.tabs.sendMessage(tab.id, {type: 'updateInterval', duration: timeoutEnd - currentTime});
					}

					updatedTimeouts.push(timeout);
				}
			}

			// update the filters in the db
			chrome.storage.sync.set({'timeouts': updatedTimeouts}, () => {});
		});
	});
};

let meme = {'timeouts':
		[
			{
				startAt: 1487729062,
				duration: 9000,
				filters: ['google.com', 'google.ca']
			}
		]
	}

chrome.storage.sync.set(meme, function () {
		console.log("Updated DB with example");
});

function getTabsThatMatch(tabs, urls) {
	var returnTabs = [];

	for (let tab of tabs) {
		let domain = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/.exec(tab.url);
		domain = domain[1]; // remove www

		if (urls.indexOf(domain) > -1) {
			// found it
			returnTabs.push(tab);
		}
	}

	return returnTabs;
}

// Update interval every second
setInterval(() => {
	updateInterval();
}, 1000);
