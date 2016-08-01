'use strict';

describe('Component: EducationComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var EducationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    EducationComponent = $componentController('education', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
