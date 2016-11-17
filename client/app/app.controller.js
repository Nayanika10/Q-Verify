/**
 * Created by sif on 8/31/2016.
 */
'use strict';



class AppCtrl {
  constructor(OAuth, OAuthToken, $state, $rootScope) {
    this.OAuth = OAuth;
    this.OAuthToken = OAuthToken;
    this.$state = $state;

  }

}

angular.module('appApp').controller('AppCtrl', AppCtrl)


