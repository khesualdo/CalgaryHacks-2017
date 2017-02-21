chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");
			// ----------------------------------------------------------

			chrome.tabs.getCurrent(function(tab) {
			    // var url = tabs[0].url;
					console.log(tab);
			});

			chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray){
				console.log(tabArray);
			});

	}
	}, 10);
});
