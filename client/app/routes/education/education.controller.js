'use strict';

(function(){

  function EducationComponent($log, QverifyConnection,toaster,$stateParams, $state) {
    const LOG_TAG = 'EducationComponent';
    const vm = this;
    vm.education = {};
    let qverifyConnection = new QverifyConnection();
    //qverifyConnection.fetchStatus().then((status)=> {
    //  vm.Status = status;
    //});
    //qverifyConnection.fetchDesignation().then((designations)=> {
    //  vm.Designation = designations;
    //});
    //qverifyConnection.fetchUniversityName().then((university_names)=> {
    //  vm.UniversityName = university_names;
    //});
    //qverifyConnection.fetchDegree().then((degrees)=> {
    //  vm.Degree = degrees;
    //});
    vm.createEducation = function () {
      vm.education.case_id = $stateParams.case_id;
      qverifyConnection.createEducation(vm.education);
      $state.go("completed")
      //toaster.pop('success', "Education Created")
    };
}

angular.module('appApp')
  .component('education', {
    templateUrl: 'app/routes/education/education.html',
    controller: EducationComponent,
    controllerAs: 'Education',
  });

})();
