angular.module('appApp')
// Depending on constant: AUTH_EVENTS
  .factory('Auth',
    function ($log, $http, $q, Session, URLS, OAuthToken) {
      const authService = {};
      const LOG_TAG = "Auth.js";
      let refreshingToken = false;

      authService.login = function login(credentials) {
        const url = `${URLS.QVERIFY_API}/third-party/quezx/login`;
        return $http
          .post(url, credentials, {ignoreAuthModule: true})
          .then(response => {
            // save in cookies - angular-oauth2 bower component
            OAuthToken.setToken(JSON.parse(response.data));
            return Session.create('oauth', response.data);
          })
          .catch(
            res => {
              $log.log(LOG_TAG, "err", res.data);
              Session.destroy();
              return $q.reject(res.data);
            });
      };

      authService.refreshToken = () => {
        // To Save Multiple Async RefreshToken Request
        if (refreshingToken) {
          $log.warn(LOG_TAG,'Refresh token request already sent.');
          return $q.reject({warning: 'Refresh token request already sent.'});
        }
        refreshingToken = true; // Set refresh_token reuqest tracker flag
        const url = `${URLS.QVERIFY_API}/third-party/quezx/refresh`;
        return $http
          .post(
            url,
            {refresh_token: Session.read('oauth').refresh_token},
            {ignoreAuthModule: true}
          )
          .then(res => {
            Session.create('oauth', res.data);
            refreshingToken = false; // reset refresh_token reuqest tracker flag
            return $q.resolve(res);
          }).catch(res => {
            refreshingToken = false; // reset refresh_token reuqest tracker flag
            return $q.reject(res);
          });
      };

      authService.logout = function logout() {
        const url = `${URLS.QVERIFY_API}/third-party/quezx/logout`;
        return $http
          .post(url, {access_token: Session.getAccessToken()})
          .then(
            response => {
              // Destroy Session data
              Session.destroy();
              return response.data;
            },
            err => {
              Session.destroy();
              return $q.reject(err.data);
            }
          );
      };

      authService.setSessionData = () => {
        return $q.all([
          $http
            .get(`${URLS.QVERIFY_API}/users/me`)
            .then(response => {
              Session.create('userinfo', response.data)
            }),
        ]);
      };

      return authService;
    });
