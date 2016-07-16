'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var allocationCtrlStub = {
  index: 'allocationCtrl.index',
  show: 'allocationCtrl.show',
  create: 'allocationCtrl.create',
  update: 'allocationCtrl.update',
  destroy: 'allocationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var allocationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './allocation.controller': allocationCtrlStub
});

describe('Allocation API Router:', function() {

  it('should return an express router instance', function() {
    expect(allocationIndex).to.equal(routerStub);
  });

  describe('GET /api/allocations', function() {

    it('should route to allocation.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'allocationCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/allocations/:id', function() {

    it('should route to allocation.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'allocationCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/allocations', function() {

    it('should route to allocation.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'allocationCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/allocations/:id', function() {

    it('should route to allocation.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'allocationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/allocations/:id', function() {

    it('should route to allocation.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'allocationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/allocations/:id', function() {

    it('should route to allocation.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'allocationCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
