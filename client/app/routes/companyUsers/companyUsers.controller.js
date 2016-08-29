'use strict';

(function(){

class CompanyUsersComponent {
  constructor(Restangular, $stateParams, $scope, $state) {
    this.Restangular = Restangular;
    this.$stateParams = $stateParams;
    this.fetchUsers();
    this.$scope = $scope;
    this.$state = $state;
    this.$onInit();
  }

  $onInit(){
    this.$scope.filterOptions = {
      filterText: ''
    };
    this.$scope.gridOpts={
      //data:myData,

      enableFiltering: true,
      columnDefs:[
        {name: 'User', field: 'username'},
      ]
    };
  }

  openRegister() {
    this.$state.go("register", { cid: this.$stateParams.id })
  }

  fetchUsers(){
    this.Restangular.one(`companys/${this.$stateParams.id}/users`).getList()
      .then((users)=> {
        this.$scope.myData = users;
        this.$scope.gridOpts.data = users;
      })
      .catch((error)=> {
        console.log("Request failed")
      });
  }
}

angular.module('appApp')
  .component('companyUsers', {
    templateUrl: 'app/routes/companyUsers/companyUsers.html',
    controller: CompanyUsersComponent,
    controllerAs: 'CompanyUsers',
  });

})();
