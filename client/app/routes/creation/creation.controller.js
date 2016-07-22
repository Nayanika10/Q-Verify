'use strict';

(function () {

  function CreationComponent($log, QverifyConnection,toaster) {
    const LOG_TAG = 'CreationComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchClient().then((clients)=> {
      vm.Client = clients;
    });
    qverifyConnection.fetchCaseTypes().then((case_types)=> {
      vm.CaseTypes = case_types;
    });
    qverifyConnection.fetchDegree().then((degrees)=> {
      vm.Degree = degrees;
    });
    vm.create = function () {
      qverifyConnection.createCase(vm.case);
      toaster.pop('success', "Case Created")
    };
  }

  angular.module('appApp')
    .component('creation', {
      templateUrl: 'app/routes/creation/creation.html',
      controller: CreationComponent,
      controllerAs: 'Creation',
    });

})();
