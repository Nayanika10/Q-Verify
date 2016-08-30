'use strict';

(function(){

  function AddressComponent($log, QverifyConnection,toaster ,$stateParams, $state) {
    const LOG_TAG = 'AddressComponent';
    const vm = this;
    vm.address = {};
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchHouseType().then((house_types)=> {
      vm.HouseType = house_types;
    });
    vm.createAddress = function () {
      vm.address.case_id = $stateParams.case_id;
      qverifyConnection.createAddress(vm.address)
      $state.go("completed")
        //.then(res=> toaster.pop('success', "Address Created"))
        //.catch(err => toaster.pop('error', err.data ? err.data.message : 'Unexpected Error'));
    };

}

angular.module('appApp')
  .component('address', {
    templateUrl: 'app/routes/address/address.html',
    controller: AddressComponent,
    controllerAs: 'Address',
  });

})();
