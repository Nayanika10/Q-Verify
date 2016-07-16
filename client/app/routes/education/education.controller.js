'use strict';

(function(){

class EducationComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('appApp')
  .component('education', {
    templateUrl: 'app/routes/education/education.html',
    controller: EducationComponent,
    controllerAs: Education
  });

})();
