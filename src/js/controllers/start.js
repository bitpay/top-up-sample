'use strict';

angular.module('topUpApp.controllers').controller('startController', function(go) {

  var self = this;

	self.start = function() {
		go.firstStep();
	};

});
