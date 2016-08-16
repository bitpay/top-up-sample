'use strict';

angular.module('topUpApp.controllers').controller('toController', function($rootScope, $scope, go, orderService, topUpService) {

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
		setPhoneValid(true);
		orderService.order.setTo({
			lastName: this.lastName
		});
  }.bind(this));

	$scope.$watch(function() {
    return this.email
  }.bind(this), function(value) {
		setPhoneValid(true);
		orderService.order.setTo({
			email: this.email
		});
  }.bind(this));

	$scope.$watch(function() {
    return this.phone
  }.bind(this), function(value) {
		setPhoneValid(true);
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

	function setPhoneValid(b) {
		$scope.toForm.phone.$setValidity('verify', b);
	};

	function verify(obj, callback) {
		var name = {
			first: orderService.order.to.firstName,
			last: orderService.order.to.lastName
		};

		var phone = orderService.order.to.phone;

		obj.inProgress = true;
		topUpService.verify('phone', name, phone, function(err, verified) {
			obj.inProgress = false;
			if (err) {
				obj.errorMessage = 'We had a problem verifying your information. Please try again.';
				return callback(false);
			}
			setPhoneValid(verified);
			return callback(verified);
		});
	};

	self.back = function() {
		go.previousStep('to');
	};

	self.continue = function() {
		$scope.$broadcast('show-errors-check-validity');

		if ($scope.toForm.$valid) {
			verify(self, function(verified) {
				if (verified) {
					go.nextStep('to');
		    }
			});
		}
	};

});