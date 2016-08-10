'use strict';

angular.module('topUpApp.services').factory('orderService', function(appConfig, Order, rateService) {

  var root = {};
  root.order;

  root.init = function(callback) {
    root.order = undefined;
  };

  root.createOrder = function(callback) {
    var opts = {
      // Text description of the top-up product.
      itemDescription: appConfig.topUpServices[appConfig.topUpService].orderSettings.itemDescription,
      
      // Top-up product code.
      itemCode: appConfig.topUpServices[appConfig.topUpService].orderSettings.itemCode,

      // Default preferred payment currency of the purchaser.
      sendCurrency: appConfig.sendCurrency,
      
      // Currency of the recipients value.
      receiveCurrency: appConfig.receiveCurrency,

      // Default selected payment method.
      paymentMethod: appConfig.paymentMethod,
      
      // Fee associated with the selected payment method.
      feePercentage: appConfig.paymentMethods[appConfig.paymentMethod].orderSettings.feePercentage,

      // The targeted top-up service.
      topUpService: appConfig.topUpService
    };

    // Can't create an order until the rate service is available.
    rateService.whenAvailable(function() {
      root.order = new Order(opts);
      callback();
    }, true);
  };

  return root;

});
