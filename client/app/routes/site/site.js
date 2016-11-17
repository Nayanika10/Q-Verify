'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allocation.site', {
        url: '/site/:site_id',
        template: '<site></site>'
      });
  });
