'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('address', {
        url: '/case/:case_id/address',
        template: '<address></address>'
      });
  });
