'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var allocationStatusCtrlStub = {
  index: 'allocationStatusCtrl.index',
  show: 'allocationStatusCtrl.show',
  create: 'allocationStatusCtrl.create',
  update: 'allocationStatusCtrl.update',
  destroy: 'allocationStatusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var allocationStatusIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './allocation_status.controller': allocationStatusCtrlStub
});

describe('AllocationStatus API Router:', function() {

  it('should return an express router instance', function() {
    expect(allocationStatusIndex).to.equal(routerStub);
  });

  describe('GET /api/allocation_statuss', function() {

    it('should route to allocationStatus.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'allocationStatusCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/allocation_statuss/:id', function() {

    it('should route to allocationStatus.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'allocationStatusCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/allocation_statuss', function() {

    it('should route to allocationStatus.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'allocationStatusCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/allocation_statuss/:id', function() {

    it('should route to allocationStatus.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'allocationStatusCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/allocation_statuss/:id', function() {

    it('should route to allocationStatus.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'allocationStatusCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/allocation_statuss/:id', function() {

    it('should route to allocationStatus.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'allocationStatusCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
