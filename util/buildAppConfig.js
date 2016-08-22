#!/usr/bin/env node

'use strict';

var fs = require('fs');
var shell = require('shelljs');

var getCommitHash = function() {
  //exec git command to get the hash of the current commit
  //git rev-parse HEAD

  var hash = shell.exec('git rev-parse HEAD', {
    silent: true
  }).trim().substr(0, 7);
  return hash;
}

var cleanJSONQuotesOnKeys = function(json) {
  return json.replace(/"(\w+)"\s*:/g, '$1:');
};

// Build src/js/appConfig.js from appConfig.json.
var buildAppConfig = function() {
	var production = false; // TODO
	appConfig.commitHash = commitHash;

  for (var i = 0; i < Object.keys(appConfig.paymentMethods).length; i++) {
    var paymentMethod = appConfig.paymentMethods[Object.keys(appConfig.paymentMethods)[i]];

    // Add an id property (equal to its object key) to each payment method.
    paymentMethod.id = Object.keys(appConfig.paymentMethods)[i];

    // Delete non-production payment methods if building for production.
    if (production && !paymentMethod.production) {
      delete appConfig.paymentMethods[Object.keys(appConfig.paymentMethods)[i]];
    } else {
      // Production attribute no longer needed.
      delete paymentMethod.production;
    }
  }

  var content = '';
  content += '\'use strict\';\n\n';
  content += 'angular.module(\'topUpApp\').constant(\'appConfig\', \n';
  content += cleanJSONQuotesOnKeys(JSON.stringify(appConfig, null, 2));
  content += ');\n';
  fs.writeFileSync("./src/js/appConfig.js", content);
};

var commitHash = getCommitHash();
var appConfig = JSON.parse(fs.readFileSync('./appConfig.json', 'utf8'));
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

buildAppConfig();

console.log('v' + pkg.version + ' #' + commitHash + ' App:' + appConfig.name);
