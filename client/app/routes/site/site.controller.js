
  class SiteComponent {
    constructor($http, $stateParams, $state) {
      this.$state = $state;
      this.$http = $http;
      this.$stateParams = $stateParams;

    }

    $onInit() {
      this
        .$http
        .get(`/api/case_site_verifications/${this.$stateParams.site_id}`)
        .then(({ data }) => {
          this.data = data;
          console.log(this.data)
        })
    }

    update() {
      console.log(this.data)
      this
        .$http
        .put(`/api/case_site_verifications/${this.$stateParams.site_id}`, this.data)
        .then(data =>  this
          .$http
          .put(`/api/allocations/${this.$stateParams.id}`, { status_id: 2 })
          .then(() => this.$state.go('completed')));
    }
  }
angular.module('appApp')
  .component('site', {
    templateUrl: 'app/routes/site/site.html',
    controller: SiteComponent,
    controllerAs: '$ctrl',
  });

