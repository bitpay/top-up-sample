'use strict';

angular.module('topUpApp.controllers').controller('indexController', function(go, platformInfo) {

  var self = this;

  self.viewManagedStatusBar = platformInfo.isIOS;
	self.steps = go.steps;

	self.getStep = function(num) {
		return go.getStep(num);
	};

});