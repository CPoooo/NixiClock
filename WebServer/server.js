var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();
app.use(express.json());
// Create an HTTP service.
http.createServer(app).listen(80);

// Routing Web Pages
app.get('/', function(req, res){
    res.sendFile("/home/pi/clock/WebServer/client/index.html");
});
// File Serving
app.get('/resources/:name', function(req, res){
    var options = {
        root:  __dirname + '/client/',
        dotfiles: 'deny',
        headers: {'x-timestamp': Date.now(),'x-sent': true}
    };
    res.sendFile(req.params.name, options, function (err) {
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
    });
});
app.get('/json/:name', function(req, res){
    var options = {
        root: '/home/pi/clock/',
        dotfiles: 'deny',
        headers: {'x-timestamp': Date.now(),'x-sent': true}
    };
    res.sendFile(req.params.name, options, function (err) {
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
    });
});
app.post('/json', function(request, response){
	response.sendStatus(200);
	fs.writeFile('/home/pi/clock/settings.json', JSON.stringify(request.body), 'utf8',function(){});
});
