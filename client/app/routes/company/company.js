'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company', {
        url: '/company',
        template: '<company></company>'
      });
  });
