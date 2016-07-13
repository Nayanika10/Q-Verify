'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        template: '<register></register>'
      });
  });
