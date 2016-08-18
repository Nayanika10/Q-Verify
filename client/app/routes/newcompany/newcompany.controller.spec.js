'use strict';

describe('Component: NewcompanyComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var NewcompanyComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    NewcompanyComponent = $componentController('newcompany', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
