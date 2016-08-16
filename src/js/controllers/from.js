'use strict';

angular.module('topUpApp.controllers').controller('fromController', function($rootScope, $scope, lodash, appConfig, go, orderService, topUpService) {

  var self = this;

  self.documentTypes = appConfig.topUpServices[appConfig.topUpService].compliance.documentTypes;

  initForm(this);

	$scope.$watch(function() {
    return this.firstName
  }.bind(this), function(value) {
		setDocumentNumberValid(true);
		orderService.order.setFrom({
			firstName: this.firstName
		});
  }.bind(this));

	$scope.$watch(function() {
    return this.lastName
  }.bind(this), function(value) {
		setDocumentNumberValid(true);
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

	$scope.$watch(function() {
    return this.documentNumber
  }.bind(this), function(value) {
		setDocumentNumberValid(true);
		orderService.order.setFrom({
			id: {
				typeCode: this.selectedDocumentType.code,
				number: this.documentNumber
			}
		});
  }.bind(this));

	function initForm(obj) {
		obj.firstName = orderService.order.from.firstName;
		obj.lastName = orderService.order.from.lastName;
		obj.email = orderService.order.from.email;
		obj.documentNumber = orderService.order.from.id.number;
		obj.selectedDocumentType = self.documentTypes[0];

		if (orderService.order.from.id.typeCode.length > 0) {
			obj.selectedDocumentType = lodash.find(self.documentTypes, {code: orderService.order.from.id.typeCode});
		}
	};

	function setDocumentNumberValid(b) {
		$scope.fromForm.documentNumber.$setValidity('verify', b);
	};

	function verify(obj, callback) {
		var name = {
			first: orderService.order.from.firstName,
			last: orderService.order.from.lastName
		};

		var id = {
			type: obj.selectedDocumentType.code,
			number: obj.documentNumber
		};

		obj.inProgress = true;
		topUpService.verify('document', name, id, function(err, verified) {
			obj.inProgress = false;
			if (err) {
				obj.errorMessage = 'We had a problem verifying your information. Please try again.';
				return callback(false);
			}
			setDocumentNumberValid(verified);
			return callback(verified);
		});
	};

	self.setDocumentType = function(documentType) {
		self.selectedDocumentType = documentType;
		setDocumentNumberValid(true);
	};

	self.continue = function() {
		delete self.errorMessage;
		$scope.$broadcast('show-errors-check-validity');

		if ($scope.fromForm.$valid) {
			verify(self, function(verified) {
				if (verified) {
					go.nextStep('from');
		    }
			});
		}
	};

});