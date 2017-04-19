'use strict';

describe('Component: OngoingComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var OngoingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    OngoingComponent = $componentController('Ongoing', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
