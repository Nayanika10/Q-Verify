'use strict';

(function(){

class CompanyUsersComponent {
  constructor(Restangular, $stateParams, $scope, $state, OAuthToken) {
    this.Restangular = Restangular;
    this.$stateParams = $stateParams;
    this.fetchUsers();
    this.$scope = $scope;
    this.$state = $state;
    this.OAuthToken = OAuthToken;
    this.$onInit();
  }

  $onInit(){
    this.$scope.filterOptions = {
      filterText: ''
    };
    this.$scope.gridOpts={
      ienableRowSelection: true,
      enableSelectAll: true,
      enableFiltering: true,
      selectionRowHeaderWidth: 35,
      rowHeight: 35,
      showGridFooter: true,
      columnDefs:[
        {name: 'User', field: 'name'},
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
