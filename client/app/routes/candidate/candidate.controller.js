'use strict';

(function () {
  function CandidateComponent($log, QverifyConnection, $stateParams, $state, Restangular, URLS, OAuthToken) {
    const LOG_TAG = 'CandidateComponent';
    const vm = this;
    vm.URLS = URLS;
    vm.AccessToken = OAuthToken.getAccessToken();
    console.log(LOG_TAG, $stateParams.id);
    let qverifyConnection = new QverifyConnection();
    vm.id = $stateParams.id;
    console.log($stateParams.id)
    qverifyConnection.fetchCandidate($stateParams.id).then((candidateObj)=> {
      vm.Candidates = candidateObj;
    });
    //qverifyConnection.fetchCandidate($stateParams.candidate_id).then((candidateObj)=> {
    //  vm.Candidate = candidateObj;
    //});
    qverifyConnection.fetchAllocationByStatus(1).then((allocations)=> {
      vm.Allocated = allocations;
    });
    //qverifyConnection.fetchCandidateCase.then((candidateCase)=> {
    //  vm.CandidateCase = candidateCases;
    //});


  }

  angular.module('appApp')
    .component('candidate', {
      templateUrl: 'app/routes/candidate/candidate.html',
      controller: CandidateComponent,
      controllerAs: 'ctrl',
    });

})();
