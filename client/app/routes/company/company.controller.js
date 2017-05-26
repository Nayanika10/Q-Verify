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
      ienableRowSelection: true,
      enableSelectAll: true,
      enableFiltering: true,
      selectionRowHeaderWidth: 35,
      rowHeight: 35,
      showGridFooter: true,
    };
    $scope.gridOpts.columnDefs = [
        {
          name: 'ID', field: 'id',
          width: '50', pinnedLeft: true,  enableFiltering: false,
          cellTemplate: '<div class="ui-grid-cell-contents">'
          + '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/companyUsers/{{ COL_FIELD }} ">{{ COL_FIELD }}</a>' + '</div>'
        },
        {name: 'Company', field: 'name', cellTemplate: '<div class="ui-grid-cell-contents">'
        + '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/companyUsers/{{ row.entity.id }} ">{{ COL_FIELD }}</a>' + '</div>'
        },

        {name: 'User-Type', field: 'UserType.name' ,cellTemplate: '<div class="ui-grid-cell-contents">'
        + '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/companyUsers/{{ row.entity.id }} ">{{ COL_FIELD }}</a>' + '</div>'},

        {name: 'Address', field: 'address', cellTemplate: '<div class="ui-grid-cell-contents">'
        + '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/companyUsers/{{ row.entity.id }} ">{{ COL_FIELD }}</a>' + '</div>'},

        {name: 'Created on', field:'created_on', type: 'date', cellFilter: 'date:"dd-MMM-yyyy "'}

      ]




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

