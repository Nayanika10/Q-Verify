'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('companyUsers', {
        url: '/companyUsers/:id',
        template: '<company-users></company-users>'
      });
  });
