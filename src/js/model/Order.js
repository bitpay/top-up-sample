'use strict';

angular.module('topUpApp.model').factory('Order', function ($log, lodash, rateService, Currency) {

  var STATUS_CONFIRMED = 'confirmed';
  var STATUS_NONE = 'none';

  var defaultConfig = {
	  sendCurrency: 'USD',
	  receiveCurrency: 'USD',
    feePercentage: 0,
    paymentMethod: '',
    topUpService: ''
  };

  var defaultOrder = {
    header: {
      itemDescription: '',
      itemCode: ''
    },
	  from: {
			firstName: '',
			lastName: '',
			email: ''
	  },
	  to: {
			firstName: '',
			lastName: '',
			email: '',
      phone: '',
      account: '' // Not used, this app is designed to top-up a phone number (.to.phone).
	  },
	  amount: {
	  	currency: defaultConfig.sendCurrency,
	  	price: 0
	  },
	  message: {
	  	text: ''
	  },
	  fee: {
	  	percentage: defaultConfig.feePercentage,
	  	amount: 0
	  },
	  receive: {
	  	currency: defaultConfig.receiveCurrency,
	  	currencyPrice: 0,
	  	amount: 0
	  },
	  payment: {
      method: defaultConfig.paymentMethod,
      status: {
        text: STATUS_NONE,
        transaction: {
          id: '',
          url: ''
        }
      }
	  },
    topUp: {
      service: defaultConfig.topUpService,
      status: {
        text: STATUS_NONE,
        transaction: {
          id: ''
        }
      }
    }
  };

  // Constructor
  // 
  function Order(opts) {
    this.header = lodash.cloneDeep(defaultOrder.header);
    this.from = lodash.cloneDeep(defaultOrder.from);
    this.to = lodash.cloneDeep(defaultOrder.to);
    this.amount = lodash.cloneDeep(defaultOrder.amount);
    this.message = lodash.cloneDeep(defaultOrder.message);
    this.fee = lodash.cloneDeep(defaultOrder.fee);
    this.receive = lodash.cloneDeep(defaultOrder.receive);
    this.payment = lodash.cloneDeep(defaultOrder.payment);
    this.topUp = lodash.cloneDeep(defaultOrder.topUp);

    // Specified configuration can override defaults.
    this.header.itemCode = opts.itemCode || defaultOrder.header.itemCode;
    this.header.itemDescription = opts.itemDescription || defaultOrder.header.itemDescription;
    this.amount.currency = opts.sendCurrency || defaultOrder.amount.currency;
    this.receive.currency = opts.receiveCurrency || defaultOrder.receive.currency;
    this.payment.method = opts.paymentMethod || defaultOrder.payment.method;
    this.fee.percentage = opts.feePercentage || defaultOrder.fee.percentage;
    this.topUp.service = opts.topUpService || defaultOrder.topUp.service;

    recompute(this);
    $log.debug('New order created');
    return this;
  };

  // Public methods
  //
  Order.prototype.setFrom = function(from) {
		lodash.merge(this.from, from);
    return this;
  };

  Order.prototype.setTo = function(to) {
		lodash.merge(this.to, to);
    return this;
  };

  Order.prototype.setAmount = function(amount) {
		lodash.merge(this.amount, amount);
		recompute(this);
    return this;
  };

  Order.prototype.setMessage = function(message) {
		lodash.merge(this.message, message);
    return this;
  };

  Order.prototype.setFee = function(fee) {
		this.fee.percentage = fee;
		recompute(this);
    return this;
  };

  Order.prototype.setReceiveAmount = function(receiveAmount) {
  	this.receive.amount = receiveAmount;
		recomputeBackward(this);
    return this;
  };

  Order.prototype.setPayment = function(payment) {
		lodash.merge(this.payment, payment);
    return this;
  };

  Order.prototype.confirmPayment = function(transaction, callback) {
    this.payment.status.text = STATUS_CONFIRMED;
    this.payment.status.transaction = transaction;
    return callback(this);
  };

  Order.prototype.confirmTopUp = function(transaction, callback) {
    this.topUp.status.text = STATUS_CONFIRMED;
    this.topUp.status.transaction = transaction;
    return callback(this);
  };

  // Private methods
  // 
  function recompute(obj) {
  	// Order is important.
		computeReceiveCurrencyPrice(obj);
  	computeFee(obj);
  	computeReceiveAmount(obj);
  };

  function recomputeBackward(obj) {
  	// Recompute the order after the receive amount was updated.
  	// Order is important.
		computeReceiveCurrencyPrice(obj);
  	computeAmount(obj);
  	computeFee(obj);
  };

  function computeFee(obj) {
  	// Always in the obj.amount.currency.
  	obj.fee.amount = Currency.roundTwoDecimals(obj.amount.price * (obj.fee.percentage / 100));
  };

  function computeAmount(obj) {
  	obj.amount.price = Currency.roundTwoDecimals((obj.receive.amount / obj.receive.currencyPrice) / ((100.0 - obj.fee.percentage) / 100));
  };

  function computeReceiveAmount(obj) {
  	obj.receive.amount = Math.round((obj.amount.price - obj.fee.amount) * obj.receive.currencyPrice);
  };

  function computeReceiveCurrencyPrice(obj) {
	  obj.receive.currencyPrice = Currency.roundTwoDecimals(rateService.getRate(obj.receive.currency) / rateService.getRate(obj.amount.currency));
	};

  return Order;
});