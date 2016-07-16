'use strict';

(function(){

class DashboardComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('appApp')
  .component('dashboard', {
    templateUrl: 'app/routes/dashboard/dashboard.html',
    controller: DashboardComponent,
    controllerAs: 'Dashboard',
  });

})();
