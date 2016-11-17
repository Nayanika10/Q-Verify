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

    QVC.prototype.fetchUserType = ()=> {
      let defer = $q.defer();
      Restangular.all(`user_types`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };


    QVC.prototype.fetchHouseType = ()=> {
      let defer = $q.defer();
      Restangular.all(`house_types`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    //QVC.prototype.fetchDegree = ()=> {
    //  let defer = $q.defer();
    //  Restangular.all(`degrees`).getList()
    //    .then((data)=> {
    //      defer.resolve(data);
    //    })
    //    .catch((error)=> {
    //      defer.reject(error);
    //    });
    //  return defer.promise;
    //
    //};

    //QVC.prototype.fetchDesignation = ()=> {
    //  let defer = $q.defer();
    //  Restangular.all(`designations`).getList()
    //    .then((data)=> {
    //      defer.resolve(data);
    //    })
    //    .catch((error)=> {
    //      defer.reject(error);
    //    });
    //  return defer.promise;
    //
    //};

    //QVC.prototype.fetchUniversityName = ()=> {
    //  let defer = $q.defer();
    //  Restangular.all(`university_names`).getList()
    //    .then((data)=> {
    //      defer.resolve(data);
    //    })
    //    .catch((error)=> {
    //      defer.reject(error);
    //    });
    //  return defer.promise;
    //
    //};

    QVC.prototype.fetchStatus = ()=> {
      let defer = $q.defer();
      Restangular.all(`status`).getList()
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
      Restangular.all(`open/users/login`).post({
          username: username,
          password: password
        })
        .then((response)=> {
          OAuthToken.setToken(JSON.parse(response));
          Auth.setSessionData()
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.register = (user)=> {
      let defer = $q.defer();
      Restangular.all(`open/users/register`).post(user)
        .then((data)=> {

          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.createAddress = (case_address_verification)=> {
      let defer = $q.defer();
      Restangular.all(`case_address_verifications`).post(case_address_verification)
        .then((data)=> {

          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchAddress = (case_address_verification)=> {
      let defer = $q.defer();
      Restangular.all(`case_address_verifications`).get()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.createCriminal = (case_criminal_verification)=> {
      let defer = $q.defer();
      Restangular.all(`case_criminal_verifications`).post(case_criminal_verification)
        .then((data)=> {

          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchCriminal = (case_criminal_verification)=> {
      let defer = $q.defer();
      Restangular.all(`case_criminal_verifications`).get()
        .then((data)=> {

          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.createEducation = (case_education_verification)=> {
      let defer = $q.defer();
      Restangular.all(`case_education_verifications`).post(case_education_verification)
        .then((data)=> {

          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchEducation = (case_criminal_verification)=> {
      let defer = $q.defer();
      Restangular.all(`case_criminal_verifications`).get()
        .then((data)=> {

          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.createSite = (case_site_verification)=> {
      let defer = $q.defer();
      Restangular.all(`case_site_verifications`).post(case_site_verification)
        .then((data)=> {

          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchSite = (case_site_verification)=> {
      let defer = $q.defer();
      Restangular.all(`case_site_verifications`).get()
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

    //QVC.prototype.fetchLocation = (location)=> {
    //  let defer = $q.defer();
    //  Restangular.all(`locations`).getList()
    //    .then((data)=> {
    //      defer.resolve(data);
    //    })
    //    .catch((error)=> {
    //      defer.reject(error);
    //    });
    //  return defer.promise;
    //
    //};

    QVC.prototype.fetchState = (State)=> {
      let defer = $q.defer();
      Restangular.all(`states`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchPin = (Pin)=> {
      let defer = $q.defer();
      Restangular.all(`pins`).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchAllocationByStatus = (status)=> {
      let defer = $q.defer();
      Restangular.all(`allocations`).one('status', status).getList()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return  defer.promise;

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

    QVC.prototype.fetchCandidate = (id)=> {
      let defer = $q.defer();
      Restangular.one(`candidates`, id).get()
        .then((data)=> {
          defer.resolve(data);
        })
        .catch((error)=> {
          defer.reject(error);
        });
      return defer.promise;

    };

    QVC.prototype.fetchCandidateMap = (id)=> {
      let defer = $q.defer();
      Restangular.one(`candidate_maps`, id).get()
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


    QVC.prototype.fetchVendorUploadedCases = ()=> {
      let defer = $q.defer();
      Restangular.all(`allocations/`).getList()
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
