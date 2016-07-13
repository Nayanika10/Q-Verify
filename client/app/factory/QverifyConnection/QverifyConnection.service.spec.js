'use strict';

describe('Service: QverifyConnection', function () {

  // load the service's module
  beforeEach(module('appApp.QverifyConnection'));

  // instantiate service
  var QverifyConnection;
  beforeEach(inject(function (_QverifyConnection_) {
    QverifyConnection = _QverifyConnection_;
  }));

  it('should do something', function () {
    expect(!!QverifyConnection).to.be.true;
  });

});
