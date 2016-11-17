'use strict';

describe('Component: CaseComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CaseComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    CaseComponent = $componentController('case', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
