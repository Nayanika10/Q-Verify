'use strict';

angular.module('appApp')
  .factory('URLS', function () {
    var vars = {
      QVERIFY_API: 'http://app.qverify.dev/api',
      QVERIFY_SERVER: 'http://app.qverify.dev',
    };
    switch(window.location.host){
      case "app.qverify.com":
        vars = {
          QVERIFY_API: 'http://app.qverify.com/api',
          QVERIFY_SERVER: 'http://app.qverify.com',
        };
        break;
      case 'staging-app.qverify.com':
        vars = {
          QVERIFY_API: 'http://staging-app.qverify.com/api',
          QVERIFY_SERVER: 'http://staging-app.qverify.com'
        };
        break;
    }
    return vars;
  });


