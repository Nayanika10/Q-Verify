'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('candidate', {
        url: '/candidates/:id',
        template: '<candidate></candidate>'
      });
  });
