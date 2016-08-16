'use strict';

angular.module('topUpApp.services').factory('stubComplianceService', function($log, $http, $timeout, lodash, appConfig) {

  var root = {};
	var database;
	$http.get('/db/stubComplianceDatabase.json').success(function(data) {
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
		// `id` must be an object of the form:
		// 		{
	  //			type: '',
	  //			number: ''
		//		}
		//		
		doIdVerification: function(name, id, callback) {


			function matchName(str1, str2) {
				// Real matching might use fuzzy logic.
				return str1.toLowerCase() == str2.toLowerCase();
			}

			function matchDocId(type, str1, str2) {
				// Real matching might use id format verification.
				switch (type) {
					case "DL":
						return str1 == str2;
						break;
					case "MA":
						return str1 == str2;
						break;
					case "PP":
						return str1 == str2;
						break;
					case "VISA":
						return str1 == str2;
						break;
					case "GC":
						return str1 == str2;
						break;
					case "SID":
						return str1 == str2;
						break;
					case "MID":
						return str1 == str2;
						break;
					case "VRC":
						return str1 == str2;
						break;
					case "GID":
						return str1 == str2;
						break;
					case "TIN":
						return str1 == str2;
						break;
					default:
						return false;
						break;
				}
			}

			var candidates = lodash.filter(database, function(c) {
			  return matchName(c.name.first, name.first) &&
			  	matchName(c.name.last, name.last) &&
			  	matchDocId(id.type, c.documents[id.type], id.number);
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
							id: id
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
							id: id
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
							id: id
						}
					});
				}
			}, 300);
		}
	};

	// Public methods
	// 
	// This method wraps the api call to perform an id match on a name.
	// The callback responds with either true (valid) or false (invalid), or an error.
	// 
	// `name` must be an object of the form:
	// 		{
	//			first: '',
	//			last: ''
	//		}
	//
	// `id` must be an object of the form:
	// 		{
  //			type: '',
  //			number: ''
	//		}
	//
	root.idMatch = function(name, id, callback) {
		if (!name || !id || !callback) {
			$log.debug('ID match: invalid parameters');
			return;
		}

		if (apiClient) {
			apiClient.doIdVerification(name, id, function(err, response) {
				if (err) {
					$log.debug('ID match error: ' + JSON.stringify(err));
					return callback(err);
				}
				$log.debug('ID match response: ' + JSON.stringify(response));

				var status = response.status;
				if (status.message == 'SUCCESS') {

					// Validate the response.
					var response = response.data;
					if (response.name != name) {

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
