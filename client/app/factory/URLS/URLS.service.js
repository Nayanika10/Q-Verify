'use strict';

angular.module('appApp')
  .factory('URLS', function () {
    var vars = {
      QVERIFY_API: 'http://qverify.quezx.dev/api',
      QVERIFY_SERVER: 'http://qverify.quezx.dev',
    };
    switch(window.location.host){
      case "qverify.quezx.com":
        vars = {
          QVERIFY_API: 'https://qverify.quezx.com/api',
          QVERIFY_SERVER: 'https://qverify.quezx.com',
        };
        break;
      case 'staging-qverify.quezx.com':
        vars = {
          QVERIFY_API: 'https://staging-qverify.quezx.com/api',
          QVERIFY_SERVER: 'https://staging-qverify.quezx.com'
        };
        break;
    }
    return vars;
  });


