Top-Up is a sample application that applies a bitcoin payment to a targeted account service.

## Main Features

- Integration with BitPay bitcoin payment service using modal invoice
- Supports bitcoin livenet and testnet
- Configure from 160+ currencies
- Responsive UI for mobile and desktop presentation
- Form validation & error handling
- Modular design uses service providers
- AngularJS application
- Bootstrap presentation
- Easily configured

## Configuration

You must provide API access keys/tokens for each service you intend to use. See [appConfig.json](./appConfig.json).

### Payment methods

This application integrates with the [BitPay merchant services platform](https://bitpay.com) for accepting bitcoin as a payment from your customers.  You can add additional payment methods by creating [providers](./src/js/services/providers) and calling your providers from [paymentService.js](./src/js/services/paymentService.js).

#### BitPay (bitcoin)

For the application to create BitPay invoices you must link the application to a BitPay merchant account. You can configure the application for both production (livenet transactions) and development (testnet transactions) simultaneously. Follow these steps:

 1. Login to your [`production BitPay merchant account`](https://bitpay.com/dashboard/login/) or [`test BitPay merchant account`](https://test.bitpay.com/dashboard/login/)
 2. Click "Payment Tools", then "Manage API Tokens", then "Add New Token"
 5. Enter a label (e.g. "Top-Up app")
 6. Uncheck the "Require Authentication" checkbox
 7. Click "Add Token" button
 8. Copy and paste the Token into the api token entry in [appConfig.json](./appConfig.json)

### Top-up services

You can add additional top-up services by creating [providers](./src/js/services/providers) and calling your providers from [topUpService.js](.src/js/services/topUpService.js). This application includes a [stubTopUpService](./src/js/services/providers/stubTopUpService.js) that serves as a placeholder for your top-up service. Use this as a reference implementation for your top-up service.

Obtain API keys and configure your top-up service as required. See [appConfig.json](./appConfig.json). The key `topUpService` selects your target service at runtime.

## Install For Development

Ensure you have [Node](https://nodejs.org/) installed, then install and start Top-Up:

```sh
npm install
npm start
```

Visit [`localhost:8000`](http://localhost:8000/) to view the app.

### Making changes

After changes are made re-build and re-start Top-Up:

```sh
grunt
npm start
```

## Build For Production

You can target payment methods for development or production. See [appConfig.json](./appConfig.json).
Ensure you have [Node](https://nodejs.org/) installed, then install and start Top-Up:

```sh
npm install
grunt --target=prod
npm start
```

Visit [`localhost:8000`](http://localhost:8000/) to view the app.

## Known Issues

* [TODO] There is no IPN handler for BitPay to POST invoice notifications to the application.
	* The application relies on window.postMessage() to receive payment status from the invoice.

## Support

* [GitHub Issues](https://github.com/bitpay/top-up-sample/issues)
  * Open an issue if you are having problems with this project

## License

Top-Up is released under the MIT License.  Please refer to the LICENSE file that accompanies this project for more information including complete terms and conditions.
