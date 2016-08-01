'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partner', {
        url: '/partner',
        template: '<partner></partner>'
      });
  });
