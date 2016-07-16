'use strict';

(function(){

class OverviewComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('appApp')
  .component('overview', {
    templateUrl: 'app/routes/overview/overview.html',
    controller: OverviewComponent,
    controllerAs: Overview
  });

})();
