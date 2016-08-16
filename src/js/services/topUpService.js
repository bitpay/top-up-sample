'use strict';

angular.module('topUpApp.services').factory('topUpService', function(appConfig, stubTopUpService) {

  var root = {};

  // Route the request to top-up using the order.
  root.topUp = function(order, callback) {
    var topUpProvider = appConfig.topUpServices[appConfig.topUpService].provider;

    switch (topUpProvider) {
      case 'BitPay, Inc.':
        return stubTopUpService.topUp(order.to.phone, order.receive.amount, callback);
        break;
      default:
        return callback('Unrecognized top-up service provider');
        break;
    }
  };

  root.verify = function(what, a, b, callback) {
    var topUpProvider = appConfig.topUpServices[appConfig.topUpService].provider;

    switch (topUpProvider) {
      case 'BitPay, Inc.':
        return stubTopUpService.verify(what, a, b, callback);
        break;
      default:
        return callback('Unrecognized top-up service provider');
        break;
    }
  };

  return root;
});
