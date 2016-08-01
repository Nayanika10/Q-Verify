'use strict';

(function(){

  function SiteComponent($log, QverifyConnection,toaster ,$stateParams) {
    const LOG_TAG = 'SiteComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchDesignation().then((designations)=> {
      vm.Designation = designations;
    });
    vm.createSite = function () {
      vm.site.case_id = $stateParams.case_id;
      qverifyConnection.createSite(vm.site);
      toaster.pop('success', "Site Created")
    };
}

angular.module('appApp')
  .component('site', {
    templateUrl: 'app/routes/site/site.html',
    controller: SiteComponent,
    controllerAs: 'Site',
  });

})();
