'use strict';

(function () {
  function OverviewComponent($log, QverifyConnection,$scope,Restangular,URLS) {
    const LOG_TAG = 'OverviewComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    $scope.filterOptions = {
      filterText: ''
    };
    $scope.gridOpts = {
      ienableRowSelection: true,
      enableSelectAll: true,
      enableFiltering: true,
      selectionRowHeaderWidth: 35,
      rowHeight: 35,
      showGridFooter: true,

    };
    $scope.gridOpts.columnDefs = [
        //{name: 'Id', field: 'Case.id'},
        {name: 'Client', field: 'User.Company.name'},
        {name: 'Hiring Manager', field: 'User.name'} ,
        //{name: 'Client', field: 'User.name' ,
        // cellTemplate: '<div class="ui-grid-cell-contents">'
        // + '{{ COL_FIELD }} ({{row.entity.User.name}})' + '</div>'},

        //{name: 'Vendor', field: 'Allocations.User.name'},
        {name: 'Candidate', field: 'name'
          , cellTemplate: '<div class="ui-grid-cell-contents">'
        + '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/candidates/{{ row.entity.id }} ">{{ COL_FIELD }}</a>' + '</div>'
        },
        {name: 'Address', field: 'CandidateCases' , cellTemplate: `<div class="ui-grid-cell-contents">
        &nbsp<a target="_blank" ng-repeat="case in row.entity.CandidateCases" ng-if="case.case_type_id === 1">yes</a>
        </div>`},
        {name: 'Criminal', field: 'CandidateCases' , cellTemplate: `<div class="ui-grid-cell-contents">
        &nbsp<a target="_blank" ng-repeat="case in row.entity.CandidateCases" ng-if="case.case_type_id === 2">yes</a>
        </div>`},
        {name: 'Education', field: 'CandidateCases' , cellTemplate: `<div class="ui-grid-cell-contents">
        &nbsp<a target="_blank" ng-repeat="case in row.entity.CandidateCases" ng-if="case.case_type_id === 3">yes</a>
        </div>`},
        {name: 'Site', field: 'CandidateCases' , cellTemplate: `<div class="ui-grid-cell-contents">
        &nbsp<a target="_blank" ng-repeat="case in row.entity.CandidateCases" ng-if="case.case_type_id === 4">yes</a>
        </div>`},

        //{name: 'Allocated Case', field: 'Allocations', cellTemplate: '<div class="ui-grid-cell-contents">'
        //+ '&nbsp<a target="_blank"" ng-if="COL_FIELD.case_address_verification_id">Address</a>&nbsp'
        //+ '&nbsp<a target="_blank"" ng-if="COL_FIELD.case_criminal_verification_id">Criminal</a>&nbsp'
        //+ '&nbsp<a target="_blank"" ng-if="COL_FIELD.case_site_verification_id">Site</a>&nbsp'
        //+ '&nbsp<a target="_blank"" ng-if="COL_FIELD.case_education_verification_id">Education</a>&nbsp '
        //+ '</div>'},
        //{name:'Candidates', field: 'CandidateMaps'},
       //{name: 'Status', field: 'Status.name'},
        {name: 'Created On', field: 'created_at',   cellFilter: 'date:"dd-MMM-yyyy "'},
        {name: 'Updated On', field: 'updated_at',   cellFilter: 'date:"dd-MMM-yyyy "'},
        //{name: 'Allocated On', field: 'Allocations.created_on',   cellFilter: 'date:"dd-MM-yy "'},
        //{name: 'Candidate', field: 'name' , cellTemplate: '<div class="ui-grid-cell-contents">'
        //+ '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/view/{{ row.entity.id }} ">{{ COL_FIELD }}</a>' + '</div>'},
     ]

    qverifyConnection.fetchAllocationByStatus(2).then((allocations)=> {
      vm.Allocated = allocations;
    });


    Restangular.all(`candidates`).getList()
      .then((candidates)=> {
        vm.myData = [];
        candidates.forEach( candidateObj => {
          let c = Object.assign({}, candidateObj.plain());
          if (!c.Status) {
            //c.Status = { name: 'New'}
            c.Status = {name:'Unallocated'}
          }
          if (candidateObj.Allocations && candidateObj.Allocations.length !== 0){
            candidateObj.Allocations.forEach(allocation => {
              if (candidateObj.id === 1) {
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
    .component('overview', {
      templateUrl: 'app/routes/overview/overview.html',
      controller: OverviewComponent,
      controllerAs: 'Overview',
    });

})();

