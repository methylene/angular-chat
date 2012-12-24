#!/usr/bin/env node

var util = require('util'),
    fs = require('fs'),
    url = require('url'),
    express = require('express')

var DEFAULT_PORT = 3000;

app = express();

app.get('*', function (req, res) {
	res.writeHead(200, { "Content-Type": "application/json" });   
	res.write("angular.callbacks._0(");
	res.write(JSON.stringify(
    {"days":[
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
    ]}));
	res.write(");");
	res.end();
});

app.listen(DEFAULT_PORT);
console.log('Listening on port: ' + DEFAULT_PORT);
