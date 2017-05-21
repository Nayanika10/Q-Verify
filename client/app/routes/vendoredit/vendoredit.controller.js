'use strict';
class VendoreditComponent {
  constructor($stateParams, toaster, $state, $http, Restangular, URLS, OAuthToken,$uibModal,$scope) {
    const LOG_TAG = 'VendoreditComponent';
    console.log(LOG_TAG, $stateParams.id);
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.Restangular = Restangular;
    this.URLS = URLS;
    this.$uibModal=$uibModal;
    this.$scope=$scope;
    this.AccessToken = OAuthToken.getAccessToken();

  }

  //$onInit() {
  //  this.$http.get(`/api/allocations/${this.$stateParams.id}`).then(({ data }) => (this.data = data))
  //}

  $onInit() {
    this.$http.get(`/api/candidate_cases/${this.$stateParams.id}`).then(({ data }) => {
      this.data = data;
      this.address_status = this.data.address_status.split(',');
    });
    this.undoIndex = false;
  }


  changeStatus(index,status){
    this.undoIndex = (this.undoIndex === index) ? false : index;
    this.address_status.splice(index, 1, status.toString())
    console.log('this.address_status', this.address_status)
    this
      .$http
      .put(`/api/candidate_cases/${this.$stateParams.id}/`, { address_status: this.address_status.join(',') })
      .then((data)=> {
        console.log("Request successful")
      })
      .catch((error)=> {
        console.log("Request failed")
      });
  }



  open = size => {
    //console.log(this.$stateParams.id)
  this.$uibModal.open({
    animation: this.$scope.animationsEnabled,
    templateUrl: 'app/directives/allocation/allocation.html',
    controller: 'AllocationController',
    controllerAs: 'ctrl',
    size,
    resolve: {
      candidateCaseIds: () => this.$stateParams.id.split(','),
      gridApi: () => this.$scope.gridApi,
    },
  });
};
}

angular.module('appApp')
  .component('vendoredit', {
    templateUrl: 'app/routes/vendoredit/vendoredit.html',
    controller: VendoreditComponent,
    controllerAs: '$ctrl',
  });

