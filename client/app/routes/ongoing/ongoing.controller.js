'use strict';

(function(){

  function OngoingComponent($log, QverifyConnection,OAuthToken,$state) {
    const LOG_TAG = 'OngoingComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchAllocationByStatus(2).then((allocations)=> {
      vm.Allocated = allocations;
    });
    qverifyConnection.fetchAllocationByStatus(3).then((allocations)=> {
      vm.Allocation = allocations;
    });
    vm.logout =  function() {
      OAuthToken.removeToken();
      $state.go('login');
    }


  }

angular.module('appApp')
  .component('ongoing', {
    templateUrl: 'app/routes/ongoing/ongoing.html',
    controller: OngoingComponent,
    controllerAs: 'Ongoing',
  });

})();
