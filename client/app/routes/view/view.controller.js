'use strict';

class ViewComponent {
  constructor($stateParams, toaster, $state, $http, OAuthToken, URLS) {
    const LOG_TAG = 'ViewComponent';
    console.log(LOG_TAG, $stateParams.id);
    this.$state = $state;
    this.$http = $http;
    this.URLS = URLS;
    this.$stateParams = $stateParams;
    this.AccessToken = OAuthToken.getAccessToken();

  }

  $onInit() {
    this.$http.get(`/api/allocations/${this.$stateParams.id}`).then(({ data }) => (this.data = data))
  }
}

  angular.module('appApp')
    .component('view', {
      templateUrl: 'app/routes/view/view.html',
      controller: ViewComponent,
      controllerAs: '$ctrl',
    });




























//if( candidateObj.CaseAddressVerifications.length > 0) {
//  candidateObj.CaseAddressVerifications[0] = candidateObj.CaseAddressVerifications[candidateObj.CaseAddressVerifications.length - 1];
//}
// if( candidateObj.CaseCriminalVerifications.length > 0) {
//   candidateObj.CaseCriminalVerifications[0] = candidateObj.CaseCriminalVerifications[candidateObj.CaseCriminalVerifications.length - 1];
// }
// if( candidateObj.CaseSiteVerifications.length > 0) {
//   candidateObj.CaseSiteVerifications[0] = candidateObj.CaseSiteVerifications[candidateObj.CaseSiteVerifications.length - 1];
// }
// if( candidateObj.CaseEducationVerifications.length > 0) {
//   candidateObj.CaseEducationVerifications[0] = candidateObj.CaseEducationVerifications[candidateObj.CaseEducationVerifications.length - 1];
// }
//  vm.Candidate = candidateObj;
//})
