'use strict';

(function () {
  function CandidateComponent($log, QverifyConnection, $stateParams, $state, Restangular, URLS, OAuthToken) {
    const LOG_TAG = 'CandidateComponent';
    const vm = this;
    vm.URLS = URLS;
    vm.AccessToken = OAuthToken.getAccessToken();
    console.log(LOG_TAG, $stateParams.candidate_id);
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchCandidate($stateParams.candidate_id).then((candidateObj)=> {
      vm.Candidate = candidateObj;
    });



    //vm.openCase = ()=> {
    //  if (vm.Candidate.case_criminal_verification_id) {
    //    $state.go("address", {
    //      candidate_id: $stateParams.candidate_id,
    //      case_address_verification_id: vm.Candidate.case_address_verification_id
    //    });
    //  }
    //  if (vm.Candidate.case_criminal_verification_id) {
    //    $state.go("criminal", {
    //      candidate_id: $stateParams.candidate_id,
    //      case_criminal_verification_id: vm.Candidate.case_criminal_verification_id
    //    });
    //  }
    //  if (vm.Candidate.case_education_verification_id) {
    //    $state.go("education", {
    //      candidate_id: $stateParams.candidate_id,
    //      case_education_verification_id: vm.Candidate.case_education_verification_id
    //    });
    //  }
    //  if (vm.Candidate.case_site_verification_id) {
    //    $state.go("site", {
    //      candidate_id: $stateParams.candidate_id,
    //      case_site_verification_id: vm.Candidate.case_site_verification_id
    //  });
    //  }
      //switch (vm.case_type_id) {
      //  case 1: // address
      //    $state.go("address", {candidate_id: $stateParams.candidate_id, case_address_verification_id: vm.Candidate.case_address_verification_id})
      //    break;
      //  case 2: // criminal
      //    break;
      //  case 3: // education
      //    $state.go("education", {candidate_id: $stateParams.candidate_map_id})
      //    break;
      //  case 4: // site
      //    $state.go("site", {candidate_id: $stateParams.candidate_map_id})
      //    break;
      //}
    //}

    //vm.updateStatus = (status_id)=>{
    //  Restangular.one(`candidates`, $stateParams.candidate_id).put({status_id:status_id})
    //    .then((data)=> {
    //      console.log("Request successful")
    //      location.reload();
    //    })
    //    .catch((error)=> {
    //      console.log("Request failed")
    //    });
    //}
  }

  angular.module('appApp')
    .component('candidate', {
      templateUrl: 'app/routes/candidate/candidate.html',
      controller: CandidateComponent,
      controllerAs: 'Candidate',
    });

})();
