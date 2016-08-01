'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view', {
        url: '/view/:case_id',
        template: '<view></view>'
      });
  });
