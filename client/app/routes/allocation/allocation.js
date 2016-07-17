'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allocation', {
        url: '/allocation',
        template: '<allocation></allocation>'
      });
  });
