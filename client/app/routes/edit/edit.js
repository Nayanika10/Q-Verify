'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/candidates/:id/edit',
        template: '<edit></edit>'
      });
  });
