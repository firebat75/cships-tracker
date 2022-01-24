const connection = document.getElementById("connection")
const content = document.getElementById("main-content")

let isCorrectPage = false

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { //Check if URL is correct, loads relevant information
    if (tabs[0].url === "https://play.cryptoships.club/ships") {
        isCorrectPage = true
        connection.innerHTML += "<p id='status'>Connected</p>"
        connection.innerHTML += "<span class='green-dot'></span>"
        content.innerHTML += "<h2>You're in the right place!</h2>"
    } else {
        isCorrectPage = false
        connection.innerHTML += "<p id='status'>Not Connected</p>"
        connection.innerHTML += "<span class='red-dot'></span>"
        content.innerHTML += "<h2>Make sure you're at <a href='https://play.cryptoships.club/ships' target='_blank'>https://play.cryptoships.club/ships</a></h2>"
    }
})


function getHTML() {
    var htmlCode = document.documentElement.outerHTML;
    return htmlCode;
}

const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
const tab = tabs[0];
const scraped = await chrome.scripting.executeScript({ target: { tabId: tab.id }, function: getHTML })