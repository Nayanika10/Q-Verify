'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var caseEducationVerificationCtrlStub = {
  index: 'caseEducationVerificationCtrl.index',
  show: 'caseEducationVerificationCtrl.show',
  create: 'caseEducationVerificationCtrl.create',
  update: 'caseEducationVerificationCtrl.update',
  destroy: 'caseEducationVerificationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var caseEducationVerificationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './case_education_verification.controller': caseEducationVerificationCtrlStub
});

describe('CaseEducationVerification API Router:', function() {

  it('should return an express router instance', function() {
    expect(caseEducationVerificationIndex).to.equal(routerStub);
  });

  describe('GET /api/case_education_verifications', function() {

    it('should route to caseEducationVerification.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'caseEducationVerificationCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/case_education_verifications/:id', function() {

    it('should route to caseEducationVerification.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'caseEducationVerificationCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/case_education_verifications', function() {

    it('should route to caseEducationVerification.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'caseEducationVerificationCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/case_education_verifications/:id', function() {

    it('should route to caseEducationVerification.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'caseEducationVerificationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/case_education_verifications/:id', function() {

    it('should route to caseEducationVerification.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'caseEducationVerificationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/case_education_verifications/:id', function() {

    it('should route to caseEducationVerification.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'caseEducationVerificationCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
