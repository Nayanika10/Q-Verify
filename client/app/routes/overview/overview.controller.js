'use strict';

(function () {
  function OverviewComponent($log, QverifyConnection,$scope,Restangular) {
    const LOG_TAG = 'OverviewComponent';
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
       {name: 'Client', field: 'User.name'},
       {name: 'Vendor', field: 'Allocations.User.name'},
       {name: 'Case', field: 'name'},
       {name: 'Status', field: 'Status.name'},
        {name: 'Created On', field: 'created_at',   cellFilter: 'date:"dd-MM-yy "'},
        {name: 'Updated On', field: 'updated_at',   cellFilter: 'date:"dd-MM-yy "'}


     ]
    };

    Restangular.all(`cases`).getList()
      .then((cases)=> {
        vm.myData = [];
        cases.forEach( caseObj => {
          let c = Object.assign({}, caseObj.plain());
          if (!c.Status) {
            c.Status = { name: 'New'}
          }
          if (caseObj.Allocations && caseObj.Allocations.length !== 0){
            caseObj.Allocations.forEach(allocation => {
              vm.myData.push(Object.assign(c, {Allocations: allocation}))
            })
          } else {
            c.Allocations = undefined;
            vm.myData.push(c);
          }
        });
        console.log(vm.myData);
        $scope.myData = vm.myData;
        $scope.gridOpts.data = vm.myData;
      })
      .catch((error)=> {
        console.log(error)
      });
    //qverifyConnection.fetchAllocation().then((allocations)=> {
    //  $scope.myData = allocations;
    //  $scope.gridOpts.data = allocations;
    //});
  }

  angular.module('appApp')
    .component('overview', {
      templateUrl: 'app/routes/overview/overview.html',
      controller: OverviewComponent,
      controllerAs: 'Overview',
    });

})();

