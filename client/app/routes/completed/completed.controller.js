'use strict';

class CompletedComponent {
  constructor($http,  $stateParams, $state,OAuthToken) {
    const LOG_TAG = 'CompletedComponent';
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.OAuthToken = OAuthToken;
  }

  $onInit(internal_status_id) {
    this.data = {};
    this
      .$http
      .get(`/api/allocations?internal_status_id=6`)
      .then(({ data }) => (this.data = data));


    this.logout =  function() {
      OAuthToken.removeToken();
      $state.go('login');
    }
  }


//(function () {
//
//  function CompletedComponent($log, QverifyConnection,OAuthToken,$state) {
//    const LOG_TAG = 'CompletedComponent';
//    const vm = this;
//    let qverifyConnection = new QverifyConnection();
//    qverifyConnection.fetchAllocationByStatus(6).then((allocations)=> {
//      vm.Allocated = allocations;
//    });
//    vm.logout =  function() {
//      OAuthToken.removeToken();
//      $state.go('login');
//    }
//  $onInit(status) {
//    this
//      .$http
//      .get(`/api/allocations/${this.data.Allocations.id}?status=6`)
//      .then(({ data }) => {
//        this.Allocations = data;
//      })


  }


angular.module('appApp')
  .component('completed', {
    templateUrl: 'app/routes/completed/completed.html',
    controller: CompletedComponent,
    controllerAs: 'Completed',
  });
//}());

