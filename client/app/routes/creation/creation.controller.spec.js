'use strict';

describe('Component: CreationComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CreationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    CreationComponent = $componentController('creation', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
