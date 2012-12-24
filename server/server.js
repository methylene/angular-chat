#!/usr/bin/env node

var util = require('util'),
    fs = require('fs'),
    url = require('url'),
    express = require('express')

var DEFAULT_PORT = 3000;

var server = express();
server.enable('jsonp callback');

server.get('/jsMasterDetail/dayService', function (req, res) {
	res.json({"days":[
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
    ]});
});

server.listen(DEFAULT_PORT);
console.log('Listening on port: ' + DEFAULT_PORT);
