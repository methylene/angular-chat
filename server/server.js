#!/usr/bin/env node

var util = require('util'),
    fs = require('fs'),
    url = require('url'),
    express = require('express')

var DEFAULT_PORT = 3000;

var server = express();
server.use(express.bodyParser());
server.enable('jsonp callback');

var appHelpers = {
	'sendFile':  function(pathname, res) {
		util.puts('sending: ' + pathname);
		var file = fs.createReadStream(pathname);
		file.on('data', res.write.bind(res));
		file.on('close', function () {
			res.end();
		});
		file.on('error', function (error) {
			util.puts(error);
		});
	}
};

var days = {"days":[
        {  "day":"Monday",
            "hours":[
                {
                    "start":8,
                    "end":12
                }
            ]
        },
        {  "day":"Tuesday",
            "hours":[
                {
                    "start":8,
                    "end":12
                }
            ]

        },
        {  "day":"Wednesday",
            "hours":[
                {
                    "start":8,
                    "end":12
                }
            ]

        },
        {  "day":"Thursday",
            "hours":[
                {
                    "start":8,
                    "end":12
                }
           ] 
        }
    ]};


server.post('/jsMasterDetail/dayService', function (req, res) {
	console.log(req.body);
	days = req.body;
	res.json(res.body);
});

server.get('/jsMasterDetail/dayService', function (req, res) {
	res.json(days);
});

//send anything with a file extension as normal
server.get('*.*', function (req, res) {
    appHelpers.sendFile('.' + req.url, res);
});

//intercept any paths and send "./index.html":
server.get('*', function (req, res) {
    appHelpers.sendFile('./index.html', res);
});

server.listen(DEFAULT_PORT);
console.log('Listening on port: ' + DEFAULT_PORT);
