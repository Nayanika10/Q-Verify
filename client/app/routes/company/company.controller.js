'use strict';
(function () {

  function CompanyComponent($log, QverifyConnection,$scope,$stateParams,$state, URLS) {
    const LOG_TAG = 'CompanyComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    $scope.filterOptions = {
      filterText: ''
    };
    $scope.gridOpts={
      //data:myData,

      enableFiltering: true,
      columnDefs:[
        {
          name: 'ID', field: 'id',
          width: '50', pinnedLeft: true,  enableFiltering: false,
          cellTemplate: '<div class="ui-grid-cell-contents">'
          + '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/companyUsers/{{ COL_FIELD }} ">{{ COL_FIELD }}</a>' + '</div>'
        },
        {name: 'Company', field: 'name'},
        {name: 'Address', field: 'address'},
        {name: 'Created on', field:'created_on', type: 'date', cellFilter: 'date:"dd-MM-yy "'}

      ]

    };


    qverifyConnection.fetchCompany().then((companys)=> {
      $scope.myData = companys;
      $scope.gridOpts.data = companys;
    });


    vm.openNewCompany = (company_id)=>{
      $state.go("newcompany", {company_id: $stateParams.company_id})
    }


  }


  angular.module('appApp')
    .component('company', {
      templateUrl: 'app/routes/company/company.html',
      controller: CompanyComponent,
      controllerAs: 'Company',
    });

})();

