'use strict';

describe('Component: PartnerComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var PartnerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PartnerComponent = $componentController('partner', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
