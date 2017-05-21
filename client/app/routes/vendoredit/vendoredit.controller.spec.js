'use strict';

describe('Component: VendoreditComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var VendoreditComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    VendoreditComponent = $componentController('vendoredit', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
