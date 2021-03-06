'use strict';
class AllocationViewComponent {
  constructor($stateParams, toaster, $state, $http, Restangular, URLS,OAuthToken) {
    const LOG_TAG = 'AllocationViewComponent';
    console.log(LOG_TAG, $stateParams.id);
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.Restangular = Restangular;
    this.URLS = URLS;
    this.AccessToken = OAuthToken.getAccessToken();

  }

  $onInit() {
    this.$http.get(`/api/allocations/${this.$stateParams.id}`).then(({ data }) => (this.data = data))
  }

  openCase() {
      if (this.data.CandidateCase.case_type_id == 1) {
        this.$state.go("allocation.address", {
          candidate_id: this.$stateParams.candidate_id,
          address_id: this.data.CandidateCase.CaseAddressVerification.id
         });
      }

      if (this.data.CandidateCase.case_type_id == 2) {
        this.$state.go("allocation.criminal", {
          candidate_id: this.$stateParams.candidate_id,
          criminal_id: this.data.CandidateCase.CaseCriminalVerification.id
        });
      }

      if (this.data.CandidateCase.case_type_id == 3) {
        this.$state.go("allocation.education", {
          candidate_id: this.$stateParams.candidate_id,
          education_id: this.data.CandidateCase.CaseEducationVerification.id
        });
      }

      if (this.data.CandidateCase.case_type_id == 4) {
        this.$state.go("allocation.site", {
          candidate_id: this.$stateParams.candidate_id,
          site_id: this.data.CandidateCase.CaseSiteVerification.id
        });
      }

  }
  updateStatus(status_id){
    console.log(this.data)
    this
      .$http
      .put(`/api/allocations/${this.$stateParams.id}`, { status_id: status_id})
      .then((data)=> {
              console.log("Request successful")
              location.reload();
            })
            .catch((error)=> {
              console.log("Request failed")
            });
  }
  //updateStatus(status_id) {
  //    this.Restangular.one(`candidates`,this.$stateParams.candidate_id).put({status_id: status_id})
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
  .component('allocationView', {
  templateUrl: 'app/routes/allocation/view/view.html',
  controller: AllocationViewComponent,
  controllerAs: '$ctrl'
});

