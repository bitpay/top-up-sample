'use strict';

angular.module('topUpApp.services').factory('paymentService', function(appConfig, bitpayPaymentService) {

  var root = {};

  // Route the request to pay for the order.
  root.pay = function(order, callback) {
    var paymentProvider = appConfig.paymentMethods[order.payment.method].provider;

    switch (paymentProvider) {
      case 'BitPay, Inc.':
        return bitpayPaymentService.pay(order, callback);
        break;
      default:
        return callback('Unrecognized payment provider');
        break;
    }
  };

  return root;
});
