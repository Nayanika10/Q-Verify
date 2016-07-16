'use strict';
(function () {
  function LoginComponent(QverifyConnection,$state) {
    if(localStorage.getItem("user")!=undefined){
      $state.go("dashboard");
    }
    console.log(
      'here'
    );
    let vm = this;
    let qverifyConnection = new QverifyConnection();
    vm.user = {
      username: '',
      password: ''
    };
    vm.login = function (user) {
      console.log(user);
      qverifyConnection.login(user.username, user.password).then((user)=> {
        if(user == undefined)
          alert("Incorrect");
        localStorage.setItem("user", user);
        $state.go("dashboard");
        console.log(user.plain())
      }).catch((err)=> {
        console.log(err)
      });
      var options = {};
    }

  }

  angular.module('appApp')
    .component('login', {
      templateUrl: 'app/routes/login/login.html',
      controller: LoginComponent,
      controllerAs: 'Login',
    });

})();
