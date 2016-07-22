'use strict';
(function () {

  function AllocationComponent(QverifyConnection, toaster) {
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchVendor().then((vendors)=> {
      vm.Vendor = vendors;
    });
    qverifyConnection.fetchCases().then((cases)=> {
      vm.Case = cases;
    });

    vm.create = ()=>{
      console.log(vm.allocation);
      qverifyConnection.createAllocation(vm.allocation).then((allocation)=>{});
      toaster.pop('success', "Allocated")
    }
  }

  angular.module('appApp')
    .component('allocation', {
      templateUrl: 'app/routes/allocation/allocation.html',
      controller: AllocationComponent,
      controllerAs: 'Allocation'
    });

})();
