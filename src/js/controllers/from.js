'use strict';

angular.module('topUpApp.controllers').controller('fromController', function($rootScope, $scope, go, orderService) {

  var self = this;

  initForm(this);

	$scope.$watch(function() {
    return this.firstName
  }.bind(this), function(value) {
		orderService.order.setFrom({
			firstName: this.firstName
		});
  }.bind(this));

	$scope.$watch(function() {
    return this.lastName
  }.bind(this), function(value) {
		orderService.order.setFrom({
			lastName: this.lastName
		});
  }.bind(this));

	$scope.$watch(function() {
    return this.email
  }.bind(this), function(value) {
		orderService.order.setFrom({
			email: this.email
		});
  }.bind(this));

	function initForm(obj) {
		self.firstName = orderService.order.from.firstName;
		self.lastName = orderService.order.from.lastName;
		self.email = orderService.order.from.email;
	};

	self.continue = function() {
		$scope.$broadcast('show-errors-check-validity');

		if ($scope.fromForm.$valid) {
			go.nextStep('from');
    }
	};

});