'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('candidate', {
        url: '/candidate',
        template: '<candidate></candidate>'
      });
  });
