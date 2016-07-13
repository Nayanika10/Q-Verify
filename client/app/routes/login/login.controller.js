'use strict';
(function () {
  function LoginComponent() {
    var vm = this;
    vm.user = {
      username: '',
      password: ''
    };
    vm.signin = function(user){
      console.log(user);
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
