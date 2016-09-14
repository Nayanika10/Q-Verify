angular.module('uiGenApp')
  .run(function handleEvents($rootScope, Auth, authService, AUTH_EVENTS, Session, $state, $window, URLS, User, $uibModal) {
    // In Future: assign to variable to destroy during the $destroy event
    const location = $window.location;
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (!Session.isAuthenticated() && (next.name.split('.')[0] !== 'access')) {
        event.preventDefault();
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        return $window.location.href = `${URLS.OAUTH}&state=${location.pathname}`;
      }

      if (Session.isAuthenticated() && User.userinfo.isBlocked
        && (next.name.split('.')[0] !== User.userinfo.whatBlocked[0].url)) {
        event.preventDefault();
        return $state.go(User.userinfo.whatBlocked[0].url);
      }

      if (Session.isAuthenticated() && (next.name === 'access.oauth')) {
        event.preventDefault();
        return $state.go('applicants.list', { status: 'Tasks' });
      }
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, (event, data) => {
      angular.noop(event);
      return angular.noop(data);
    });

    $rootScope.$on(AUTH_EVENTS.loginRequired, () => {
      if (Session.isAuthenticated()) {
        // Refresh token autimatically if token expires
        Auth.refreshToken().then(
          () => {
            authService.loginConfirmed('success', argConfig => {
              const config = argConfig;
              config.headers.Authorization = `Bearer ${Session.getAccessToken()}`;
              return config;
            });
          },
          err => (err.status === 400) && $uibModal.open({
            animation: true,
            templateUrl: 'app/directives/reauth/reauth.html',
            controller(Session) {
              Session.destroy();
              const vm = this;
              vm.href = `${URLS.OAUTH}&state=${location.pathname}`;
            },
            controllerAs: 'ReAuth',
            backdrop: 'static',
          })
        );
      }
    });
  });
