'use strict';

angular.module('appApp')
  .service('QverifyConnection', function ($q, Restangular) {
    // Service logic
    // ...
    function QVC() {
    }

    QVC.prototype.fetchCases = ()=> {
      let defer = $q.defer();
      Restangular.all(`cases`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchClient = ()=> {
      let defer = $q.defer();
      Restangular.all(`users/client`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchVendor = ()=> {
      let defer = $q.defer();
      Restangular.all(`users/vendor`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchCaseTypes = ()=> {
      let defer = $q.defer();
      Restangular.all(`case_types`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchDegree = ()=> {
      let defer = $q.defer();
      Restangular.all(`degrees`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.createCase = (newCase)=> {
      let defer = $q.defer();
      Restangular.all(`cases`).post(newCase)
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

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

    QVC.prototype.company = (company)=> {
      console.log(company)
      let defer = $q.defer();
      Restangular.all(`companys`).post(company)
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;
    };

    QVC.prototype.createAllocation = (allocation)=> {
      let defer = $q.defer();
      Restangular.all(`allocations`).post(allocation)
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchLocation = (location)=> {
      let defer = $q.defer();
      Restangular.all(`locations`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchAllocation = (allocation)=> {
      let defer = $q.defer();
      Restangular.all(`allocations`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchCompany = (company)=> {
      let defer = $q.defer();
      Restangular.all(`companys/`).getList()
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
