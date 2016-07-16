'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var designationCtrlStub = {
  index: 'designationCtrl.index',
  show: 'designationCtrl.show',
  create: 'designationCtrl.create',
  update: 'designationCtrl.update',
  destroy: 'designationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var designationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './designation.controller': designationCtrlStub
});

describe('Designation API Router:', function() {

  it('should return an express router instance', function() {
    expect(designationIndex).to.equal(routerStub);
  });

  describe('GET /api/designations', function() {

    it('should route to designation.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'designationCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/designations/:id', function() {

    it('should route to designation.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'designationCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/designations', function() {

    it('should route to designation.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'designationCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/designations/:id', function() {

    it('should route to designation.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'designationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/designations/:id', function() {

    it('should route to designation.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'designationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/designations/:id', function() {

    it('should route to designation.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'designationCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
