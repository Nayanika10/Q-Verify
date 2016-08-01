'use strict';

describe('Component: AddressComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var AddressComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    AddressComponent = $componentController('address', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
