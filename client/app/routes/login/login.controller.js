'use strict';
(function () {
  function LoginComponent(QverifyConnection, $state) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != undefined) {
      console.log(user);
      if (user.Company.user_type_id === 3)
        $state.go("partner");
      else
        $state.go("overview");
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
        if (user == undefined)
          alert("Incorrect");
        localStorage.setItem("user", JSON.stringify(user));
        if (user.Company.user_type_id === 3)
          $state.go("partner");
        else
          $state.go("overview");
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
