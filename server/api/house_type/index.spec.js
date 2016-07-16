'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var houseTypeCtrlStub = {
  index: 'houseTypeCtrl.index',
  show: 'houseTypeCtrl.show',
  create: 'houseTypeCtrl.create',
  update: 'houseTypeCtrl.update',
  destroy: 'houseTypeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var houseTypeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './house_type.controller': houseTypeCtrlStub
});

describe('HouseType API Router:', function() {

  it('should return an express router instance', function() {
    expect(houseTypeIndex).to.equal(routerStub);
  });

  describe('GET /api/house_types', function() {

    it('should route to houseType.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'houseTypeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/house_types/:id', function() {

    it('should route to houseType.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'houseTypeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/house_types', function() {

    it('should route to houseType.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'houseTypeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/house_types/:id', function() {

    it('should route to houseType.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'houseTypeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/house_types/:id', function() {

    it('should route to houseType.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'houseTypeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/house_types/:id', function() {

    it('should route to houseType.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'houseTypeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
