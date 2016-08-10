'use strict';

var modules = [
  'ui.router',
  'ui.bootstrap',
  'ngLodash',
  'topUpApp.controllers',
  'topUpApp.directives',
  'topUpApp.filters',
  'topUpApp.model',
  'topUpApp.services',
	'bpcModule'
];

var topUpApp = window.topUpApp = angular.module('topUpApp', modules);

angular.module('topUpApp.controllers', []);
angular.module('topUpApp.directives', []);
angular.module('topUpApp.filters', []);
angular.module('topUpApp.model', []);
angular.module('topUpApp.services', []);
