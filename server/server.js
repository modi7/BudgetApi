'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
//var express = require('express');

var app = module.exports = loopback();

// parse application/json
app.use(bodyParser.json());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  /*  var  publicPath = '/resources',
	    year = 60 * 60 * 24 * 365 * 1000,
	directory = __dirname + publicPath;
  app.use(publicPath, app.static(directory, { maxAge: year, allow: false }));*/
  
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
