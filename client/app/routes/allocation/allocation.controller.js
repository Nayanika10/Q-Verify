'use strict';
(function () {

  class AllocationComponent{
    constructor(QverifyConnection, toaster,$state, $http) {
      const LOG_TAG = 'AllocationComponent';
      this.qverifyConnection = new QverifyConnection();
      this.$http = $http;
    }

    $onInit() {
      //this.qverifyConnection.fetchVendor().then((vendors)=> {
      //  this.Vendor = vendors;
      //});
      this.getVendors();
      this.$http
        .get('/api/clients')
        .then(({ data: clients}) => (this.Client = clients))
    }

    getCandidates() {
      this.$http.get(`/api/clients/${this.allocation.client_id}/candidates`)
        .then(({data})=> {
          this.Candidate = data;
        });

    }

    getCandidateCase() {
      this.$http.get(`/api/candidates/${this.allocation.candidate_id}/caseTypes`)
      .then(({data}) => {
        this.CaseTypes = data;
      })
    }

    getCandidateMaps(){
      this.$http.get(`/api/candidateMaps/${this.allocation.candidate_map_id}/allocations`)
      .then(({data})=>{
        this.Allocations = data;
      })
    }

    getUsers(vendorId) {
      this.$http.get(`/api/vendors/${vendorId}/users`)
        .then(({data:users})=> {
          this.users = users
        });
    }


    create() {
      switch (this.allocation.caseType.case_type_id) {
        case 1:{
          this.allocation.case_address_verification_id = this.allocation.caseType.id;
          break;
        }
        case 2:{
          this.allocation.case_criminal_verification_id = this.allocation.caseType.id;
          break;
        }
        case 3:{
          this.allocation.case_education_verification_id = this.allocation.caseType.id;
          break;
        }
        case 4:{
          this.allocation.case_site_verification_id = this.allocation.caseType.id;
          break;
        }
      }
      this.$http.post('/api/allocations', this.allocation).then(() => this.$state.go("overview"))
        .then(res => this.toaster.pop('success', "Allocated"))

    }

    getVendors(){
      this.$http.get('/api/vendors').then(({data:vendors})=> {
        this.Vendor = vendors;
      });
    }
  }


  angular.module('appApp')
    .component('allocation', {
      templateUrl: 'app/routes/allocation/allocation.html',
      controller: AllocationComponent,
      controllerAs: 'ctrl'
    });

})();
