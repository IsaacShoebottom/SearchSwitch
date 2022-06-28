function switchSearch(tab) {
	const bingSearch = "https://www.bing.com/search?q=";
	const googleSearch = "https://www.google.com/search?q=";
	const url = tab.url;

	let newURL;
	let removeEngine;
	let searchEnd;
	let justSearch;
	if (url.substring(0, bingSearch.length) === bingSearch) {
		removeEngine = url.slice(bingSearch.length);
		searchEnd = removeEngine.indexOf('&');
		justSearch = removeEngine.substring(0, searchEnd);
		
		newURL = googleSearch + justSearch + '&';
		
	}
	else if (url.substring(0, googleSearch.length) === googleSearch) {
		removeEngine = url.slice(googleSearch.length);
		searchEnd = removeEngine.indexOf('&');
		justSearch = removeEngine.substring(0, searchEnd);

		newURL = bingSearch + justSearch + '&';
	}
	return newURL;
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
	  target: {tabId: tab.id},
	  func: switchSearch,
	  args: [tab]
	}, async (redirect) => {
		await chrome.tabs.update({url: redirect[0].result});
	} );
  });