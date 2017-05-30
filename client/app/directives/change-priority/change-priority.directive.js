'use strict';

(function() {
  class ChangePriorityController {
    /* @ngInject */
    constructor($http, $timeout, $scope,$stateParams) {
      this.$http = $http;
      this.$timeout = $timeout;
      this.$scope = $scope;
      this.$onInit();
      this.$stateParams = $stateParams;
    }

    $onInit() {
      this.statusMap = {};
      this.status.forEach(x => (this.statusMap[x.id] = x.name));
      this.message = {};
      this.dropdown = false;
    }

    changeState(status) {
      console.log('data received',this.data)
      this.dropdown = false;
      this.$http
        .put(`/api/allocations/${this.data.Allocations.id}`, {internal_status_id: status.id})
        .then(() => (this.data.Allocations.internal_status_id = status.id))

      if (status.id == 5) {
        this.$http
          .delete(`/api/allocations/${this.data.Allocations.id}`)
          .then(() => (this.data.Allocations))

      }
    }
  }

  angular
    .module('appApp')
    .directive('changePriority', () => ({
      templateUrl: 'app/directives/change-priority/change-priority.html',
      restrict: 'E',
      scope: { data: '=', status: '=' },
      controller: ChangePriorityController,
      controllerAs: '$ctrl',
      bindToController: true,
    }));
}());
