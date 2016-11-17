class EducationComponent {
  constructor($http,  $stateParams, $state) {
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this
      .$http
      .get(`/api/case_education_verifications/${this.$stateParams.education_id}`)
      .then(({ data }) => (this.data = data));
  }

  update() {
    console.log(this.data)
    this
      .$http
      .put(`/api/case_education_verifications/${this.$stateParams.education_id}`, this.data)
      .then(data =>  this
        .$http
        .put(`/api/allocations/${this.$stateParams.id}`, { status_id: 2 })
        .then(() => this.$state.go('completed')));
  }
}

angular.module('appApp')
  .component('education', {
    templateUrl: 'app/routes/education/education.html',
    controller: EducationComponent,
    controllerAs: '$ctrl',
  });
