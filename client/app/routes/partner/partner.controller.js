'use strict';

(function () {

  function PartnerComponent($log, QverifyConnection,OAuthToken,$state) {
    const LOG_TAG = 'PartnerComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchAllocationByStatus(1).then((allocations)=> {
      vm.Allocation = allocations;
      console.log(vm.Allocation);
    });
    qverifyConnection.fetchAllocationByStatus(4).then((allocations)=> {
      vm.Allocated = allocations;
    });

  vm.logout =  function() {
    OAuthToken.removeToken();
    $state.go('login');
  }
  }


  angular.module('appApp')
    .component('partner', {
      templateUrl: 'app/routes/partner/partner.html',
      controller: PartnerComponent,
      controllerAs: 'Partner',
    });

})();

//.item(ng-repeat='allocation in Partner.Allocation' )
//input(id='aloc_{{$index}}' type='checkbox')
//label(for='$index') ?
//  h2 {{allocation.Case.name}}
//.description(ui-sref='candidate({case_id: allocation.case_id })')
//p
//a.text-ellipsis(ng-bind="allocation.Case.name + '-' + allocation.Case.CaseType.name ")
//p
//span.text-ellipsis(style="width:25%") {{allocation.Case.created_at | date}}
