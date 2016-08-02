'use strict';

describe('Service: URLS', function () {

  // load the service's module
  beforeEach(module('chatApp'));

  // instantiate service
  var URLS;
  beforeEach(inject(function (_URLS_) {
    URLS = _URLS_;
  }));

  it('should do something', function () {
    !!URLS.should.be.true;
  });

});
