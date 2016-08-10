'use strict';

/* 
 * All exchange rates are obtained using BitPay's exchange rate API.
 */

var RateService = function(opts) {
  var self = this;

  opts = opts || {};
  self.lodash = opts.lodash;
  self.bpcService = opts.bpcService;

  self.SAT_TO_BTC = 1 / 1e8;
  self.BTC_TO_SAT = 1e8;
  self.UNAVAILABLE_ERROR = 'Service is not available - check for service.isAvailable() or use service.whenAvailable()';
  self.UNSUPPORTED_CURRENCY_ERROR = 'Currency not supported';

  self._isAvailable = false;
  self._rates = {};
  self._alternatives = [];
  self._queued = [];

  self._fetchCurrencies();
};

var _instance;
RateService.singleton = function(opts) {
  if (!_instance) {
    _instance = new RateService(opts);
  }
  return _instance;
};

RateService.prototype._fetchCurrencies = function() {
  var self = this;

	var bitpay = self.bpcService.getClient();
  var backoffSeconds = 5;
  var updateFrequencySeconds = 5 * 60;

  var retrieve = function() {
		bitpay.getRates(null, function(err, response) {
			if (err) {
	      setTimeout(function() {
	        backoffSeconds *= 1.5;
	        retrieve();
	      }, backoffSeconds * 1000);
	      return;
	    }

      self.lodash.each(response, function(currency) {
        self._rates[currency.code] = currency.rate;
        self._alternatives.push({
          name: currency.name,
          isoCode: currency.code,
          rate: currency.rate
        });
      });
      self._isAvailable = true;
      self.lodash.each(self._queued, function(item) {
        setTimeout(item.callback, 1);
      });
      self.lodash.pullAllBy(self._queued, [{'once': true}], 'once');
      setTimeout(retrieve, updateFrequencySeconds * 1000);
    });
  };

  retrieve();
};

RateService.prototype.getRate = function(code) {
  return this._rates[code];
};

RateService.prototype.getAlternatives = function() {
  return this._alternatives;
};

RateService.prototype.isAvailable = function() {
  return this._isAvailable;
};

RateService.prototype.whenAvailable = function(callback, once) {
  if (once == undefined) {
    once = false;
  }
  if (this.isAvailable()) {
    setTimeout(callback, 1);
  } else {
    this._queued.push({
      callback: callback,
      once: once
    });
  }
};

RateService.prototype.toFiat = function(satoshis, code) {
  if (!this.isAvailable()) {
    return null;
  }

  return satoshis * this.SAT_TO_BTC * this.getRate(code);
};

RateService.prototype.fromFiat = function(amount, code) {
  if (!this.isAvailable()) {
    return null;
  }
  return amount / this.getRate(code) * this.BTC_TO_SAT;
};

RateService.prototype.listAlternatives = function() {
  var self = this;
  if (!this.isAvailable()) {
    return [];
  }

  return self.lodash.map(this.getAlternatives(), function(item) {
    return {
      name: item.name,
      isoCode: item.isoCode
    }
  });
};

angular.module('topUpApp.services').factory('rateService', function(bpcService, lodash) {
  var cfg = {
    bpcService: bpcService,
    lodash: lodash
  };
  return RateService.singleton(cfg);
});
