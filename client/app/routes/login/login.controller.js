'use strict';
(function () {
  function LoginComponent(QverifyConnection, $state, Restangular, OAuthToken, Auth) {
    let LOG_TAG = 'LoginComponent';
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
      Restangular.all(`open/users/login`).post({
        username: user.username,
        password: user.password
      })
        .then((response)=> {
          OAuthToken.setToken(JSON.parse(response));
          Auth.setSessionData();
          let user = JSON.parse(localStorage.getItem('userinfo'));
          if (user.Company.user_type_id === 3)
            $state.go("partner");
          else
            $state.go("overview");
        })
        .catch((error)=> {
          console.log(LOG_TAG, error);
        });
    }

  }

  angular.module('appApp')
    .component('login', {
      templateUrl: 'app/routes/login/login.html',
      controller: LoginComponent,
      controllerAs: 'Login',
    });

})();
