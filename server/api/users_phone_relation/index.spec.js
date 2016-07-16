'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var usersPhoneRelationCtrlStub = {
  index: 'usersPhoneRelationCtrl.index',
  show: 'usersPhoneRelationCtrl.show',
  create: 'usersPhoneRelationCtrl.create',
  update: 'usersPhoneRelationCtrl.update',
  destroy: 'usersPhoneRelationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var usersPhoneRelationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './users_phone_relation.controller': usersPhoneRelationCtrlStub
});

describe('UsersPhoneRelation API Router:', function() {

  it('should return an express router instance', function() {
    expect(usersPhoneRelationIndex).to.equal(routerStub);
  });

  describe('GET /api/users_phone_relations', function() {

    it('should route to usersPhoneRelation.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'usersPhoneRelationCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/users_phone_relations/:id', function() {

    it('should route to usersPhoneRelation.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'usersPhoneRelationCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/users_phone_relations', function() {

    it('should route to usersPhoneRelation.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'usersPhoneRelationCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/users_phone_relations/:id', function() {

    it('should route to usersPhoneRelation.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'usersPhoneRelationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/users_phone_relations/:id', function() {

    it('should route to usersPhoneRelation.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'usersPhoneRelationCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/users_phone_relations/:id', function() {

    it('should route to usersPhoneRelation.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'usersPhoneRelationCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
