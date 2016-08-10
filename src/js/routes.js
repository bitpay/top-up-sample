'use strict';

angular.module('topUpApp').config(function(historicLogProvider, $provide, $logProvider, $stateProvider, $urlRouterProvider, $compileProvider) {

    $logProvider.debugEnabled(true);
    $provide.decorator('$log', ['$delegate', 'platformInfo',
      function($delegate, platformInfo) {
        var historicLog = historicLogProvider.$get();

        ['debug', 'info', 'warn', 'error', 'log'].forEach(function(level) {
          if (platformInfo.isDevel && level == 'error') return;

          var orig = $delegate[level];
          $delegate[level] = function() {
            if (level == 'error')
              console.log(arguments);

            var args = Array.prototype.slice.call(arguments);

            args = args.map(function(v) {
              try {
                if (typeof v == 'undefined') v = 'undefined';
                if (!v) v = 'null';
                if (typeof v == 'object') {
                  if (v.message)
                    v = v.message;
                  else
                    v = JSON.stringify(v);
                }
                // Trim output in mobile
                if (platformInfo.isCordova) {
                  v = v.toString();
                  if (v.length > 3000) {
                    v = v.substr(0, 2997) + '...';
                  }
                }
              } catch (e) {
                console.log('Error at log decorator:', e);
                v = 'undefined';
              }
              return v;
            });

            try {
              if (platformInfo.isCordova)
                console.log(args.join(' '));

              historicLog.add(level, args.join(' '));
              orig.apply(null, args);
            } catch (e) {
              console.log('ERROR (at log decorator):', e, args[0]);
            }
          };
        });
        return $delegate;
      }
    ]);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('start', {
        url: '/',
        needsOrder: false,
        views: {
          'main': {
            templateUrl: 'views/start.html',
          },
        }
      })
      .state('from', {
        url: '/from',
        needsOrder: true,
        views: {
          'main': {
            templateUrl: 'views/from.html'
          }
        }
      })
      .state('to', {
        url: '/to',
        needsOrder: true,
        views: {
          'main': {
            templateUrl: 'views/to.html'
          }
        }
      })
      .state('amount', {
        url: '/amount',
        needsOrder: true,
        views: {
          'main': {
            templateUrl: 'views/amount.html'
          }
        }
      })
      .state('pay', {
        url: '/pay',
        needsOrder: true,
        views: {
          'main': {
            templateUrl: 'views/pay.html'
          }
        }
      })
      .state('finished', {
        url: '/finished',
        needsOrder: true,
        views: {
          'main': {
            templateUrl: 'views/finished.html'
          }
        }
      })
      .state('topUpError', {
        url: '/topUpError',
        needsOrder: true,
        views: {
          'main': {
            templateUrl: 'views/topUpError.html'
          }
        }
      });
  })
  .run(function($rootScope, $state, $log, go, orderService) {

    // Application refresh.
    $log.debug("Starting");
    orderService.init();

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!orderService.order && toState.needsOrder) {

        // No order.  Create an order and start over.
        event.preventDefault();

        orderService.createOrder(function() {
          go.resetNavigation();
          go.firstStep();
        }, true);

      } else if (!go.visited(toState.name)) {

          // Block attempts to access steps not yet navigated to (by entering into address bar directly).
          event.preventDefault();

      } else {

        // Happens if the start step is typed into address bar).
        if (go.isStartStep(toState.name)) {
          orderService.init();
        }
        $log.debug('Route change from:', fromState.name || '-', ' to:', toState.name);
      }
    });
  });
