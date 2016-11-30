'use strict';

(function () {

  class CreationComponent {
    constructor($log, QverifyConnection, toaster, $state, $scope, $http) {
      const LOG_TAG = 'CreationComponent';
      this.qverifyConnection = new QverifyConnection();
      this.$http = $http;
      this.CaseTypes = [];
    }

    $onInit() {
      this.checkbox = {
        address: true,
        site: false,
        education: false,
        criminal: false,
      }
      this.getClients();
    }

    getUsers(clientId) {
      this.$http.get(`/api/clients/${clientId}/users`)
        .then(({data:users})=> {
          this.users = users
        });

    }

    create() {
      if (!this.candidate)return;
      this.candidate.types = [];
      if(this.checkbox.address){
        this.candidate.types.push(1);
      }
      if(this.checkbox.criminal){
        this.candidate.types.push(2);
      }
      if(this.checkbox.education){
        this.candidate.types.push(3);
      }
      if(this.checkbox.site){
        this.candidate.types.push(4);
      }
      this.$http.post('/api/candidates', this.candidate)
        .then(() => this.$state.go("overview"))
        .then(res => this.toaster.pop('success', "Candidate Created"))
        .catch(err => this.toaster.pop('error', err.data ? err.data.message : 'Unexpected Error'));

    }

    getClients() {
      this.$http.get('/api/clients').then(({data:clients})=> {
        this.clients = clients;
      });
    }
  }


  angular.module('appApp')
    .component('creation', {
      templateUrl: 'app/routes/creation/creation.html',
      controller: CreationComponent,
      controllerAs: 'ctrl'
    });

})();
