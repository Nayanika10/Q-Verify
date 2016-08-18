'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newcompany', {
        url: '/newcompany',
        template: '<newcompany></newcompany>'
      });
  });
