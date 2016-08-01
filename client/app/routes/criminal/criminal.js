'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('criminal', {
        url: '/case/:case_id/criminal',
        template: '<criminal></criminal>'
      });
  });
