'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('education', {
        url: '/education',
        template: '<education></education>'
      });
  });
