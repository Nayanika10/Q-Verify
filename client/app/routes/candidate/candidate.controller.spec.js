'use strict';

describe('Component: CandidateComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CandidateComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    CandidateComponent = $componentController('candidate', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
