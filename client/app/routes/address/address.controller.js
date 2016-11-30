class AddressComponent {
  constructor($http,  $stateParams, $state) {
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this
      .$http
      .get(`/api/case_address_verifications/${this.$stateParams.address_id}`)
      .then(({ data }) => (this.data = data));

    this
      .$http
      .get(`/api/house_types`)
      .then(({ data }) => (this.HouseType = data))
  }

  update() {
    console.log(this.data)
    this
      .$http
      .put(`/api/case_address_verifications/${this.$stateParams.address_id}`, this.data)
      .then(data =>  this
        .$http
        .put(`/api/allocations/${this.$stateParams.id}`, { status_id: 2 })
        .then(() => this.$state.go('ongoing')))
        .then(res => this.toaster.pop('success', "Uploaded"))
        .catch(err => this.toaster.pop('error', err.data ? err.data.message : 'Unexpected Error'));

  }
}


angular.module('appApp')
  .component('address', {
    templateUrl: 'app/routes/address/address.html',
    controller: AddressComponent,
    controllerAs: '$ctrl',
  });


