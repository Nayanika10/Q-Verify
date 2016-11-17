class CriminalComponent {
  constructor($http,  $stateParams, $state) {
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.moment = moment;
  }

  $onInit() {
    this
      .$http
      .get(`/api/case_criminal_verifications/${this.$stateParams.criminal_id}`)
      .then(({ data }) => {
        this.data = data;
        console.log(this.data)
        this.data.dob = this.moment(this.data.dob).toDate();
        console.log(this.data)
      })
  }

  update() {
    console.log(this.data)
    this
      .$http
      .put(`/api/case_criminal_verifications/${this.$stateParams.criminal_id}`, this.data)
      .then(data =>  this
        .$http
        .put(`/api/allocations/${this.$stateParams.id}`, { status_id: 2 })
        .then(() => this.$state.go('completed')));
  }
}

angular.module('appApp')
  .component('criminal', {
    templateUrl: 'app/routes/criminal/criminal.html',
    controller: CriminalComponent,
    controllerAs: '$ctrl',
  });
