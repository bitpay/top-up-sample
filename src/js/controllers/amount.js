'use strict';

angular.module('topUpApp.controllers').controller('amountController', function($rootScope, $scope, $timeout, appConfig, go, orderService, Currency) {

  var self = this;
	var amountInFocus = false;

  self.currencyList = appConfig.currencyList;

	updateForm(this);

	$scope.$watch(function() {
    return this.amount
  }.bind(this), function(value) {
		orderService.order.setAmount({
			price: Number(this.amount)
		});
  	if (amountInFocus) {
			updateForm(this, 'amount');
		}
  }.bind(this));

	$scope.$watch(function() {
    return this.receiveAmount
  }.bind(this), function(value) {
		orderService.order.setReceiveAmount(Number(this.receiveAmount));
  	if (!amountInFocus) {
			updateForm(this, 'receiveAmount');
		}
  }.bind(this));

	$scope.$watch(function() {
    return this.selectedCurrency
  }.bind(this), function(value) {
		orderService.order.setAmount({
			currency: this.selectedCurrency
		});
		updateForm(this, 'selectedCurrency');
  }.bind(this));

	$scope.$watch(function() {
    return this.message
  }.bind(this), function(value) {
		orderService.order.setMessage({
			text: this.message
		});
		updateForm(this, 'message');
  }.bind(this));

	function updateForm(obj, changed) {
		(changed != 'selectedCurrency' ? obj.selectedCurrency = orderService.order.amount.currency : angular.noop);
		(changed != 'amount'           ? obj.amount = orderService.order.amount.price + '' : angular.noop);
		(changed != 'receiveAmount'    ? obj.receiveAmount = orderService.order.receive.amount + '' : angular.noop);
		(changed != 'message'          ? obj.message = orderService.order.message.text : angular.noop);

		obj.receiveCurrency = orderService.order.receive.currency;
		obj.receiveCurrencyPrice = orderService.order.receive.currencyPrice;
		obj.fee = orderService.order.fee.amount + '';

		$timeout(function() {
			$rootScope.$apply();
		});
	};

	self.currencyIcon = function(code) {
		return Currency.icon(code);
	};

	self.focused = function(what) {
		amountInFocus = (what == 'amount');
	};

	self.setCurrency = function(currency) {
		self.selectedCurrency = currency;
	};

	self.back = function() {
		go.previousStep('amount');
	};

	self.continue = function() {
		$scope.$broadcast('show-errors-check-validity');

		if ($scope.amountForm.$valid) {
			go.nextStep('amount');
    }
	};

});