'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('candidate', {
        url: '/candidate/:case_id',
        template: '<candidate></candidate>'
      });
  });
