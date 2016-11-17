'use strict';

angular.module('appApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'app/directives/sidebar/sidebar.html',
      restrict: 'EA',
      controller: function(OAuthToken, $state){
        this.logout =  function() {
          OAuthToken.removeToken();
          return $state.go('login');
        }
      },
      controllerAs: '$ctrl',
      link: function (scope, element, attrs) {
      }
    };
  });
