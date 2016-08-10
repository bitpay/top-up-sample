'use strict';

angular.module('topUpApp.controllers').controller('topUpErrorController', function($log, $filter, orderService, go, appConfig, Currency) {

  var self = this;

  self.order = orderService.order;

  $log.debug('Order: ' + JSON.stringify(self.order));

	var paymentMethod = appConfig.paymentMethods[self.order.payment.method];
	self.paymentProvider = paymentMethod.provider;

	if (self.order.payment.status.transaction.id.length > 0) {
		self.errorMessage = 'Something went wrong. Your payment completed but we could not update your account balance. ' +
			'Please contact support at ' + paymentMethod.supportEmail + ' with your payment ID (' + self.order.payment.status.transaction.id + ') and ' +
			'account number (' + $filter('tel')(self.order.to.phone) + ').';
	}

	self.currencySymbol = function(code) {
		return Currency.symbol(code);
	};

	self.again = function() {
    orderService.createOrder(function() {
      go.firstStep();
    }, true);
	};

});