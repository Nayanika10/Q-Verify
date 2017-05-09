class AllocationController{
  constructor(QverifyConnection, toaster,$state, $http,gridApi,candidateCaseIds,$uibModalInstance) {
    const LOG_TAG = 'AllocationComponent';
    this.qverifyConnection = new QverifyConnection();
    this.$http = $http;
    this.gridApi = gridApi;
    this.$uibModalInstance = $uibModalInstance;
    this.toaster =toaster;
    this.$state =$state;
    this.candidateCasesIds =candidateCaseIds;
    this.$onInit();
  }

  $onInit() {
    this.getVendors();
    this.$http
      .get('/api/clients')
      .then(({ data: clients}) => (this.Client = clients))
  }

  //getCandidates() {
  //  this.$http.get(`/api/clients/${this.allocation.client_id}/candidates`)
  //    .then(({data})=> {
  //      this.Candidate = data;
  //    });
  //
  //}

  getCandidateCase() {
    this.$http.get(`/api/candidates/${this.allocation.candidate_id}/caseTypes`)
      .then(({data}) => {
        this.CaseTypes = data;
      })
  }

  getCandidateCases(){
    this.$http.get(`/api/candidateCases/${this.allocation.candidate_case_id}/allocations`)
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
    //switch (this.allocation.caseType.candidate_case_id) {
    //  case 1:{
    //    this.allocation.case_address_verification_id = this.allocation.caseType.id;
    //    break;
    //  }
    //  case 2:{
    //    this.allocation.case_criminal_verification_id = this.allocation.caseType.id;
    //    break;
    //  }
    //  case 3:{
    //    this.allocation.case_education_verification_id = this.allocation.caseType.id;
    //    break;
    //  }
    //  case 4:{
    //    this.allocation.case_site_verification_id = this.allocation.caseType.id;
    //    break;
    //  }
    //}
    const x = this.allocation;
    const candidateCasesIds = this.candidateCasesIds;
    const data = [];
    candidateCasesIds.forEach( caseId => {
      data
        .push({
          candidate_case_id: caseId,
          vendor_id: x.vendor_id,
          user_id: x.user_id,
        })
    });
    this.$http.post('/api/allocations',data).then(() => this.$state.go("overview"))
    this.gridApi.grid.selection.selectAll = false;
    this.gridApi.grid.rows.map((k ,v) => {if(k.isSelected === true){k.isSelected=false}})
    this.$uibModalInstance.close();

  }
  cancel() {
    this.$uibModalInstance.close()
  }

  getVendors(){
    this.$http.get('/api/vendors').then(({data:vendors})=> {
      this.Vendor = vendors;
    });
  }
}

angular.module('appApp').controller('AllocationController', AllocationController);

