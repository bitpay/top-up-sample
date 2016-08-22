'use strict';

angular.module('topUpApp.services').factory('stubCustomerService', function($log, $http, $timeout, lodash, appConfig) {

  var root = {};

	var database;
	$http.get('db/stubCustomerDatabase.json').success(function(data) {
  	database = data;
	});

	// Stub api client to replaced with call to create an available client.
	// 
	// var apiClient = apiClientFactory.newClient(appConfig.topUpServices.<service-name>.api);
	var apiClient = {
		//
		// `name` must be an object of the form:
		// 		{
		//			first: '',
		//			last: ''
		//		}
		//
		doPhoneVerification: function(name, phoneNumber, callback) {

			function matchName(str1, str2) {
				// Real matching might use fuzzy logic.
				return str1.toLowerCase() == str2.toLowerCase();
			}

			function matchPhoneNumber(str1, str2) {
				// Real matching might use format verification.
				return str1 == str2;
			}

			var candidates = lodash.filter(database, function(c) {
			  return matchName(c.name.first, name.first) &&
			  	matchName(c.name.last, name.last) &&
			  	matchPhoneNumber(c.phone, phoneNumber);
			});

			// Simulate a service call delay.
			$timeout(function() {
				if (candidates.length > 1) {
					return callback(null, {
						status: {
							code: '-1',
							message: 'FAIL: multiple records match'
						},
						data: {
							name: name,
							phone: phoneNumber
						}
					});

				} else if (candidates.length == 0) {
					return callback(null, {
						status: {
							code: '-1',
							message: 'FAIL: no records match'
						},
						data: {
							name: name,
							phone: phoneNumber
						}
					});

				} else {
					return callback(null, {
						status: {
							code: '0',
							message: 'SUCCESS'
						},
						data: {
							name: name,
							phone: phoneNumber
						}
					});
				}
			}, 300);
		}
	};

	// Public methods
	// 
	// This method wraps the api call to validate the phone number.
	// The callback responds with either true (valid) or false (invalid), or an error.
	//
	// `name` must be an object of the form:
	// 		{
	//			first: '',
	//			last: ''
	//		}
	//
	root.phoneMatch = function(name, phoneNumber, callback) {
		if (!name || !phoneNumber || !callback) {
			$log.debug('Phone match: invalid parameters');
			return;
		}

		if (apiClient) {
			apiClient.doPhoneVerification(name, phoneNumber, function(err, response) {
				if (err) {
					$log.debug('Phone match error: ' + JSON.stringify(err));
					return callback(err);
				}
				$log.debug('Phone match response: ' + JSON.stringify(response));

				var status = response.status;
				if (status.message == 'SUCCESS') {

					// Validate the response.
					var response = response.data;
					if (response.name != name ||
						response.phone != phoneNumber) {

						// Should never happen.
						callback({
							code: '-1',
							message: 'RESPONSE-MISMATCH'
						}, transaction);

					} else {
						// Callback with "verified OK" (true).
						callback(null, true);
					}

				} else {
					// Callback with "not verfified" (false).
					callback(null, false);
				}
			});
		}
	};
  
  return root;
});
