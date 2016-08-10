'use strict';

angular.module('topUpApp.controllers').controller('indexController', function(go) {

  var self = this;

	self.steps = go.steps;

	self.getStep = function(num) {
		return go.getStep(num);
	};

});