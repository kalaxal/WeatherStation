# WeatherStation
This application draws data from a sqlite3 database on a raspberry pi 3 that is collecting weather data on the campus of Clover Park Technical College and displays that data on webpage.

It is still a work in progress. More information will be added to this page in the future to let club members know how to contribute.
For now, if you have any questions that are not answered here, message one of the club officers on canvas, or in the club discord.

## How To Run

#### Prerequisites
* Node.js / NPM
* npm-sqlite3


To install Node.js visit their [site](https://nodejs.org/en/)
Please visit this [link](https://docs.npmjs.com/getting-started/installing-node) to learn how to update NPM


After cloning this repository, you must open a command shell or terminal in the folder and run:

>    npm install
    
This will install npm-sqlite3.

Then to run the webserver, you must open that command shell or terminal in the folder and run:

>    node app.js
    
You should get a response of:

>    Listening on port: 8080
    
Keep this command shell open in order to continue running the webserver.


Next in your chosen browser, visit:

>    localhost:8080
    
to view the site.
