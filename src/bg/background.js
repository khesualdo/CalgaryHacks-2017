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
    else if (request.type == "getActiveTab") {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            sendResponse(tabs[0]);
        });
    }

    // Indicates that sendResponse() will be sent asynchronously
    return true;
});

// Add a timeout to Chrome storage 
function addTimeout(timeout) {

    // Request `timeouts` object from Chrome storage 
    chrome.storage.sync.get("timeouts", function (timeouts) {

        // If no `timeouts` exits, create a `timeouts` object
        if (!timeouts.timeouts)
            timeouts = {timeouts: []};

        var timeoutArray = timeouts.timeouts;

        delete timeout.type;

        // Add new timeout to `timeoutArray`
        timeoutArray.push(timeout);

        chrome.storage.sync.set({'timeouts': timeoutArray}, () => {});
    });
}

// Remove a timeout from Chrome storage
// Clears timeout for the next interval
function removeTimeout(timeout) {
    chrome.storage.sync.get("timeouts", function (timeouts) {

        // If no `timeouts` exits, create a `timeouts` object
        if (!timeouts.timeouts)
            timeouts = {timeouts: []};

        var timeoutArray = timeouts.timeouts;

        delete timeout.type;

        // Find timeout in the timeoutArray
        let index = timeoutArray.findIndex((e) => {
            if (e.startAt == timeout.startAt && e.duration == timeout.duration && e.filters == timeout.filters) {
                return true;
            }
            else return false;
        });

        // If not timeout was found, then return
        if (index == -1) return;

        // Set the `startAt` and `duration` of the timeout to 0
        timeoutArray[index].startAt = 0;
        timeoutArray[index].duration = 0;

        // Push the updated `timeouts` object to Chrome storage
        chrome.storage.sync.set({'timeouts': timeoutArray}, () => {});
    });
}

// Updates all tabs, which have timeouts
function updateInterval() {
    chrome.tabs.query({}, function(tabs) {
        chrome.storage.sync.get('timeouts', function (timeouts) {

            // If no `timeouts` exits, create a `timeouts` object
            if (!timeouts.timeouts)
                timeouts = {timeouts: []};

            let updatedTimeouts = [];

            for (let timeout of timeouts.timeouts) {

                // Get the tabs that matches this timeout
                let matchedTabs = getTabsThatMatch(tabs, timeout.filters);

                // Calculate the end time of timeout
                let timeoutEnd = timeout.startAt + timeout.duration;

                // Get current time
                let currentTime = Math.floor(Date.now() / 1000);

                if (currentTime > timeoutEnd) {

                    // Tell any applicable tabs the timeout ended
                    for (let tab of matchedTabs) {
                        chrome.tabs.sendMessage(tab.id, {type: "endInterval"});
                    }
                }
                else if (currentTime >= timeout.startAt) {
                    
                    // Update each tab
                    for (let tab of matchedTabs) {
                        chrome.tabs.sendMessage(tab.id, {type: 'updateInterval', duration: timeoutEnd - currentTime});
                    }

                    updatedTimeouts.push(timeout);
                }
                else {
                    updatedTimeouts.push(timeout);
                }
            }

            // Update `timeouts` object in Chrome storage 
            // only if something changed, to get under write quotas
            if (updatedTimeouts.length != timeouts.timeouts.length) {
                chrome.storage.sync.set({'timeouts': updatedTimeouts}, () => {});
            }
        });
    });
};

// Returns tabs that match the url array
function getTabsThatMatch(tabs, urls) {

    var returnTabs = [];

    // Traverse through currently opened tabs
    for (let tab of tabs) {

        let domain = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/.exec(tab.url);

        // Remove `www` from the domain
        domain = domain[1];

        // We found a tab, append it to the `returnTabs` array
        if (urls.indexOf(domain) > -1) {
            returnTabs.push(tab);
        }
    }

    return returnTabs;
}

// Update all timeouts every 0.5 seconds
setInterval(() => {
    updateInterval();
}, 500);
