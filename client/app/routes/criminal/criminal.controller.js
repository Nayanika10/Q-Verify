'use strict';

(function(){

  function CriminalComponent($log, $stateParams, QverifyConnection,toaster) {
    const LOG_TAG = 'CriminalComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchDesignation().then((designations)=> {
      vm.Designation = designations;
    });
    qverifyConnection.fetchStatus().then((status)=> {
      vm.Status = status;
    });
    vm.createCriminal = function () {
      vm.criminal.case_id = $stateParams.case_id;
      console.log(vm.criminal.dob);
      qverifyConnection.createCriminal(vm.criminal);
      //toaster.pop('success', "Criminal Created")
    };
}

angular.module('appApp')
  .component('criminal', {
    templateUrl: 'app/routes/criminal/criminal.html',
    controller: CriminalComponent,
    controllerAs: 'Criminal',
  });

})();
