function switchSearch(tab) {
    const bingSearch = "https://www.bing.com/search?";
    const googleSearch = "https://www.google.com/search?";

    const bingImageSearch = "https://www.bing.com/images/search?"
    const googleImageSearchSubstring = "&tbm=isch";
    const url = tab.url;

    let newURL;
    let removeEngine;
    let searchStart;
    let searchEnd;
    let justSearch;
    //Handle bing searches
    //This is the way it should be done, TODO: Refactor rest of methods to be like this
    if (url.substring(0, bingSearch.length) === bingSearch) {
        removeEngine = url.slice(bingSearch.length);
        searchStart = removeEngine.indexOf('&q=') + 3;
        justSearch = removeEngine.substring(searchStart);
        searchEnd = justSearch.indexOf('&');
        justSearch = justSearch.substring(0, searchEnd);

        newURL = googleSearch + 'q=' +justSearch + '&';

    }
	//Handle Google image searches
	else if (url.indexOf(googleImageSearchSubstring) > googleSearch.length) {
		removeEngine = url.slice(googleSearch.length);
		searchEnd = removeEngine.indexOf('&');
		justSearch = removeEngine.substring(0, searchEnd);

		newURL = bingImageSearch + justSearch + '&';
	}
    //Handle Google searches
    else if (url.substring(0, googleSearch.length) === googleSearch) {
        removeEngine = url.slice(googleSearch.length);
        searchEnd = removeEngine.indexOf('&');
        justSearch = removeEngine.substring(0, searchEnd);

        newURL = bingSearch + justSearch + '&';
    }
    //Handle bing image searches
    else if (url.substring(0, bingImageSearch.length) === bingImageSearch) {
        removeEngine = url.slice(bingImageSearch.length)
        searchEnd = removeEngine.indexOf('&');
        justSearch = removeEngine.substring(0, searchEnd);

        newURL = googleSearch + justSearch + googleImageSearchSubstring + '&';
    }

    return newURL;
}

chrome.browserAction.onClicked.addListener((tab) => {
        chrome.tabs.update({url: switchSearch(tab)}).then(r => console.log(r))
    }
)