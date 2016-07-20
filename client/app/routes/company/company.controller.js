'use strict';

(function(){

  function CompanyComponent(QverifyConnection) {
    console.log(
      'here'
    );
    let vm = this;
    let qverifyConnection = new QverifyConnection;
    vm.createCompany = function(company){
      qverifyConnection.company(company).then((company)=> {
        if(company == undefined)
          alert("Incorrect");
        console.log(company.plain())
      }).catch((err)=> {
        console.log(err)
      });
      var options = {};

      vm.create = function () {
        qverifyConnection.createCompany(vm.company);
      };
    };
    qverifyConnection.fetchLocation().then((locations)=> {
      vm.Location = locations;
    });

  }



angular.module('appApp')
  .component('company', {
    templateUrl: 'app/routes/company/company.html',
    controller: CompanyComponent,
    controllerAs: 'Company',
  });

})();
