'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vendoredit', {
        url: '/candidateCases/:id/vendoredit',
        template: '<vendoredit></vendoredit>'
      });
  });
