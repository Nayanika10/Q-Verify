'use strict';
(function () {

  function RegisterComponent(QverifyConnection, toaster, $stateParams, $state) {
    let vm = this;
    vm.user = {};
    let qverifyConnection = new QverifyConnection();
    vm.register = function (user) {
      if (!user)
        return;
      qverifyConnection.register(user).then((user)=> {
        console.log(user);
        $state.go("companyUsers", {id: vm.user.company_id});

        //for (let i = 0; i < vm.Company.length; i++) {
        //  if (vm.Company[i].id == user.Company_id) {
        //    toaster.pop('success', user.username , user.name  + "," + vm.Company[i].name + "," + user.email_id  + "," +user.contact  )
        //    break;
        //  }
        //}
        toaster.pop('success', "Registered", user.username + "," + user.name + "," + user.email_id + "," + user.contact)
        if (user == undefined)
          alert("Incorrect");
        console.log(user.plain())
      }).catch((err)=> {
        console.log(err)
      });
      var options = {};

    };
    qverifyConnection.fetchCompany().then((companys)=> {
      vm.Company = companys;
      vm.user.company_id = parseInt($stateParams.cid);
    });
  }

  angular.module('appApp')
    .component('register', {
      templateUrl: 'app/routes/register/register.html',
      controller: RegisterComponent,
      controllerAs: 'Register',
    });

})();
