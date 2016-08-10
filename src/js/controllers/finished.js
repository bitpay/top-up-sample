'use strict';

angular.module('topUpApp.controllers').controller('finishedController', function($log, $filter, orderService, go, Currency, appConfig) {

  var self = this;

  self.order = orderService.order;

  $log.debug('Order: ' + JSON.stringify(self.order));

	self.successMessage = Currency.symbol(self.order.receive.currency) + parseFloat(self.order.receive.amount).toLocaleString() + ' ' + self.order.receive.currency +
		' has been credited to ' + $filter('tel')(self.order.to.phone) + '.';

	self.paymentProvider = appConfig.paymentMethods[self.order.payment.method].provider;
	self.topUpProvider = appConfig.topUpServices[self.order.topUp.service].provider;

	go.resetNavigation();

	self.currencySymbol = function(code) {
		return Currency.symbol(code);
	};

	self.again = function() {
    orderService.createOrder(function() {
      go.firstStep();
    }, true);
	};

});