'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('site', {
        url: '/case/:case_id/site',
        template: '<site></site>'
      });
  });
