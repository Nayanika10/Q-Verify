'use strict';

(function () {
  function CaseComponent($log, QverifyConnection,$scope,Restangular,URLS) {
    const LOG_TAG = 'CaseComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    $scope.filterOptions = {
      filterText: ''
    };
    $scope.gridOpts = {
      //data:myData,
      enableFiltering: true,
      columnDefs: [
        //{name: 'Id', field: 'Case.id'},
        {name: 'Client', field: 'Candidate.User.Company.name'},
        {name: 'Hiring Manager', field: 'Candidate.User.name'} ,
        {name: 'Vendor', field: 'Allocations.User.name'},
        {name: 'Candidate', field: 'Candidate.name' , cellTemplate: '<div class="ui-grid-cell-contents">'
        + '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/view/{{ row.entity.id }} ">{{ COL_FIELD }} </a>' + '</div>'},

        {name: 'Case Type', field: 'Candidate', cellTemplate: '<div class="ui-grid-cell-contents">'
        + '<a target="_blank"" ng-if="row.entity.case_address_verification_id">Address</a>'
        + '<a target="_blank"" ng-if="row.entity.case_criminal_verification_id">Criminal</a>'
        + '<a target="_blank"" ng-if="row.entity.case_site_verification_id">Site</a>'
        + '<a target="_blank"" ng-if="row.entity.case_education_verification_id">Education</a> '
        + '</div>'},

        {name: 'Status', field: 'Allocations.AllocationStatus.name'},
        {name: 'Vendor Status', field: 'Allocations.Status.name'},

        {name: 'Allocated On', field: 'Allocations.created_on',   cellFilter: 'date:"dd-MMM-yyyy "'},
        {
          field: ' Case Status',
          cellTemplate: '<select ng-options="status.name for status in status " ng-model="row.entity.status"></select>'

        },

      ]
    };
    qverifyConnection.fetchStatus().then((status)=> {
      //$scope.myData = status;
      //$scope.gridOpts.data = status;
    });

    Restangular.all(`candidate_maps`).getList()
      .then((candidateMap)=> {
        vm.myData = [];
        candidateMap.forEach( candidateMapObj => {
          let c = Object.assign({}, candidateMapObj.plain());
          if (candidateMapObj.Allocations && candidateMapObj.Allocations.length !== 0){
            candidateMapObj.Allocations.forEach(allocation => {
              if (candidateMapObj.id === 1) {
                console.log(allocation)
                console.log(Object.assign(c, {Allocations: allocation}))
              }
              vm.myData.push(Object.assign(c, {Allocations: allocation}))
            })
          } else {
            c.Allocations = undefined;
            vm.myData.push(c);
          }
        });
        //console.log(vm.myData);
        $scope.myData = vm.myData;
        $scope.gridOpts.data = vm.myData;
      })
      .catch((error)=> {
        console.log(error)
      });

  }



  angular.module('appApp')
  .component('case', {
    templateUrl: 'app/routes/case/case.html',
    controller: CaseComponent,
    controllerAs: 'Case',
  });

})();
