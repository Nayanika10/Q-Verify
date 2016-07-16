'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('overview', {
        url: '/overview',
        template: '<overview></overview>'
      });
  });
