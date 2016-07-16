'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var caseCriminalVerificationCtrlStub = {
  index: 'caseCriminalVerificationCtrl.index',
  show: 'caseCriminalVerificationCtrl.show',
  create: 'caseCriminalVerificationCtrl.create',
  update: 'caseCriminalVerificationCtrl.update',
  destroy: 'caseCriminalVerificationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var caseCriminalVerificationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './case_criminal_verification.controller': caseCriminalVerificationCtrlStub
});

describe('CaseCriminalVerification API Router:', function() {

  it('should return an express router instance', function() {
    expect(caseCriminalVerificationIndex).to.equal(routerStub);
  });

  describe('GET /api/case_criminal_verifications', function() {

    it('should route to caseCriminalVerification.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'caseCriminalVerificationCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/case_criminal_verifications/:id', function() {

    it('should route to caseCriminalVerification.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'caseCriminalVerificationCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/case_criminal_verifications', function() {

    it('should route to caseCriminalVerification.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'caseCriminalVerificationCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/case_criminal_verifications/:id', function() {

    it('should route to caseCriminalVerification.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'caseCriminalVerificationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/case_criminal_verifications/:id', function() {

    it('should route to caseCriminalVerification.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'caseCriminalVerificationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/case_criminal_verifications/:id', function() {

    it('should route to caseCriminalVerification.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'caseCriminalVerificationCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
