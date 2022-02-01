const connection = document.getElementById("connection")
const content = document.getElementById("main-content")


let isCorrectPage = false

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { //Check if URL is correct, loads relevant information
    if (tabs[0].url === "https://play.cryptoships.club/ships") {
        isCorrectPage = true
        connection.innerHTML += "<p id='status'>Connected</p>"
        connection.innerHTML += "<span class='green-dot'></span>"
        content.innerHTML += "<h2 style='border-top:50px;'>You're in the right place!</h2>"
    } else {
        isCorrectPage = false
        connection.innerHTML += "<p id='status'>Not Connected</p>"
        connection.innerHTML += "<span class='red-dot'></span>"
        content.innerHTML += "<h2>Make sure you're at <a href='https://play.cryptoships.club/ships' target='_blank'>https://play.cryptoships.club/ships</a></h2>"
    }
})


async function getPageStuff() {  //returns [tab url, raw HTML]
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const tab = tabs[0]
    const scraped = await chrome.scripting.executeScript({
        target: { tabId: tab.id }, function() {
            var htmlCode = document.documentElement.outerHTML
            return htmlCode
        }
    })
    return [tab.url, scraped[0].result]
}

async function getter() { //stores pageURL and pageHTML in browser localStorage
    const result = await getPageStuff()
    localStorage.setItem("pageURL", result[0])
    localStorage.setItem("pageHTML", result[1])
}

getter()

let pageURL = localStorage.getItem("pageURL")
let pageHTML = localStorage.getItem("pageHTML")


function findEndDiv(html, div) { //returns [pos of opening <div> => int, pos of closing </div> => int], returns -1 if error
    const start = html.search(div)

    let found = false
    let divOpens = 1
    let index = start + 1
    while (found === false) {
        let nextDivOpen = html.slice(index).search('<div')
        if (nextDivOpen === -1) { nextDivOpen = 10 * (10 ** 10) }
        let nextDivClose = html.slice(index).search('</div')
        if (nextDivClose === -1) { nextDivClose = 10 * (10 ** 10) }

        if (divOpens === 0) {
            found = true
            return [start, index + nextDivClose]
        }

        if (nextDivOpen < nextDivClose) {
            divOpens += 1
            index = index + nextDivOpen + 1
        } else if (nextDivClose < nextDivOpen) {
            divOpens -= 1
            index = index + nextDivClose + 1
        } else {
            return -1
        }

    }
    return -1
}

function getWithinDiv(html, div) { //returns relevant sliced html within input div tag
    let divs = findEndDiv(html, div)
    return html.slice(divs[0], divs[1])
}