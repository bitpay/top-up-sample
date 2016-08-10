'use strict';

angular.module('topUpApp.controllers').controller('toController', function($rootScope, $scope, go, orderService) {

  var self = this;

  initForm(this);

	$scope.$watch(function() {
    return this.firstName
  }.bind(this), function(value) {
		orderService.order.setTo({
			firstName: this.firstName
		});
  }.bind(this));

	$scope.$watch(function() {
    return this.lastName
  }.bind(this), function(value) {
		orderService.order.setTo({
			lastName: this.lastName
		});
  }.bind(this));

	$scope.$watch(function() {
    return this.email
  }.bind(this), function(value) {
		orderService.order.setTo({
			email: this.email
		});
  }.bind(this));

	$scope.$watch(function() {
    return this.phone
  }.bind(this), function(value) {
		orderService.order.setTo({
			phone: this.phone
		});
  }.bind(this));

	function initForm(obj) {
		self.firstName = orderService.order.to.firstName;
		self.lastName = orderService.order.to.lastName;
		self.email = orderService.order.to.email;
		self.phone = orderService.order.to.phone;
	};

	self.back = function() {
		go.previousStep('to');
	};

	self.continue = function() {
		$scope.$broadcast('show-errors-check-validity');

		if ($scope.toForm.$valid) {
			go.nextStep('to');
    }
	};

});