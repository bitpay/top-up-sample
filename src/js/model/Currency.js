'use strict';

angular.module('topUpApp.model').factory('Currency', function () {

  var currency = {
    'unknown': {symbol: ':-)', icon: 'fa-smile-o', longName: 'Unknown'},
    'AED': {symbol: 'د.إ', icon: 'fa-money', longName: 'UAE Dirham'},
    'AFN': {symbol: '؋', icon: 'fa-money', longName: 'Afghan Afghani'},
    'ALL': {symbol: 'LEK', icon: 'fa-money', longName: 'Albanian Lek'},
    'AMD': {symbol: 'Դրամ', icon: 'fa-money', longName: 'Armenian Dram'},
    'ANG': {symbol: 'ƒ', icon: 'fa-money', longName: 'Netherlands Antillean Guilder'},
    'AOA': {symbol: 'Kz', icon: 'fa-money', longName: 'Angolan Kwanza'},
    'ARS': {symbol: '$', icon: 'fa-dollar', longName: 'Argentine Peso'},
    'AUD': {symbol: '$', icon: 'fa-dollar', longName: 'Australian Dollar'},
    'AWG': {symbol: 'ƒ', icon: 'fa-money', longName: 'Aruban Florin'},
    'AZN': {symbol: 'ман', icon: 'fa-money', longName: 'Azerbaijani Manat'},
    'BAM': {symbol: 'KM', icon: 'fa-money', longName: 'Bosnia-Herzegovina Convertible Mark'},
    'BBD': {symbol: '$', icon: 'fa-dollar', longName: 'Barbadian Dollar'},
    'BDT': {symbol: '৳', icon: 'fa-money', longName: 'Bangladeshi Taka'},
    'BGN': {symbol: 'лв', icon: 'fa-money', longName: 'Bulgarian Lev'},
    'BHD': {symbol: '.د.ب', icon: 'fa-money', longName: 'Bahraini Dinar'},
    'BIF': {symbol: 'FBu', icon: 'fa-money', longName: 'Burundian Franc'},
    'BMD': {symbol: '$', icon: 'fa-dollar', longName: 'Bermudan Dollar'},
    'BND': {symbol: '$', icon: 'fa-dollar', longName: 'Brunei Dollar'},
    'BOB': {symbol: '$b', icon: 'fa-dollar', longName: 'Bolivian Boliviano'},
    'BRL': {symbol: 'R$', icon: 'fa-dollar', longName: 'Brazilian Real'},
    'BSD': {symbol: '$', icon: 'fa-dollar', longName: 'Bahamian Dollar'},
    'BTC': {symbol: '฿', icon: 'fa-bitcoin', longName: 'Bitcoin'},
    'BTN': {symbol: 'Nu', icon: 'fa-money', longName: 'Bhutanese Ngultrum'},
    'BWP': {symbol: 'P', icon: 'fa-money', longName: 'Botswanan Pula'},
    'BYR': {symbol: 'p.', icon: 'fa-money', longName: 'Belarusian Ruble'},
    'BZD': {symbol: 'BZ$', icon: 'fa-dollar', longName: 'Belize Dollar'},
    'CAD': {symbol: '$', icon: 'fa-dollar', longName: 'Canadian Dollar'},
    'CDF': {symbol: 'FC', icon: 'fa-money', longName: 'Congolese Franc'},
    'CHF': {symbol: 'CHF', icon: 'fa-money', longName: 'Swiss Franc'},
    'CLF': {symbol: 'UF', icon: 'fa-money', longName: 'Chilean Unit of Account (UF)'},
    'CLP': {symbol: '$', icon: 'fa-dollar', longName: 'Chilean Peso'},
    'CNY': {symbol: '¥', icon: 'fa-cny', longName: 'Chinese Yuan'},
    'COP': {symbol: '$', icon: 'fa-dollar', longName: 'Colombian Peso'},
    'CRC': {symbol: '₡', icon: 'fa-money', longName: 'Costa Rican Colón'},
    'CUP': {symbol: '', icon: 'fa-money', longName: 'Cuban Peso'},
    'CVE': {symbol: '$', icon: 'fa-dollar', longName: 'Cape Verdean Escudo'},
    'CZK': {symbol: 'Kč', icon: 'fa-money', longName: 'Czech Koruna'},
    'DJF': {symbol: 'Fdj', icon: 'fa-money', longName: 'Djiboutian Franc'},
    'DKK': {symbol: 'kr', icon: 'fa-money', longName: 'Danish Krone'},
    'DOP': {symbol: 'RD$', icon: 'fa-dollar', longName: 'Dominican Peso'},
    'DZD': {symbol: 'دج', icon: 'fa-money', longName: 'Algerian Dinar'},
    'EEK': {symbol: 'kr', icon: 'fa-money', longName: 'Estonian Kroon'},
    'EGP': {symbol: '£', icon: 'fa-gbp', longName: 'Egyptian Pound'},
    'ETB': {symbol: 'Br ', icon: 'fa-money', longName: 'Ethiopian Birr'},
    'EUR': {symbol: '€', icon: 'fa-eur', longName: 'Eurozone Euro'},
    'FJD': {symbol: '$', icon: 'fa-dollar', longName: 'Fijian Dollar'},
    'FKP': {symbol: '£', icon: 'fa-gbp', longName: 'Falkland Islands Pound'},
    'GBP': {symbol: '£', icon: 'fa-gbp', longName: 'Pound Sterling'},
    'GEL': {symbol: 'ლ', icon: 'fa-money', longName: 'Georgian Lari'},
    'GHS': {symbol: '¢', icon: 'fa-money', longName: 'Ghanaian Cedi'},
    'GIP': {symbol: '£', icon: 'fa-gbp', longName: 'Gibraltar Pound'},
    'GMD': {symbol: 'D', icon: 'fa-money', longName: 'Gambian Dalasi'},
    'GNF': {symbol: 'FG ', icon: 'fa-money', longName: 'Guinean Franc'},
    'GTQ': {symbol: 'Q', icon: 'fa-money', longName: 'Guatemalan Quetzal'},
    'GYD': {symbol: '$', icon: 'fa-dollar', longName: 'Guyanaese Dollar'},
    'HKD': {symbol: '$', icon: 'fa-dollar', longName: 'Hong Kong Dollar'},
    'HNL': {symbol: 'L', icon: 'fa-money', longName: 'Honduran Lempira'},
    'HRK': {symbol: 'kn', icon: 'fa-money', longName: 'Croatian Kuna'},
    'HTG': {symbol: 'G', icon: 'fa-money', longName: 'Haitian Gourde'},
    'HUF': {symbol: 'Ft', icon: 'fa-money', longName: 'Hungarian Forint'},
    'IDR': {symbol: 'Rp', icon: 'fa-money', longName: 'Indonesian Rupiah'},
    'ILS': {symbol: '₪', icon: 'fa-ils', longName: 'Israeli Shekel'},
    'INR': {symbol: '₹', icon: 'fa-inr', longName: 'Indian Rupee'},
    'IQD': {symbol: 'ع.د', icon: 'fa-money', longName: 'Iraqi Dinar'},
    'IRR': {symbol: '', icon: 'fa-money', longName: 'Iranian Rial'},
    'ISK': {symbol: 'kr', icon: 'fa-money', longName: 'Icelandic Króna'},
    'JEP': {symbol: '£', icon: 'fa-gbp', longName: 'Jersey Pound'},
    'JMD': {symbol: 'J$', icon: 'fa-dollar', longName: 'Jamaican Dollar'},
    'JOD': {symbol: 'د.ا', icon: 'fa-money', longName: 'Jordanian Dinar'},
    'JPY': {symbol: '¥', icon: 'fa-jpy', longName: 'Japanese Yen'},
    'KES': {symbol: 'KSh', icon: 'fa-money', longName: 'Kenyan Shilling'},
    'KGS': {symbol: 'лв', icon: 'fa-money', longName: 'Kyrgystani Som'},
    'KHR': {symbol: '៛', icon: 'fa-money', longName: 'Cambodian Riel'},
    'KMF': {symbol: 'CF', icon: 'fa-money', longName: 'Comorian Franc'},
    'KPW': {symbol: '', icon: 'fa-money', longName: 'North Korean Won'},
    'KRW': {symbol: '₩', icon: 'fa-krw', longName: 'South Korean Won'},
    'KWD': {symbol: 'د.ك', icon: 'fa-money', longName: 'Kuwaiti Dinar'},
    'KYD': {symbol: '$', icon: 'fa-dollar', longName: 'Cayman Islands Dollar'},
    'KZT': {symbol: 'лв', icon: 'fa-money', longName: 'Kazakhstani Tenge'},
    'LAK': {symbol: '₭', icon: 'fa-money', longName: 'Laotian Kip'},
    'LBP': {symbol: '£', icon: 'fa-gbp', longName: 'Lebanese Pound'},
    'LKR': {symbol: '₨', icon: 'fa-money', longName: 'Sri Lankan Rupee'},
    'LRD': {symbol: '$', icon: 'fa-dollar', longName: 'Liberian Dollar'},
    'LSL': {symbol: 'L', icon: 'fa-money', longName: 'Lesotho Loti'},
    'LTL': {symbol: 'Lt', icon: 'fa-money', longName: 'Lithuanian Litas'},
    'LVL': {symbol: 'Ls', icon: 'fa-money', longName: 'Latvian Lats'},
    'LYD': {symbol: 'ل.د', icon: 'fa-money', longName: 'Libyan Dinar'},
    'MAD': {symbol: 'د.م', icon: 'fa-money', longName: 'Moroccan Dirham'},
    'MDL': {symbol: 'L', icon: 'fa-money', longName: 'Moldovan Leu'},
    'MGA': {symbol: 'Ar', icon: 'fa-money', longName: 'Malagasy Ariary'},
    'MKD': {symbol: 'ден', icon: 'fa-money', longName: 'Macedonian Denar'},
    'MMK': {symbol: 'K', icon: 'fa-money', longName: 'Myanma Kyat'},
    'MNT': {symbol: '₮', icon: 'fa-money', longName: 'Mongolian Tugrik'},
    'MOP': {symbol: 'MOP$', icon: 'fa-dollar', longName: 'Macanese Pataca'},
    'MRO': {symbol: 'UM', icon: 'fa-money', longName: 'Mauritanian Ouguiya'},
    'MUR': {symbol: '₨', icon: 'fa-money', longName: 'Mauritian Rupee'},
    'MVR': {symbol: 'MRf', icon: 'fa-money', longName: 'Maldivian Rufiyaa'},
    'MWK': {symbol: 'MK', icon: 'fa-money', longName: 'Malawian Kwacha'},
    'MXN': {symbol: '$', icon: 'fa-dollar', longName: 'Mexican Peso'},
    'MYR': {symbol: 'RM', icon: 'fa-money', longName: 'Malaysian Ringgit'},
    'MZN': {symbol: 'MT', icon: 'fa-money', longName: 'Mozambican Metical'},
    'NAD': {symbol: 'MT', icon: 'fa-money', longName: 'Namibian Dollar'},
    'NGN': {symbol: '₦', icon: 'fa-money', longName: 'Nigerian Naira'},
    'NIO': {symbol: 'C$', icon: 'fa-dollar', longName: 'Nicaraguan Córdoba'},
    'NOK': {symbol: 'kr', icon: 'fa-money', longName: 'Norwegian Krone'},
    'NPR': {symbol: '₨', icon: 'fa-money', longName: 'Nepalese Rupee'},
    'NZD': {symbol: '$', icon: 'fa-dollar', longName: 'New Zealand Dollar'},
    'OMR': {symbol: '﷼', icon: 'fa-money', longName: 'Omani Rial'},
    'PAB': {symbol: 'B/.', icon: 'fa-money', longName: 'Panamanian Balboa'},
    'PEN': {symbol: 'S/.', icon: 'fa-money', longName: 'Peruvian Nuevo Sol'},
    'PGK': {symbol: 'K', icon: 'fa-money', longName: 'Papua New Guinean Kina'},
    'PHP': {symbol: '₱', icon: 'fa-money', longName: 'Philippine Peso'},
    'PKR': {symbol: '₨', icon: 'fa-money', longName: 'Pakistani Rupee'},
    'PLN': {symbol: 'zł', icon: 'fa-money', longName: 'Polish Zloty'},
    'PYG': {symbol: 'Gs', icon: 'fa-money', longName: 'Paraguayan Guarani'},
    'QAR': {symbol: '﷼', icon: 'fa-money', longName: 'Qatari Rial'},
    'RON': {symbol: 'lei', icon: 'fa-money', longName: 'Romanian Leu'},
    'RSD': {symbol: 'Дин.', icon: 'fa-money', longName: 'Serbian Dinar'},
    'RUB': {symbol: 'руб', icon: 'fa-rub', longName: 'Russian Ruble'},
    'RWF': {symbol: 'RF', icon: 'fa-money', longName: 'Rwandan Franc'},
    'SAR': {symbol: '﷼', icon: 'fa-money', longName: 'Saudi Riyal'},
    'SBD': {symbol: '$', icon: 'fa-dollar', longName: 'Solomon Islands Dollar'},
    'SCR': {symbol: '₨', icon: 'fa-money', longName: 'Seychellois Rupee'},
    'SDG': {symbol: '£', icon: 'fa-gbp', longName: 'Sudanese Pound'},
    'SEK': {symbol: 'kr', icon: 'fa-money', longName: 'Swedish Krona'},
    'SGD': {symbol: '$', icon: 'fa-dollar', longName: 'Singapore Dollar'},
    'SHP': {symbol: '£', icon: 'fa-gbp', longName: 'Saint Helena Pound'},
    'SLL': {symbol: 'Le', icon: 'fa-money', longName: 'Sierra Leonean Leone'},
    'SOS': {symbol: 'S', icon: 'fa-money', longName: 'Somali Shilling'},
    'SRD': {symbol: '$', icon: 'fa-dollar', longName: 'SurilongNamese Dollar'},
    'STD': {symbol: 'Db', icon: 'fa-money', longName: 'São Tomé and Príncipe Dobra'},
    'SVC': {symbol: '₡', icon: 'fa-money', longName: 'Salvadoran Colón'},
    'SYP': {symbol: '£', icon: 'fa-gbp', longName: 'Syrian Pound'},
    'SZL': {symbol: 'L', icon: 'fa-money', longName: 'Swazi Lilangeni'},
    'THB': {symbol: '฿', icon: 'fa-money', longName: 'Thai Baht'},
    'TJS': {symbol: 'SM', icon: 'fa-money', longName: 'Tajikistani Somoni'},
    'TMT': {symbol: 'm', icon: 'fa-money', longName: 'Turkmenistani Manat'},
    'TND': {symbol: 'د.ت', icon: 'fa-money', longName: 'Tunisian Dinar'},
    'TOP': {symbol: 'T$', icon: 'fa-money', longName: 'Tongan Paʻanga'},
    'TRY': {symbol: '₤', icon: 'fa-try', longName: 'Turkish Lira'},
    'TTD': {symbol: 'TT$', icon: 'fa-money', longName: 'Trinidad and Tobago Dollar'},
    'TWD': {symbol: 'NT$', icon: 'fa-money', longName: 'New Taiwan Dollar'},
    'TZS': {symbol: 'x/y', icon: 'fa-money', longName: 'Tanzanian Shilling'},
    'UAH': {symbol: '₴', icon: 'fa-money', longName: 'Ukrainian Hryvnia'},
    'UGX': {symbol: 'USh', icon: 'fa-money', longName: 'Ugandan Shilling'},
    'USD': {symbol: '$', icon: 'fa-dollar', longName: 'US Dollar'},
    'UYU': {symbol: '$U', icon: 'fa-dollar', longName: 'Uruguayan Peso'},
    'UZS': {symbol: 'лв', icon: 'fa-money', longName: 'Uzbekistan Som'},
    'VEF': {symbol: 'Bs', icon: 'fa-money', longName: 'Venezuelan Bolívar Fuerte'},
    'VND': {symbol: '₫', icon: 'fa-money', longName: 'VietlongNamese Dong'},
    'VUV': {symbol: 'Vt', icon: 'fa-money', longName: 'Vanuatu Vatu'},
    'WST': {symbol: 'WS$', icon: 'fa-dollar', longName: 'Samoan Tala'},
    'XAF': {symbol: 'FCFA', icon: 'fa-money', longName: 'CFA Franc BEAC'},
    'XAG': {symbol: 'oz.', icon: 'fa-money', longName: 'Silver (troy ounce)'},
    'XAU': {symbol: 'oz.', icon: 'fa-money', longName: 'Gold (troy ounce)'},
    'XCD': {symbol: '$', icon: 'fa-dollar', longName: 'East Caribbean Dollar'},
    'XOF': {symbol: 'CFA', icon: 'fa-money', longName: 'CFA Franc BCEAO'},
    'XPF': {symbol: 'F', icon: 'fa-money', longName: 'CFP Franc'},
    'YER': {symbol: '﷼', icon: 'fa-money', longName: 'Yemeni Rial'},
    'ZAR': {symbol: 'R', icon: 'fa-money', longName: 'South African Rand'},
    'ZMW': {symbol: 'ZK', icon: 'fa-money', longName: 'Zambian Kwacha'},
    'ZWL': {symbol: 'Z$', icon: 'fa-dollar', longName: 'Zimbabwean Dollar'}
  };
  
  // Constructor
  // 
  function Currency() {
    // Static class, no instance.
  };

  // Static methods
  // 
  Currency.icon = function(code) {
    return currency[code].icon || currency['unknown'].icon;
/*
    if (currency[code]) {
      return currency[code].icon;
    } else {
      return currency['unknown'].icon;
    }
*/
  };

  Currency.longName = function(code) {
    return currency[code].longName || currency['unknown'].longName;
/*
    if (currency[code]) {
      return currency[code].longName;
    } else {
      return currency['unknown'].longName;
    }
*/
  };

 Currency.symbol = function(code) {
    return currency[code].symbol || currency['unknown'].symbol;
/*
    if (currency[code]) {
      return currency[code].symbol;
    } else {
      return currency['unknown'].symbol;
    }
    */
  };

  Currency.roundTwoDecimals = function(number) {
    return Math.round(number * 100) / 100;
  };

  return Currency;
});
