'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var managerCtrlStub = {
  index: 'managerCtrl.index',
  show: 'managerCtrl.show',
  create: 'managerCtrl.create',
  update: 'managerCtrl.update',
  destroy: 'managerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var managerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './manager.controller': managerCtrlStub
});

describe('Manager API Router:', function() {

  it('should return an express router instance', function() {
    expect(managerIndex).to.equal(routerStub);
  });

  describe('GET /api/managers', function() {

    it('should route to manager.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'managerCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/managers/:id', function() {

    it('should route to manager.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'managerCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/managers', function() {

    it('should route to manager.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'managerCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/managers/:id', function() {

    it('should route to manager.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'managerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/managers/:id', function() {

    it('should route to manager.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'managerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/managers/:id', function() {

    it('should route to manager.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'managerCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
