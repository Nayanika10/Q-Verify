'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allocation.education', {
        url: '/education/:education_id',
        template: '<education></education>'
      });
  });
