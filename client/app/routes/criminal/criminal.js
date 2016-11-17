'use strict';

angular.module('appApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allocation.criminal', {
        url: '/criminal/:criminal_id',
        template: '<criminal></criminal>'
      });
  });
