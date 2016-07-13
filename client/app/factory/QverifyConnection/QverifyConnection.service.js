'use strict';

angular.module('appApp')
  .service('QverifyConnection', function ($q, Restangular) {
    // Service logic
    // ...
    function QVC() {
    }

    QVC.prototype.login = (username, password)=> {
      let defer = $q.defer();
      Restangular.all(`users/login`).post({
          username: username,
          password: password
        })
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.register = (user)=> {
      let defer = $q.defer();
      Restangular.all(`users/register`).post(user)
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    return QVC;
  });
