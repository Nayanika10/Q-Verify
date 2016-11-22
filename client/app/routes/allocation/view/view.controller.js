'use strict';
class AllocationViewComponent {
  constructor($stateParams, toaster, $state, $http, Restangular) {
    const LOG_TAG = 'AllocationViewComponent';
    console.log(LOG_TAG, $stateParams.id);
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.Restangular = Restangular;

  }

  $onInit() {
    this.$http.get(`/api/allocations/${this.$stateParams.id}`).then(({ data }) => (this.data = data))
  }

  openCase() {
      if (this.data.CandidateMap.case_address_verification_id) {
        this.$state.go("allocation.address", {
          candidate_id: this.$stateParams.candidate_id,
          address_id: this.data.CandidateMap.case_address_verification_id
         });
      }

      if (this.data.CandidateMap.case_criminal_verification_id) {
        this.$state.go("allocation.criminal", {
          candidate_id: this.$stateParams.candidate_id,
          criminal_id: this.data.CandidateMap.case_criminal_verification_id
        });
      }

      if (this.data.CandidateMap.case_education_verification_id) {
        this.$state.go("allocation.education", {
          candidate_id: this.$stateParams.candidate_id,
          education_id: this.data.CandidateMap.case_education_verification_id
        });
      }

      if (this.data.CandidateMap.case_site_verification_id) {
        this.$state.go("allocation.site", {
          candidate_id: this.$stateParams.candidate_id,
          site_id: this.data.CandidateMap.case_site_verification_id
        });
      }

  }
  updateStatus(status_id){
    console.log(this.data)
    this
      .$http
      .put(`/api/allocations/${this.$stateParams.id}`, { status_id: status_id})
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

