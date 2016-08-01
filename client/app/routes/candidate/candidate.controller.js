'use strict';

(function () {
  function CandidateComponent($log, QverifyConnection, $stateParams, $state, Restangular) {
    const LOG_TAG = 'CandidateComponent';
    const vm = this;
    console.log(LOG_TAG, $stateParams.case_id);
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchCase($stateParams.case_id).then((caseObj)=> {
      vm.Case = caseObj;
    });

    vm.openCase = ()=> {
      switch (vm.Case.case_type_id) {
        case 1: // address
          $state.go("address", {case_id: $stateParams.case_id})
          break;
        case 2: // criminal
          $state.go("criminal", {case_id: $stateParams.case_id})
          break;
        case 3: // education
          $state.go("education", {case_id: $stateParams.case_id})
          break;
        case 4: // site
          $state.go("site", {case_id: $stateParams.case_id})
          break;
      }
    }

    vm.updateStatus = (status_id)=>{
      Restangular.one(`cases`, $stateParams.case_id).put({status_id:status_id})
        .then((data)=> {
          console.log("Request successful")
        })
        .catch((error)=> {
          console.log("Request failed")
        });
    }
  }

  angular.module('appApp')
    .component('candidate', {
      templateUrl: 'app/routes/candidate/candidate.html',
      controller: CandidateComponent,
      controllerAs: 'Candidate',
    });

})();
