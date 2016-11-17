'use strict';

describe('Component: CompletedComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CompletedComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    CompletedComponent = $componentController('completed', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
