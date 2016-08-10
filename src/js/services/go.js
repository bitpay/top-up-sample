'use strict';

angular.module('topUpApp.services').factory('go', function($rootScope, $state, lodash) {
  var root = {};

  // Navigation steps
  root.steps = {
    start: {
      num: 0,
      label: 'Start',
      visited: true
    },
    from: {
      num: 1,
      label: 'From',
      visited: false
    },
    to: {
      num: 2,
      label: 'To',
      visited: false
    },
    amount: {
      num: 3,
      label: 'Amount',
      visited: false
    },
    pay: {
      num: 4,
      label: 'Pay',
      visited: false
    },
    finished: {
      num: 5,
      label: 'Finished',
      visited: false
    },
  };

  root.resetNavigation = function() {
    for (var key in root.steps) {
      if (root.steps.hasOwnProperty(key)) {
        root.steps[key].visited = false;
      }
    }
    root.getStep(0).visited = true;
  };

  root.visited = function(step) {
    if (!root.steps[step]) return true; // Allow navigation to views that are not steps
    return root.steps[step].visited;
  };

  // Return step object for specified step number.
  root.getStep = function(num) {
    return lodash.find(root.steps, function(s) {
      return s.num == num;
    });
  };

  // Return the first step name.
  root.firstStep = function() {
    root.getStep(1).visited = true;
    return root.path(Object.keys(root.steps)[1]);
  };

  // True if the step name is the start step.
  root.isStartStep = function(step) {
    return Object.keys(root.steps)[0] == step;
  };

  // Return the next step name.
  root.nextStep = function(step) {
    var x = $state;
    if (!root.steps[step]) return; // Ignore unrecognized steps
    var num = root.steps[step].num;
    num = num + 1;
    root.getStep(num).visited = true;
    return root.path(Object.keys(root.steps)[num]);
  };

  // Return the previous step name.
  root.previousStep = function(step) {
    if (!root.steps[step]) return; // Ignore unrecognized steps
    var num = root.steps[step].num;
    num = num - 1;
    return root.path(Object.keys(root.steps)[num]);
  };

  root.path = function(path, cb) {
    $state.transitionTo(path)
      .then(function() {
        if (cb) return cb();
      });
  };

  return root;
});
