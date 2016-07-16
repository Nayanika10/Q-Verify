'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var caseCtrlStub = {
  index: 'caseCtrl.index',
  show: 'caseCtrl.show',
  create: 'caseCtrl.create',
  update: 'caseCtrl.update',
  destroy: 'caseCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var caseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './case.controller': caseCtrlStub
});

describe('Case API Router:', function() {

  it('should return an express router instance', function() {
    expect(caseIndex).to.equal(routerStub);
  });

  describe('GET /api/cases', function() {

    it('should route to case.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'caseCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/cases/:id', function() {

    it('should route to case.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'caseCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/cases', function() {

    it('should route to case.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'caseCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/cases/:id', function() {

    it('should route to case.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'caseCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cases/:id', function() {

    it('should route to case.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'caseCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cases/:id', function() {

    it('should route to case.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'caseCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
