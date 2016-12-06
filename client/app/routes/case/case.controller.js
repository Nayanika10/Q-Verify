'use strict';

(function () {
  function CaseComponent($log, QverifyConnection,$scope,Restangular,URLS, $uibModal) {
    const LOG_TAG = 'CaseComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    $scope.statusList = [];


    $scope.gridOpts = {
      ienableRowSelection: true,
      enableSelectAll: true,
      enableFiltering: true,
      selectionRowHeaderWidth: 35,
      rowHeight: 35,
      showGridFooter: true,

    };
    $scope.gridOpts.columnDefs = [
      {name: 'Id', field: 'id'},
      {name: 'Client', field: 'Candidate.User.Company.name'},
      {name: 'Hiring Manager', field: 'Candidate.User.name'},
      {name: 'Vendor', field: 'Allocations.User.name'},
      {
        name: 'Candidate', field: 'Candidate.name', cellTemplate: '<div class="ui-grid-cell-contents">'
      + '<a target="_blank"" href="' + URLS.QVERIFY_SERVER + '/view/allocations/{{ row.entity.id }} ">{{ COL_FIELD }} </a>' + '</div>'
      },
      {
        name: 'Case Type', field: 'Candidate', cellTemplate: '<div class="ui-grid-cell-contents">'
      + '<span target="_blank" ng-if="row.entity.case_address_verification_id">Address</span>'
      + '<span target="_blank" ng-if="row.entity.case_criminal_verification_id">Criminal</span>'
      + '<span target="_blank" ng-if="row.entity.case_site_verification_id">Site</span>'
      + '<span target="_blank" ng-if="row.entity.case_education_verification_id">Education</span> '
      + '</div>'
      },
      {name: 'Status', field: 'Allocations.AllocationStatus.name'},
      {name: 'Vendor Status', field: 'Allocations.Status.name'},
      {name: 'Allocated On', field: 'Allocations.created_on', cellFilter: 'date:"dd-MMM-yyyy "'},
      {
        //field: 'Allocations.Status.name',
        //field: ' Case Status',
        name: 'status', displayName: 'Case status', editableCellTemplate: 'ui-grid/dropdownEditor',
        cellFilter: 'mapStatus',
        cellTemplate: '<change-priority data="row.entity" ' +
        'status="grid.appScope.statusList"></change-priority>',
      //cellTemplate: '<select ng-options="status for status in getExternalScopes().statusList" ng-model="row.entity.status" > </select>'
      },
    ]


    function checkExist(incomingData, selectedTags, key) {
      var names = _.pluck(selectedTags, key)

      return _.filter(incomingData, function (item) {
        return -1 === names.indexOf(item[key])
      })
    }

    $scope.gridOpts.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, () => {
        vm.candidate_mapIdsToAllocation = gridApi.selection.getSelectedRows().map(x => x.id);
      });

      gridApi.selection.on.rowSelectionChangedBatch($scope, () => {
        vm.candidate_mapIdsToAllocation = gridApi.selection.getSelectedRows().map(x => x.id);
      });
    }



    $scope.open = size => {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/directives/allocation/allocation.html',
        controller: 'AllocationController',
        controllerAs: 'ctrl',
        size,
        resolve: {
          candidateMapIds: () => vm.candidate_mapIdsToAllocation,
          gridApi: () => $scope.gridApi,
        },
      });
    };



    $scope.info = {};
    $scope.gridOpts.multiSelect = true;

    //$scope.setSelectable = function() {
    //  $scope.gridApi.selection.clearSelectedRows();
    //
    //};

    qverifyConnection.fetchStatus().then((status)=> {
      $scope.statusList = status;
    });
    qverifyConnection.fetchAllocationByStatus(2).then((allocations)=> {
      vm.Allocated = allocations;
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
  })
  //}).filter('mapStatus', function() {
  //  //console.log('ssss')
  //  var statusHash = {
  //    1: 'Allocated',
  //    2: 'Uploaded',
  //    3: 'Accepted',
  //    4: 'Reject',
  //    5: 'Unallocated',
  //    6: 'Closed'
  //  };
  //
  //  return function(input) {
  //    if (!input){
  //      return '';
  //    } else {
  //      return statusHash[input];
  //    }
  //  };
  //});


})();
