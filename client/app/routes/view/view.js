'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view', {
        url: '/view/allocations/:id',
        template: '<view></view>'
      });
  });
