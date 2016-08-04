'use strict';

(function () {

  function PartnerComponent($log, QverifyConnection) {
    const LOG_TAG = 'PartnerComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchAllocationByStatus(1).then((allocations)=> {
      vm.Allocation = allocations;
      console.log(vm.Allocation);
    });
    qverifyConnection.fetchAllocationByStatus(2).then((allocations)=> {
      vm.Allocated = allocations;
    })
  }

  angular.module('appApp')
    .component('partner', {
      templateUrl: 'app/routes/partner/partner.html',
      controller: PartnerComponent,
      controllerAs: 'Partner',
    });

})();
