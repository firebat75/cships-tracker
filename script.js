const connection = document.getElementById("connection")
const content = document.getElementById("main-content")

let isCorrectPage = false

// function checkCorrectUrl() { //Check if user is on the ships page ##FUNCTIONAL##

//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         if (tabs[0].url === "https://play.cryptoships.club/ships") {
//             content.innerHTML += "<h2>You're in the right place!</h2>"
//         } else {
//             content.innerHTML += "<h2>Make sure you're at <a href='https://play.cryptoships.club/ships' target='_blank'>https://play.cryptoships.club/ships</a></h2>"
//         }
//     })
// }

// function checkCorrectUrl2() { //Returns true if user is on https://play.cryptoships.club/ships, else returns false
//     //!!!!!!!!!!!!!!ONLY CONSOLE LOGS, KEEPS RETURNING undefined!!!!!!!!!!!!!!!!!!!!

//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         if (tabs[0].url === "https://play.cryptoships.club/ships") {
//             console.log("TRUE!")
//             return true
//         } else {
//             console.log("FALSE!")
//             return false
//         }
//     })
// }

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
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

// if (isCorrectPage === true) {
//     content.innerHTML += "<h2>You're in the right place!</h2>"
// } else {
//     content.innerHTML += "<h2>Make sure you're at <a href='https://play.cryptoships.club/ships' target='_blank'>https://play.cryptoships.club/ships</a></h2>"
// }