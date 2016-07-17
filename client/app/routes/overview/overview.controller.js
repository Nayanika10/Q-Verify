'use strict';

(function () {
  function OverviewComponent($log, QverifyConnection) {
    const LOG_TAG = 'OverviewComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchClient().then((clients)=> {
      vm.Client = clients;
    });
    qverifyConnection.fetchCaseTypes().then((case_types)=> {
      vm.CaseTypes = case_types;
    });
    qverifyConnection.fetchCaseTypes().then((vendors)=> {
      vm.Vendors = vendors;
    });
    qverifyConnection.fetchCaseTypes().then((status)=> {
      vm.Status = status;
    });
  }

  angular.module('appApp')
    .component('overview', {
      templateUrl: 'app/routes/overview/overview.html',
      controller: OverviewComponent,
      controllerAs: 'Overview',
    });

})();
