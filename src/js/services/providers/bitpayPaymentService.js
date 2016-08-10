'use strict';

angular.module('topUpApp.services').factory('bitpayPaymentService', function($rootScope, $log, appConfig, bpcService) {

  var root = {};
  var paymentMethod = {};
  var responseHandle = undefined;

  bitpay.onModalWillLeave(function() {
    // If there is a response handle then no payment was made.
    if (responseHandle != undefined) {
      // Cleanup the response handle since the invoice is being closed.
      responseHandle = undefined;
      $rootScope.$emit('Local/UserCanceledPayment');
    }
  });

  function guid() {
    return Date.now();
  };

  root.pay = function(order, callback) {
    paymentMethod = appConfig.paymentMethods[order.payment.method];
    var bitpayAPI = bpcService.getClient(paymentMethod.api.url);

    var opts = {
      currency: order.amount.currency,
      price: order.amount.price,
      orderId: order.header.id,
      itemDesc: order.header.itemDescription,
      itemCode: order.header.itemCode,
      posData: JSON.stringify(order.from),
      buyer: {
        name: order.to.firstName + ' ' + order.to.lastName,
        address1: '',
        address2: '',
        locality: '',
        region: '',
        postalCode: '',
        country: '',
        email: order.to.email,
        phone: order.to.phone,
        notify: ''
      },
      guid: guid(),
      token: paymentMethod.api.token,
      transactionSpeed: paymentMethod.api.transactionSpeed,
      notificationEmail: paymentMethod.api.notificationEmail,
      notificationURL: paymentMethod.api.notificationURL
    };

    bitpayAPI.createInvoice(opts, function(err, response) {
      if (err) {
      $log.debug('BitPay invoice error: ' + JSON.stringify(err));
	    	return callback(err.message);
      }
      $log.debug('BitPay invoice response: ' + JSON.stringify(response));

      presentInvoice(response.id);

      // Set the reponse handle for callback when invoice is complete.
      // Callback with only the order transaction object.
      responseHandle = {
        callback: callback,
        transaction: {
          id: response.id,
          url: response.url
        }
      }
      return;
    });
  };

  window.addEventListener("message", function(event) {
    switch (event.data.status) {
      case 'new':
        break;
      case 'confirmed':
        confirmPayment();
        break;
      default:
        break;
    }
  }, false);

  function presentInvoice(invoiceId) {
    // `bitpay` is a global from https://bitpay.com/bitpay.js
    bitpay.setApiUrlPrefix(paymentMethod.api.url);
    bitpay.showInvoice(invoiceId);
  };

  function confirmPayment() {
    if (responseHandle) {
      responseHandle.callback(null, responseHandle.transaction);
      responseHandle = undefined;
    }
  };

  return root;
});
