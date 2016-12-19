'use strict';
(function () {
  function LoginComponent(QverifyConnection, $state, Restangular, OAuthToken, Auth ) {
    let LOG_TAG = 'LoginComponent';
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != undefined) {
      console.log(user);
      if (user.Company.user_type_id === 3)
        $state.go("partner");
      else
        $state.go("overview");
    }
    let vm = this;
    let qverifyConnection = new QverifyConnection();
    vm.user = {
      username: '',
      password: ''
    };
    vm.login = function (user) {
      console.log(user);
      vm.isLoading = true;
      Restangular.all(`open/users/login`).post({
        username: user.username,
        password: user.password
      })
        .then((response)=> {
          OAuthToken.setToken(JSON.parse(response));
          Auth.setSessionData().then(()=>{
            let user = JSON.parse(localStorage.getItem('userinfo'));
            if (user.Company.user_type_id === 3)
              $state.go("partner");
            else
              $state.go("overview");
          });
        })
        .catch((error)=> {
          vm.isError = true;
          console.log(LOG_TAG, error);
          vm.error = 'Invalid Username or Password';
          vm.isLoading = false;
          //alert("Incorrect");
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
