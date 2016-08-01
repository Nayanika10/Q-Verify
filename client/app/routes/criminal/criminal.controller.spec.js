'use strict';

describe('Component: CriminalComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CriminalComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    CriminalComponent = $componentController('criminal', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
