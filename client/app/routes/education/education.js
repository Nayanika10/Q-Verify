'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('education', {
        url: '/case/:case_id/education',
        template: '<education></education>'
      });
  });
