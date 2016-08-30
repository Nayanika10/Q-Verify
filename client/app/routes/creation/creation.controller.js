'use strict';

(function () {

  function CreationComponent($log, QverifyConnection,toaster,$state) {
    const LOG_TAG = 'CreationComponent';
    const vm = this;
    let qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchClient().then((clients)=> {
      vm.Client = clients.map(c => c);
      vm.UsersList = clients.map(client => {
        let c = Object.assign({}, client);
        c.ccompany = `${c.Company.name}`;
        c.cname = `(${c.id})${c.name}`;
        return c;
      });
      vm.Users = [];
    });

    qverifyConnection.fetchCaseTypes().then((case_types)=> {
      vm.CaseTypes = case_types;
    });
    //qverifyConnection.fetchDegree().then((degrees)=> {
    //  vm.Degree = degrees;
    //});
    //qverifyConnection.fetchState().then((states)=> {
    //  vm.State = states;
    //});


    vm.create = function () {
      qverifyConnection.createCase(vm.case).then(()=>{
        $state.go("overview")
        })
        .then(res => toaster.pop('success', "Case Created"))
        .catch(err => toaster.pop('error', err.data ? err.data.message : 'Unexpected Error'));

    };

    vm.updateUserList = function () {
      vm.Users = _.filter(vm.UsersList, user => (user.Company.id === vm.case.client_id) );
    }
  }



  angular.module('appApp')
    .component('creation', {
      templateUrl: 'app/routes/creation/creation.html',
      controller: CreationComponent,
      controllerAs: 'Creation',
    });

})();
