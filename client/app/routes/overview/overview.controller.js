'use strict';

(function () {
  function OverviewComponent($log, QverifyConnection) {
    const LOG_TAG = 'OverviewComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchAllocation().then((allocations)=> {
      vm.Allocation = allocations;
    });
    qverifyConnection.fetchCases().then((cases)=> {
      vm.Case = cases;
    });
    qverifyConnection.fetchVendor().then((vendor_user_types)=> {
      vm.Vendor = vendor_user_types;
    });
    qverifyConnection.fetchClient().then((clients_user_types)=> {
      vm.Client = clients_user_types;
    });

  }

  angular.module('appApp')
    .component('overview', {
      templateUrl: 'app/routes/overview/overview.html',
      controller: OverviewComponent,
      controllerAs: 'Overview',
    });

})();
