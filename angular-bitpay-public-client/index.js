var bpcModule = angular.module('bpcModule', []);
var Client = require('../node_modules/bitpay-public-client');

bpcModule.constant('MODULE_VERSION', '1.0.0');

bpcModule.provider("bpcService", function() {
  var provider = {};

  provider.$get = function() {
    var service = {};

    service.getErrors = function() {
      return Client.errors;
    };

    service.Client = Client;

    service.getUtils = function() {
      return Client.Utils;
    };

    service.getClient = function(baseUrl) {
      var bpc = new Client({
        baseUrl: baseUrl || 'https://bitpay.com'
      });
      return bpc;
    };
    return service;
  };

  return provider;
});
