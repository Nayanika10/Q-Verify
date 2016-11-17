'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('case', {
        url: '/case',
        template: '<case></case>'
      });
  });
