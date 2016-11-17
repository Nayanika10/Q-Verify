'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('completed', {
        url: '/completed',
        template: '<completed></completed>'
      });
  });
