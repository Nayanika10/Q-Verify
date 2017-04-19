'use strict';

class EditComponent {
  constructor($http, $stateParams, $state) {
    const LOG_TAG = 'EditComponent';
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.CaseTypes = [];

  }


  $onInit() {
    this.checkbox = {
      address: true,
      site: false,
      education: false,
      criminal: false,
    }
    //this.getClients();

    this
      .$http
      .get(`/api/candidates/${this.$stateParams.id}`)
      .then(({ data }) => {
        this.data = data;
        const flag = {addr: false ,crim :false , edu: false, site:false};
        this.data.CandidateCases.forEach((cc) => {
          switch(cc.case_type_id){
            case 1: flag.addr = true; break;
            case 2: flag.crim = true; break;
            case 3: flag.edu = true; break;
            case 4: flag.site = true; break;
          }
        });

        if(!flag.addr) this.data.CandidateCases.push({case_type_id: 1,CaseAddressVerification: {}});
        if(!flag.crim) this.data.CandidateCases.push({case_type_id: 2,CaseCriminalVerification: {}});
        if(!flag.edu) this.data.CandidateCases.push({case_type_id: 3,CaseEducationVerification: {}});
        if(!flag.site) this.data.CandidateCases.push({case_type_id: 4,CaseSiteVerification: {}});

      })
  }

  //getUsers(clientId) {
  //  this.$http.get(`/api/clients/${clientId}/users`)
  //    .then(({data:users})=> {
  //      this.users = users
  //    });
  //
  //}


  update() {
    console.log('candidateID', this.data.id);
    console.log(this.data);
    const promises = [this.$http.put(`/api/candidates/${this.data.id}`, this.data)];
    if(this.checkbox.address){
      let caseItem = this.data.CandidateCases.filter(x => (x.case_type_id === 1))[0];
      if (caseItem.id) {
        promises.push(this.$http.put(`/api/candidate_cases/${caseItem.id}`, caseItem));
      } else  {
        promises.push(this.$http.post('/api/candidate_cases', Object.assign(caseItem, { candidate_id: this.data.id })));
      }
    }
    if(this.checkbox.criminal){
      let caseItem = this.data.CandidateCases.filter(x => (x.case_type_id === 2))[0];
      if (caseItem.id) {
        promises.push(this.$http.put(`/api/candidate_cases/${caseItem.id}`, caseItem));
      } else  {
        promises.push(this.$http.post('/api/candidate_cases', Object.assign(caseItem, { candidate_id: this.data.id })));
      }
    }
    if(this.checkbox.education){
      let caseItem = this.data.CandidateCases.filter(x => (x.case_type_id === 3))[0];
      if (caseItem.id) {
        promises.push(this.$http.put(`/api/candidate_cases/${caseItem.id}`, caseItem));
      } else  {
        promises.push(this.$http.post('/api/candidate_cases', Object.assign(caseItem, { candidate_id: this.data.id })));
      }
    }
    if(this.checkbox.site){
      let caseItem = this.data.CandidateCases.filter(x => (x.case_type_id === 4))[0];
      if (caseItem.id) {
        promises.push(this.$http.put(`/api/candidate_cases/${caseItem.id}`, caseItem));
      } else  {
        promises.push(this.$http.post('/api/candidate_cases', Object.assign(caseItem, { candidate_id: this.data.id })));
      }
    }
    Promise.all(promises).then(() => console.log("asasasd")).catch(err => console.log(err))
      .then(() => this.$state.go("overview"))
  }

}
angular.module('appApp')
  .component('edit', {
    templateUrl: 'app/routes/edit/edit.html',
    controller: EditComponent,
    controllerAs: 'ctrl',
  });

