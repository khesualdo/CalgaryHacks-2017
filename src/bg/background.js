// Bind event listener
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "addTimeout") {
        addTimeout(request);
        sendResponse();
    }
    else if (request.type == "removeTimeout") {
        removeTimeout(request);

        sendResponse();
    }
    else if (request.type == "getTimeouts") {
        chrome.storage.sync.get('timeouts', function (timeouts) {
            sendResponse(timeouts);
        });
    }

    return true; // return sendResponse async
});

// Adds a timeout
function addTimeout(timeout) {
    chrome.storage.sync.get("timeouts", function (timeouts) {
        var timeoutArray = timeouts.timeouts;

        delete timeout.type;

        timeoutArray.push(timeout);

        chrome.storage.sync.set({'timeouts': timeoutArray}, () => {});
    });
}

// Remove a timeout (clears it for the next interval)
function removeTimeout(timeout) {
    chrome.storage.sync.get("timeouts", function (timeouts) {
        var timeoutArray = timeouts.timeouts;

        delete timeout.type;

        let index = timeoutArray.findIndex((e) => {
            if (e.startAt == timeout.startAt && e.duration == timeout.duration && e.filters == timeout.filters) {
                return true;
            }
            else return false;
        });

        if (index == -1) return;

        timeoutArray[index].startAt = 0;
        timeoutArray[index].duration = 0;

        chrome.storage.sync.set({'timeouts': timeoutArray}, () => {});
    });
}

// Loops and updates all tabs
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
                else {
                    updatedTimeouts.push(timeout);
                }
            }

            // update the filters in the db

            // Only update if something changed to get under write quotas
            if (updatedTimeouts.length != timeouts.timeouts.length) {
                chrome.storage.sync.set({'timeouts': updatedTimeouts}, () => {});
            }
        });
    });
};

// Returns tabs that match the url array
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


setInterval(() => {
    updateInterval();
}, 500);
