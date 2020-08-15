// Making HTTP request

const request = new XMLHttpRequest()

request.addEventListener("readystatechange", (e) => {
    if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText)
        console.log(data)
    } else if (e.target.readyState === 4) {
        console.log("An error has occurred")
    }
})

// Test endpoints
// http://puzzle.mead.io/puzzle
// http://restcountries.eu/#api-endpoints-all

request.open("GET", "https://restcountries.eu/rest/v2/name/Germany")
request.send()

// Resources
// https://httpstatuses.com/
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
