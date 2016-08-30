'use strict';

(function(){

  function SiteComponent($log, QverifyConnection,toaster ,$stateParams,$state) {
    const LOG_TAG = 'SiteComponent';
    const vm = this;
    vm.site = {};
    let qverifyConnection = new QverifyConnection();
    //qverifyConnection.fetchDesignation().then((designations)=> {
    //  vm.Designation = designations;
    //});
    vm.createSite = function () {
      vm.site.case_id = $stateParams.case_id;
      qverifyConnection.createSite(vm.site);
      $state.go("completed")
      //toaster.pop('success', "Site Created")
    };
}

angular.module('appApp')
  .component('site', {
    templateUrl: 'app/routes/site/site.html',
    controller: SiteComponent,
    controllerAs: 'Site',
  });

})();
