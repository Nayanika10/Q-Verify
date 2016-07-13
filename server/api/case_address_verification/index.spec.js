'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var caseAddressVerificationCtrlStub = {
  index: 'caseAddressVerificationCtrl.index',
  show: 'caseAddressVerificationCtrl.show',
  create: 'caseAddressVerificationCtrl.create',
  update: 'caseAddressVerificationCtrl.update',
  destroy: 'caseAddressVerificationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var caseAddressVerificationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './case_address_verification.controller': caseAddressVerificationCtrlStub
});

describe('CaseAddressVerification API Router:', function() {

  it('should return an express router instance', function() {
    expect(caseAddressVerificationIndex).to.equal(routerStub);
  });

  describe('GET /api/case_address_verifications', function() {

    it('should route to caseAddressVerification.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'caseAddressVerificationCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/case_address_verifications/:id', function() {

    it('should route to caseAddressVerification.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'caseAddressVerificationCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/case_address_verifications', function() {

    it('should route to caseAddressVerification.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'caseAddressVerificationCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/case_address_verifications/:id', function() {

    it('should route to caseAddressVerification.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'caseAddressVerificationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/case_address_verifications/:id', function() {

    it('should route to caseAddressVerification.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'caseAddressVerificationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/case_address_verifications/:id', function() {

    it('should route to caseAddressVerification.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'caseAddressVerificationCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
