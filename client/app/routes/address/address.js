'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allocation.address', {
        url: '/address/:address_id',
        template: '<address></address>'
      });
  });
