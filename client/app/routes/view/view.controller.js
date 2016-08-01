'use strict';

(function () {

  function ViewComponent($log, QverifyConnection, $stateParams) {
    const LOG_TAG = 'ViewComponent';
    const vm = this;
    console.log(LOG_TAG, $stateParams.case_id);
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchCase($stateParams.case_id).then(caseObj=> {
      //console.log(caseObj.plain());
      vm.Case = caseObj;
    })
  }

  angular.module('appApp')
    .component('view', {
      templateUrl: 'app/routes/view/view.html',
      controller: ViewComponent,
      controllerAs: 'View',
    });

})();
