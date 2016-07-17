'use strict';

describe('Component: AllocationComponent', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var AllocationComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AllocationComponent = $componentController('AllocationComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
