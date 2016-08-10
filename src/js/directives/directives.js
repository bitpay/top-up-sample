'use strict';

angular.module('topUpApp.directives')

  // Allows format of elements.
  // <input type="text" ng-model="test" format="number" />
  // <input type="text" ng-model="test" format="currency" />
  // <span ng-model="test" format="currency" />
	.directive('format', ['$filter', function ($filter, $browser) {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        switch (attrs.format) {
          case 'currency': formatCurrency(); break;
          case 'telephone': formatTelephone(); break;
          default: break;
        }

        function formatCurrency() {
        	if (elem[0].nodeName != "INPUT") {
        		// Handle elements other than <input>
        		// Will replace element text with model value
  					scope.$watch(attrs.ngModel, function(value) {
  	          elem.text($filter(attrs.format)(value, '')); // No symbol
  	        });

  				} else {

  	        if (!ctrl) return;

  	        ctrl.$formatters.unshift(function (a) {
  	          return $filter(attrs.format)(ctrl.$modelValue, ''); // No symbol
  	        });

            elem.bind('blur', function() {
              if (ctrl.$invalid) return;
              var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
              elem.val($filter(attrs.format)(plainNumber, '')); // No symbol
            });
  	      }
        };

        function formatTelephone() {
          var listener = function() {
            var value = elem.val().replace(/[^0-9]/g, '');
            elem.val($filter('tel')(value, false));
          };

          // This runs when we update the text field
          ctrl.$parsers.push(function(viewValue) {
            return viewValue.replace(/[^0-9]/g, '').slice(0,10);
          });

          // This runs when the model gets updated on the scope directly and keeps our view in sync
          ctrl.$render = function() {
            elem.val($filter('tel')(ctrl.$viewValue, false));
          };

          elem.bind('change', listener);
          elem.bind('keydown', function(event) {
            var key = event.keyCode;
            // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
            // This lets us support copy and paste too
            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
              return;
            }
            //$browser.defer(listener); // Have to do this or changes don't get picked up properly
          });

          //elem.bind('paste cut', function() {
          //  $browser.defer(listener);
          //});
        };

      }
    };
	}])
	.directive('selectOnClick', ['$window', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        elem.on('click', function () {
          if (!$window.getSelection().toString()) {
            // Required for mobile Safari
            this.setSelectionRange(0, this.value.length)
          }
        });
      }
    };
	}])
	.directive('showErrors', [function($timeout) {
    return {
      restrict: 'A',
      require: '^form',
      link: function (scope, elem, attrs, ctrl) {
        // Find the text box element, which has the 'name' attribute
        var inputEl   = elem[0].querySelector("[name]");
        // Convert the native text box element to an angular element
        var inputNgEl = angular.element(inputEl);
        // Get the name on the text box
        var inputName = inputNgEl.attr('name');

        // Find an optional button added to the input field
        // If there is an associated button then decorate it as well
        var buttonEl  = elem[0].querySelector("[name] .input-group-btn button");
        var buttonNgEl = angular.element(buttonEl);
        
        // Only apply the has-error class after the user leaves the text box
        var blurred = false;
        inputNgEl.bind('blur', function() {
          blurred = true;
          elem.toggleClass('has-error', ctrl[inputName].$invalid);
          if (buttonNgEl) {
            buttonNgEl.toggleClass('btn-danger', ctrl[inputName].$invalid);
          }
        });
        
        scope.$watch(function() {
          return ctrl[inputName].$invalid
        }, function(invalid) {
          // We only want to toggle the has-error class after the blur event or if the control becomes valid
          if (!blurred && invalid) { return }
          elem.toggleClass('has-error', invalid);
          if (buttonNgEl) {
            buttonNgEl.toggleClass('btn-danger', invalid);
          }
        });
        
        scope.$on('show-errors-check-validity', function() {
          elem.toggleClass('has-error', ctrl[inputName].$invalid);
          if (buttonNgEl) {
            buttonNgEl.toggleClass('btn-danger', ctrl[inputName].$invalid);
          }
        });
        
        scope.$on('show-errors-reset', function() {
          $timeout(function() {
            elem.removeClass('has-error');
            if (buttonNgEl) {
              buttonNgEl.removeClass('btn-danger');
            }
          }, 0, false);
        });
      }
    }
  }]);
