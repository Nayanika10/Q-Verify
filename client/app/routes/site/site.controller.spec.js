'use strict';

describe('Component: SiteComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var SiteComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    SiteComponent = $componentController('site', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
