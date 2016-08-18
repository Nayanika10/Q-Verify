'use strict';

(function () {
  function OverviewComponent($log, QverifyConnection,$scope) {
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
       {name: 'Client', field: 'Case.User.name'},
       {name: 'Vendor', field: 'User.name'},
       {name: 'Case', field: 'Case.name'},
       {name: 'Status', field: 'Case.Status.name'}


     ]
    };


    qverifyConnection.fetchAllocation().then((allocations)=> {
      $scope.myData = allocations;
      $scope.gridOpts.data = allocations;
    });
  }

  angular.module('appApp')
    .component('overview', {
      templateUrl: 'app/routes/overview/overview.html',
      controller: OverviewComponent,
      controllerAs: 'Overview',
    });

})();

