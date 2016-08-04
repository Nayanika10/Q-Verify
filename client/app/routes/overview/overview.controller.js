'use strict';

(function () {
  function OverviewComponent($log, QverifyConnection) {
    const LOG_TAG = 'OverviewComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchAllocation().then((allocations)=> {
      vm.Allocation = allocations;
    });

  }

  angular.module('appApp')
    .component('overview', {
      templateUrl: 'app/routes/overview/overview.html',
      controller: OverviewComponent,
      controllerAs: 'Overview',
    });

})();
