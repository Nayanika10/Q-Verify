'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ongoing', {
        url: '/ongoing',
        template: '<ongoing></ongoing>'
      });
  });
