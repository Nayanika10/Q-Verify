'use strict';

(function () {

  function PartnerComponent($log, QverifyConnection) {
    const LOG_TAG = 'PartnerComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchCases().then((cases)=> {
      vm.Allocation = cases;
      console.log(vm.Allocation);
    });
    qverifyConnection.fetchVendorUploadedCases().then((cases)=> {
      vm.Allocated = cases;
    })
  }

  angular.module('appApp')
    .component('partner', {
      templateUrl: 'app/routes/partner/partner.html',
      controller: PartnerComponent,
      controllerAs: 'Partner',
    });

})();
