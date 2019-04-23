// consts
const serverURL = "http://localhost:8080/";

// elements
var sendTable = document.querySelector('.table.send');
var histSwitcher = document.querySelector('.hist-switcher');
var histTable = document.querySelector('.table.hist');
var sendSwitcher = document.querySelector('.send-switcher');

var btnSend = document.querySelector('.btn-send');

// events
document.addEventListener("DOMContentLoaded", fetchData);
btnSend.addEventListener('click', sendData);
histSwitcher.addEventListener('click', switchToHist);
sendSwitcher.addEventListener('click', switchToSend);

// aux
function cout(message) {
    console.log(message);
}

// switching
function switchToHist() {
    sendTable.classList.add('hidden');
    histTable.classList.remove('hidden');
    cout("switched to hist!");
}
function switchToSend() {
    histTable.classList.add('hidden');
    sendTable.classList.remove('hidden');
    cout("switched to send!");
}

// proxy functions
function makePost(subPath, body, succHandler, errHandler, token = null) {
    let headers = {
        'Content-Type': 'application/json'
    };

    if (token)
        headers.Authorization = "Bearer " + token;

    axios.post(serverURL + subPath, body, { "headers": headers })
            .then(response => succHandler(response))
            .catch(e => errHandler(e));
}
function makeGet(subPath, succHandler, errHandler, token = null) {
    let headers = {
        'Content-Type': 'application/json'
    };

    if (token)
        headers.Authorization = "Bearer " + token;

    axios.get(serverURL + subPath, { "headers": headers })
            .then(response => succHandler(response))
            .catch(e => errHandler(e));
}

// data actions
function printErr(err) {
    cout("err!");
    cout(err);
}
function makeRow(values) {
    let row = document.createElement('tr');
    for (let value of values) {
        let cell = document.createElement('td');
        cell.innerHTML = value;
        row.appendChild(cell);
    }
    return row;
}
function fillTable(response) {
    // todo clear table
    let data = response.data;
    cout(data);
    for (let entry of data) {
        let elAmount = entry.electricity;
        let coldAmount = entry.coldWater;
        let hotAmount = entry.hotWater;
        let date = entry.date;
        histTable.appendChild(makeRow([elAmount, coldAmount, hotAmount, date]));
    }
}
function fetchData() {
    cout("fetching data...");
    let token = localStorage.getItem("userToken");
    makeGet("meters/?periodType=ALL", fillTable, printErr, token)
}

function sendData() {
    let elAmount = document.querySelector('.electro').value;
    let coldAmount = document.querySelector('.cold').value;
    let hotAmount = document.querySelector('.hot').value;
    
    let data = {
        "electricity": elAmount,
        "coldWater": coldAmount,
	    "hotWater": hotAmount
    }

    let token = localStorage.getItem("userToken");

    makePost("meters/send", data, fetchData, printErr, token);
}

