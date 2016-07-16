'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var caseSiteVerificationCtrlStub = {
  index: 'caseSiteVerificationCtrl.index',
  show: 'caseSiteVerificationCtrl.show',
  create: 'caseSiteVerificationCtrl.create',
  update: 'caseSiteVerificationCtrl.update',
  destroy: 'caseSiteVerificationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var caseSiteVerificationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './case_site_verification.controller': caseSiteVerificationCtrlStub
});

describe('CaseSiteVerification API Router:', function() {

  it('should return an express router instance', function() {
    expect(caseSiteVerificationIndex).to.equal(routerStub);
  });

  describe('GET /api/case_site_verifications', function() {

    it('should route to caseSiteVerification.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'caseSiteVerificationCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/case_site_verifications/:id', function() {

    it('should route to caseSiteVerification.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'caseSiteVerificationCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/case_site_verifications', function() {

    it('should route to caseSiteVerification.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'caseSiteVerificationCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/case_site_verifications/:id', function() {

    it('should route to caseSiteVerification.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'caseSiteVerificationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/case_site_verifications/:id', function() {

    it('should route to caseSiteVerification.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'caseSiteVerificationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/case_site_verifications/:id', function() {

    it('should route to caseSiteVerification.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'caseSiteVerificationCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
