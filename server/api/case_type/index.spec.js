'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var caseTypeCtrlStub = {
  index: 'caseTypeCtrl.index',
  show: 'caseTypeCtrl.show',
  create: 'caseTypeCtrl.create',
  update: 'caseTypeCtrl.update',
  destroy: 'caseTypeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var caseTypeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './case_type.controller': caseTypeCtrlStub
});

describe('CaseType API Router:', function() {

  it('should return an express router instance', function() {
    expect(caseTypeIndex).to.equal(routerStub);
  });

  describe('GET /api/case_types', function() {

    it('should route to caseType.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'caseTypeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/case_types/:id', function() {

    it('should route to caseType.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'caseTypeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/case_types', function() {

    it('should route to caseType.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'caseTypeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/case_types/:id', function() {

    it('should route to caseType.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'caseTypeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/case_types/:id', function() {

    it('should route to caseType.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'caseTypeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/case_types/:id', function() {

    it('should route to caseType.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'caseTypeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
