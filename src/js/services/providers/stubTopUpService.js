'use strict';

angular.module('topUpApp.services').factory('stubTopUpService', function($log, appConfig, stubComplianceService, stubCustomerService) {

  var root = {};

	// Stub api client to replaced with call to create an available client.
	// 
	//  - This example tops-up a specified phone number.
	//  - This application is configured to receive a phone number from the user as the target account.
	//  - Your service might use some other attribute (e.g., accountNumber).
	// 
	// var apiClient = apiClientFactory.newClient(appConfig.topUpServices.<service-name>.api);
	var apiClient = {
		doIt: function(phoneNumber, amount, callback) {
			callback(null, {
				status: {
					code: '0',
					message: 'SUCCESS'
				},
				data: {
					id: '1701',
					phone: phoneNumber,
					value: amount
				}
			});
		}
	};

	// Public methods
	// 
	root.verify = function(what, a, b, callback) {
		switch (what) {
			case 'document':
				stubComplianceService.idMatch(a, b, callback);
				break;
			case 'phone':
				stubCustomerService.phoneMatch(a, b, callback);
				break;
			default:
				break;
		}
	};

	// This method wraps the api call to perform the top-up.
	// The callback responds with an object compatible with order.payment.status.transaction, or an error.
	// 
	root.topUp = function(phoneNumber, amount, callback) {
		if (!phoneNumber || !amount || !callback) {
			$log.debug('Stub top-up: invalid parameters');
			return;
		}

		if (apiClient) {
			apiClient.doIt(phoneNumber, amount, function(err, response) {
				if (err) {
					$log.debug('Stub top-up error: ' + JSON.stringify(err));
					return callback(err);
				}
				$log.debug('Stub top-up response: ' + JSON.stringify(response));

				var status = response.status;
				if (status.message == 'SUCCESS') {

					// Validate the transaction response.
					var transaction = response.data;
					if (transaction.phone != phoneNumber ||
						transaction.value != amount) {

						// Should never happen.
						callback({
							code: '-1',
							message: 'RESPONSE-MISMATCH'
						}, transaction);

					} else {
						// Callback with only the order payment status transaction object.
						// No link to the transaction.
						callback(null, {
							id: transaction.id,
							url: undefined
						});
					}

				} else {
					callback({
						code: status.code,
						message: status.message
					});
				}
			});
		}
	};
  
  return root;
});
