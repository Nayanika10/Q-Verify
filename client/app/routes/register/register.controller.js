'use strict';
(function(){

function RegisterComponent(QverifyConnection) {
  console.log(
    'here'
  );
  let vm = this;
  let qverifyConnection = new QverifyConnection();
  vm.register = function(user) {
    console.log(user);
    qverifyConnection.register(user).then((user)=> {
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
  });
}

angular.module('appApp')
  .component('register', {
    templateUrl: 'app/routes/register/register.html',
    controller: RegisterComponent,
    controllerAs: 'Register',
  });

})();
