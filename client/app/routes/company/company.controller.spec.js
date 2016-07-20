'use strict';

describe('Component: CompanyComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CompanyComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CompanyComponent = $componentController('company', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
