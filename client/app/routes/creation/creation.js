'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creation', {
        url: '/creation',
        template: '<creation></creation>'
      });
  });
