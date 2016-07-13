'use strict';

angular.module('appApp', [
  'appApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'restangular'
])
  .config(function($urlRouterProvider, $locationProvider,RestangularProvider) {



    var URLS = {
      QVERIFY_API: 'http://qverify.quezx.dev/api',
      QVERIFY_SERVER: 'http://qverify.quezx.dev',
    };
    switch (window.location.host) {
      case 'qverify.quezx.com':
        URLS = {
          QVERIFY_API: 'https://qverify.quezx.com/api',
          QVERIFY_SERVER: 'https://qverify.quezx.com',
        };
        break;
      case 'staging-qverify.quezx.com':
        URLS = {
          QVERIFY_API: 'https://staging-qverify.quezx.com/api',
          QVERIFY_SERVER: 'https://staging-qverify.quezx.com',
        };
        break;
    }
    RestangularProvider.setBaseUrl(URLS.QVERIFY_API);
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

  });
