'use strict';

(function(){

class CreationComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('appApp')
  .component('creation', {
    templateUrl: 'app/routes/creation/creation.html',
    controller: CreationComponent,
    controllerAs: 'Creation',
  });

})();
