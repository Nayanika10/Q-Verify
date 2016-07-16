'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var degreeCtrlStub = {
  index: 'degreeCtrl.index',
  show: 'degreeCtrl.show',
  create: 'degreeCtrl.create',
  update: 'degreeCtrl.update',
  destroy: 'degreeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var degreeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './degree.controller': degreeCtrlStub
});

describe('Degree API Router:', function() {

  it('should return an express router instance', function() {
    expect(degreeIndex).to.equal(routerStub);
  });

  describe('GET /api/degrees', function() {

    it('should route to degree.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'degreeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/degrees/:id', function() {

    it('should route to degree.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'degreeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/degrees', function() {

    it('should route to degree.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'degreeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/degrees/:id', function() {

    it('should route to degree.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'degreeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/degrees/:id', function() {

    it('should route to degree.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'degreeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/degrees/:id', function() {

    it('should route to degree.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'degreeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
