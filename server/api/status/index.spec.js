'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var StatusCtrlStub = {
  index: 'StatusCtrl.index',
  show: 'StatusCtrl.show',
  create: 'StatusCtrl.create',
  update: 'StatusCtrl.update',
  destroy: 'StatusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var StatusIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './Status.controller': StatusCtrlStub
});

describe('Status API Router:', function() {

  it('should return an express router instance', function() {
    expect(StatusIndex).to.equal(routerStub);
  });

  describe('GET /api/Statuss', function() {

    it('should route to Status.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'StatusCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/Statuss/:id', function() {

    it('should route to Status.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'StatusCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/Statuss', function() {

    it('should route to Status.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'StatusCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/Statuss/:id', function() {

    it('should route to Status.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'StatusCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/Statuss/:id', function() {

    it('should route to Status.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'StatusCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/Statuss/:id', function() {

    it('should route to Status.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'StatusCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
