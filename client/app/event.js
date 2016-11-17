angular.module('appApp')
  //.run(function handleEvents($rootScope, Auth, authService, AUTH_EVENTS, Session, $state, $window, URLS, User, $uibModal) {
  .run(function handleEvents($rootScope, Auth, AUTH_EVENTS, Session, $state, $window, URLS, User, $uibModal, OAuthToken,OAuth) {
    // In Future: assign to variable to destroy during the $destroy event
    const location = $window.location;

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (!OAuth.isAuthenticated() && next.name !== 'login') {
        event.preventDefault();
        return $state.go('login');
      }

      if (OAuth.isAuthenticated() && (next.name === 'login')) {
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem('userinfo'));
        switch (user.Company.user_type_id){
          case 1:
            console.log("here1")
            return $state.go('overview');
          case 2:
            console.log("here2")
            return $state.go('client');
          case 3:
            console.log("here3")
            return $state.go('partner');
        }
      }
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, (event, data) => {
      angular.noop(event);
      return angular.noop(data);
    });

    //$rootScope.$on(AUTH_EVENTS.loginRequired, () => {
    //  if (Session.isAuthenticated()) {
    //    // Refresh token autimatically if token expires
    //    Auth.refreshToken().then(
    //      () => {
    //        authService.loginConfirmed('success', argConfig => {
    //          const config = argConfig;
    //          config.headers.Authorization = `Bearer ${Session.getAccessToken()}`;
    //          return config;
    //        });
    //      },
    //      err => (err.status === 400) && $uibModal.open({
    //        animation: true,
    //        templateUrl: 'app/directives/reauth/reauth.html',
    //        controller(Session) {
    //          Session.destroy();
    //          const vm = this;
    //          vm.href = `${URLS.OAUTH}&state=${location.pathname}`;
    //        },
    //        controllerAs: 'ReAuth',
    //        backdrop: 'static',
    //      })
    //    );
    //  }
    //});
  });
