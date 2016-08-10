'use strict';

angular.module('topUpApp.controllers').controller('payController', function($rootScope, $scope, $log, $timeout, go, appConfig, orderService, paymentService, topUpService, Currency) {

  var self = this;

  self.order = orderService.order;

  $log.debug("Order: " + JSON.stringify(self.order));

  self.paymentMethods = appConfig.paymentMethods;

  initForm(this);

	$scope.$watch(function() {
    return this.paymentMethod
  }.bind(this), function(value) {
		orderService.order.setPayment({
			method: this.paymentMethod,
			details: {}
		});
  }.bind(this));

	$rootScope.$on('Local/UserCanceledPayment', function(event) {
		self.paymentInProgress = false;
		self.infoMessage = 'No payment made. You canceled before making a payment.';
		$timeout(function() {
 		  $rootScope.$apply();
 		});
	});

	function initForm(obj) {
		obj.paymentMethod = orderService.order.payment.method;
		self.paymentInProgress = false;
	};

	function paymentInProgress(b) {
		self.paymentInProgress = b;
		$timeout(function() {
 		  $rootScope.$apply();
 		});
	};

	self.currencySymbol = function(code) {
		return Currency.symbol(code);
	};

	self.back = function() {
		if (self.paymentInProgress) return;
		go.previousStep('pay');
	};

	self.pay = function() {
		if (self.paymentInProgress) return;
		paymentInProgress(true);
		paymentService.pay(self.order, function(err, transaction) {
			if (err) {
				$log.debug('Payment error: ' + err);
				self.errorMessage = 'Something went wrong. Your payment is not complete. Please try again or choose another payment option.';
				$timeout(function() {
		 		  $rootScope.$apply();
		 		});
				paymentInProgress(false);
				return;
			}

			$log.debug('Payment complete: ' + transaction.id);

			self.order.confirmPayment(transaction, function(order) {
				topUpService.topUp(order, function(err, transaction) {
					if (err) {
						$log.debug('Top-up error: ' + JSON.stringify(err));
						$timeout(function() {
				 		  $rootScope.$apply();
				 		});
						return go.path('topUpError');
					}

					$log.debug('Top-up complete: ' + transaction.id);
					
					self.order.confirmTopUp(transaction, function(order) {
						return go.nextStep('pay');
					});
				});
			});
		});
	};

});