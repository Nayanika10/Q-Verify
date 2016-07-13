'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userTypeCtrlStub = {
  index: 'userTypeCtrl.index',
  show: 'userTypeCtrl.show',
  create: 'userTypeCtrl.create',
  update: 'userTypeCtrl.update',
  destroy: 'userTypeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userTypeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user_type.controller': userTypeCtrlStub
});

describe('UserType API Router:', function() {

  it('should return an express router instance', function() {
    expect(userTypeIndex).to.equal(routerStub);
  });

  describe('GET /api/user_types', function() {

    it('should route to userType.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'userTypeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/user_types/:id', function() {

    it('should route to userType.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'userTypeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/user_types', function() {

    it('should route to userType.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'userTypeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/user_types/:id', function() {

    it('should route to userType.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'userTypeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/user_types/:id', function() {

    it('should route to userType.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'userTypeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/user_types/:id', function() {

    it('should route to userType.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'userTypeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
