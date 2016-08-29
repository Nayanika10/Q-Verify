'use strict';

angular.module('appApp', [
  'appApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'ngAnimate',
  //'angularMoment',
  'toaster',
  //'chart.js'
  "naif.base64",
  'ui.grid',
  'angular-oauth2'
])
  .config(function ($urlRouterProvider, $locationProvider, RestangularProvider, OAuthProvider, OAuthTokenProvider) {


    var URLS = {
      QVERIFY_API: 'http://app.qverify.dev/api',
      QVERIFY_SERVER: 'http://app.qverify.dev',
    };
    switch (window.location.host) {
      case 'app.qverify.com':
        URLS = {
          QVERIFY_API: 'http://app.qverify.com/api',
          QVERIFY_SERVER: 'http://app.qverify.com',
        };
        break;
      case 'staging-app.qverify.com':
        URLS = {
          QVERIFY_API: 'http://staging-app.qverify.com/api',
          QVERIFY_SERVER: 'http://staging-app.qverify.com',
        };
        break;
    }

    OAuthTokenProvider.configure({
      name: 'token',
      options: {
        secure: false,
        path: '/'
      }
    });

    OAuthProvider.configure({
      baseUrl: URLS.QVERIFY_SERVER,
      clientId: 'accounts',
      clientSecret: 'accountssecret', // optional
      grantPath: '/oauth/token',
    });

    RestangularProvider.setBaseUrl(URLS.QVERIFY_API);
    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(true);

  });
