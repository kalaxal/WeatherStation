let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
let sqlite3 = require('sqlite3').verbose();

const port = 8080;

let server = http.createServer(function (req, res) {

    let uri = url.parse(req.url).pathname;
    let filename = path.join(process.cwd(), uri);

    if (req.url === '/') {

        res.writeHead(200, { 'Content-Type' : 'text/html' });

        fs.createReadStream('index.html').pipe(res)
    }

    else if (uri.match(/[/](\w+)/)[1] === 'css') {
        fs.exists(filename, function(exists) {
            if (!exists) {
                return404();
            } else {
                res.writeHead(200, { 'Content-Type' : 'text/css' });
                fs.createReadStream(filename).pipe(res);
            }
        });
    }

    else if (uri.match(/[/](\w+)/)[1] === 'javascript') {
        fs.exists(filename, function(exists) {
            if (!exists) {
                return404();
            } else {
                res.writeHead(200, { 'Content-Type' : 'text/javascript' });
                fs.createReadStream(filename).pipe(res);
            }
        });
    }

    // Currently only serves .pngs
    // TO DO: Write logic to detect file type and write http header with correct mime type.
    else if (uri.match(/[/](\w+)/)[1] === 'images') {
        fs.exists(filename, function(exists) {
            if (!exists) {
                return404();
            } else {
                res.writeHead(200, { 'Content-Type' : 'image/png' });
                fs.createReadStream(filename).pipe(res);
            }
        });
    }

    // An HTTP GET method to grab the most recent entry from the SensorData Table.
    else if (req.url === '/database/getRecent') {

        res.writeHead(200, { 'Content-Type' : 'application/json' });
        
        // Currently pointing to a test database in the database folder.
        let db = new sqlite3.Database('database/TestDatabase.db');

        db.serialize(function() {
            db.get('SELECT * FROM SensorData ORDER BY TimeStamp DESC LIMIT 1;', function(err, row) {
                if (err) throw err;
                res.end(JSON.stringify(row));
            });
            db.close();
        });

    } else {
        return404(res);
    }

}).listen(port, function(err) {
    if (err) {
        console.log('Error: ' + err);
    }
    console.log('Server listening on port: ' + port);
});

function return404(res) {
    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.write('Error 404: Not Found');
    res.end();
}