function switchSearch(tab) {
    const bingSearch = "https://www.bing.com/search?"
    const bingImageSearch = "https://www.bing.com/images/search?"
    const bingVideoSearch = "https://www.bing.com/videos/search?"
    const bingMapSearch = "https://www.bing.com/maps?"
    const bingNewsSearch = "https://www.bing.com/news/search?"
    const bingShoppingSearch = "https://www.bing.com/shop?"

    const googleSearch = "https://www.google.com/search?"
    const googleImageSearchSubstring = "&tbm=isch"
    const googleVideoSearchSubstring = "&tbm=vid"
    const googleMapsSearch = "https://www.google.com/maps?"
    const googleMapsSearchRewrite = "https://www.google.com/maps"
    const googleNewsSearchSubstring = "&tbm=nws"
    const googleShoppingSearchSubstring = "&tbm=shop"

    const url = tab.url

    //Handle bing searches
    if (url.substring(0, bingSearch.length) === bingSearch) {
        return getSwitchedSearch(bingSearch, googleSearch, url)
    }
    //Handle bing image searches
    else if (url.substring(0, bingImageSearch.length) === bingImageSearch) {
        return getSwitchedGoogleSearch(bingImageSearch, googleSearch, googleImageSearchSubstring, url)
    }
    //Handle bing video searches
    else if (url.substring(0, bingVideoSearch.length) === bingVideoSearch){
        return getSwitchedGoogleSearch(bingVideoSearch, googleSearch, googleVideoSearchSubstring, url)
    }
    //Handle bing maps searches
    else if (url.substring(0, bingMapSearch.length) === bingMapSearch){
        return getSwitchedSearch(bingMapSearch, googleMapsSearch, url)
    }
    //Handle bing news searches
    else if (url.substring(0, bingNewsSearch.length) === bingNewsSearch){
        return getSwitchedGoogleSearch(bingNewsSearch, googleSearch, googleNewsSearchSubstring, url)
    }
    //Handle bing shopping searches
    else if (url.substring(0, bingShoppingSearch.length) === bingShoppingSearch){
        return getSwitchedGoogleSearch(bingShoppingSearch, googleSearch, googleShoppingSearchSubstring, url)
    }

        //--------------------------------------

    //Handle Google image searches
    else if (url.indexOf(googleImageSearchSubstring) > googleSearch.length) {
        return getSwitchedSearch(googleSearch, bingImageSearch, url)
    }
    //Handle google video searches
    else if (url.indexOf(googleVideoSearchSubstring) > googleSearch.length) {
        return getSwitchedSearch(googleSearch, bingVideoSearch, url)
    }
        //Handle Google Maps searches
    //Needs two for url before and after rewrite
    else if (url.substring(0, googleMapsSearch.length) === googleMapsSearch) {
        return getSwitchedSearch(googleMapsSearch, bingMapSearch, url)
    }
    else if (url.substring(0, googleMapsSearchRewrite.length) === googleMapsSearchRewrite) {
        return getSwitchedSearch(googleMapsSearchRewrite, bingMapSearch, url)
    }
    //Handle Google News searches
    else if (url.indexOf(googleNewsSearchSubstring) > googleSearch.length) {
        return getSwitchedSearch(googleSearch, bingNewsSearch, url)
    }
    //Handle Google shopping searches
    else if (url.indexOf(googleShoppingSearchSubstring) > googleSearch.length) {
        return getSwitchedSearch(googleSearch, bingShoppingSearch, url)
    }
    //Handle Google searches
    else if (url.substring(0, googleSearch.length) === googleSearch) {
        return getSwitchedSearch(googleSearch, bingSearch, url)
    }

    function getSwitchedSearch(currentEngine, newEngine,  url) {
        let querySelector = '&q='
        let separator = '&'
        //google maps uses different url scheme
        if (currentEngine === googleMapsSearchRewrite) {
            querySelector = "/search/"
            separator = '/'
        }

        let removeEngine = url.slice(currentEngine.length)
        let searchStart = removeEngine.indexOf(querySelector) + querySelector.length
        let justSearch = removeEngine.substring(searchStart)
        let searchEnd = justSearch.indexOf(separator)
        if (searchEnd > 0) {
            justSearch = justSearch.substring(0, searchEnd)
        }

        const debug = true
        if (debug) {
            console.debug("------------------ SearchSwitch Diagnostics ------------------")
            console.debug("Current Engine: ", currentEngine)
            console.debug("Next Engine: ", newEngine)
            console.debug("URL: ", url)
            console.debug("Search query selector: ", querySelector)
            console.debug("Raw Search term with engine removed: ", removeEngine)
            console.debug("Index of the start of the real search: ", searchStart)
            console.debug("Index of the end of the real search: ", searchEnd)
            console.debug("The text that is just the raw search: ", justSearch)
            console.debug("--------------------------------------------------------------")
        }
        return newEngine + 'q=' + justSearch
    }
    function getSwitchedGoogleSearch(currentEngine, newEngine, substring, url) {
        let beforeSubstring = getSwitchedSearch(currentEngine, newEngine, url)
        return beforeSubstring + substring
    }
}


chrome.action.onClicked.addListener((tab) => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: switchSearch,
            args: [tab]
        }, async (redirect) => {
            await chrome.tabs.update({url: redirect[0].result});
        });
    }
)