'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allocations', {
        url: '/allocations',
        template: '<div ui-view=""></div>',
        abstract: true,
      })
      .state('allocations.list', {
        url: '',
        template: '<allocation></allocation>'
      })
      .state('allocation', {
        url: '/allocations/:id',
        template: '<div ui-view=""></div>',
        abstract: true,
      })
      .state('allocation.view', {
        url: '',
        template: '<allocation-view></allocation-view>'
      });
  });
