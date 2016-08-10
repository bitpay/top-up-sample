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

You must provide API access keys/tokens for each service you intend to use. See `appConfig.json`.

### BitPay API token

For the application to create BitPay invoices you must link the application to a BitPay merchant account. You can configure the application for both production (livenet transactions) and development (testnet transactions) simultaneously. Follow these steps:

 1. Login to your [`production BitPay merchant account`](https://bitpay.com/dashboard/login/) or [`test BitPay merchant account`](https://bitpay.com/dashboard/login/)
 2. Click "Payment Tools", then "Manage API Tokens", then "Add New Token"
 5. Enter a label (e.g. "Top-Up app")
 6. Uncheck the "Require Authentication" checkbox
 7. Click "Add Token" button
 8. Copy and paste the Token into the api token entry in `appConfig.json`

### Other services

The application includes a `stubTopUpService` that serves as a placeholder for your service. Use this as a reference implementation for your top-up service.

Obtain API keys and configure other services as required. See `appConfig.json`
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

You can target payment methods for development or production. See `appConfig.json`.
Ensure you have [Node](https://nodejs.org/) installed, then install and start Top-Up:

```sh
npm install
grunt --target=prod
npm start
```

Visit [`localhost:8000`](http://localhost:8000/) to view the app.

## Support

* GitHub Issues
  * Open an issue if you are having problems with this project

## License

Top-Up is released under the MIT License.  Please refer to the LICENSE file that accompanies this project for more information including complete terms and conditions.
