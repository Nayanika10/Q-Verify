'use strict';
(function () {

  function NewcompanyComponent(QverifyConnection, toaster, $state) {
    //const LOG_TAG = 'NewcompanyComponent';
    let vm = this;
    let qverifyConnection = new QverifyConnection;
    vm.createCompany = function (company) {
      //qverifyConnection.company(company).then((company)=> {
      //
      //  //for (let i = 0; i < vm.Location.length; i++) {
      //  //  if (vm.Location[i].id == company.location_id) {
      //  //    toaster.pop('success', "Company Created",company.name + "," +company.address + "," + vm.Location[i].name)
      //  //    break;
      //  //  }
      //  //}
      //  if (company == undefined)
      //    alert("Incorrect");
      //  console.log(company.plain())
      //}).catch((err)=> {
      //  console.log(err)
      //});
      //var options = {};


      qverifyConnection.company(company).then((company)=> {
        console.log(company);
        $state.go("company");
      });

    };
    //qverifyConnection.fetchLocation().then((locations)=> {
    //  vm.Location = locations;
    //});
    qverifyConnection.fetchUserType().then((user_types)=> {
      vm.UserType = user_types;
    });


  }


  angular.module('appApp')
    .component('newcompany', {
      templateUrl: 'app/routes/newcompany/newcompany.html',
      controller: NewcompanyComponent,
      controllerAs: 'Newcompany',
    });

})();

//


