var express = require('express');
var ws = require('ws');
var url = require('url');
var path = require('path');
var fs = require('fs');
var https = require('https');
var http = require('http');

var app = null;
var server = null;
var wss = null;

var startWebServer = function (serverUrl) {
	var secure = process.env.NODE_SECURE || false;

	serverUrl = url.parse(serverUrl);

	app = express();

	app.use(express.static(path.join(__dirname, '/..', 'static')));

	if (!secure) {
		server = http.createServer(app).listen(process.env.PORT || serverUrl.port, function () {
			console.log('Normal HTTP server started');
		});
	}
	else {
		var options = {
		  key: fs.readFileSync('/etc/sslmate/keys/star.publicdns.zone.key'),
		  cert: fs.readFileSync('/etc/sslmate/certs/star.publicdns.zone.chained.crt')
		};

		server = https.createServer(options, app).listen(process.env.PORT || serverUrl.port, function () {
			console.log('Secure server started');
		});
	}

	return app;
}

var startWSServer = function (serverUrl, path) {
	if (server == null)
		startWebServer(serverUrl);
		
	wss = new ws.Server({
		server: server,
		path: path
	});
	
	return wss;
};

module.exports = {
	startServer: startWebServer,
	startWSServer: startWSServer
};