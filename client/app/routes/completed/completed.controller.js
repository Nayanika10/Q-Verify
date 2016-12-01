'use strict';


(function () {

  function CompletedComponent($log, QverifyConnection,OAuthToken,$state) {
    const LOG_TAG = 'CompletedComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchAllocationByInternalStatus(6).then((allocations)=> {
      vm.Allocated = allocations;
    });
    vm.logout =  function() {
      OAuthToken.removeToken();
      $state.go('login');
    }


  }


angular.module('appApp')
  .component('completed', {
    templateUrl: 'app/routes/completed/completed.html',
    controller: CompletedComponent,
    controllerAs: 'Completed'
  });

})();
