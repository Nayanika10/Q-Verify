'use strict';

describe('Component: CompanyUsersComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CompanyUsersComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    CompanyUsersComponent = $componentController('companyUsers', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
