
// This function executes when the page is finished loading.
function main() {
    ajaxGetRecent(writeTestData);
}

// This function is "syntatic sugar", making it easier to run the getElementById method.
function $(id) {
    return document.getElementById(id);
}

// This is a test function to write data to the container <div>.
function writeTestData(jsonData) {
    $('container').innerHTML = jsonData;
}

// This function grabs the most recent entry in the database.
// It's "callbackFunction" parameter is the function that -
// ajaxGetRecent will pass the data to when it's finished grabbing it.
function ajaxGetRecent(callbackFunction) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            callbackFunction(this.responseText);
        }
    }

    request.open("GET", "/database/getRecent", true);
    request.send();
}