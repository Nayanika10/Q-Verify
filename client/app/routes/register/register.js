'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register?cid',
        template: '<register></register>'
      });
  });
