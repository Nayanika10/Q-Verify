'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var universityNameCtrlStub = {
  index: 'universityNameCtrl.index',
  show: 'universityNameCtrl.show',
  create: 'universityNameCtrl.create',
  update: 'universityNameCtrl.update',
  destroy: 'universityNameCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var universityNameIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './university_name.controller': universityNameCtrlStub
});

describe('UniversityName API Router:', function() {

  it('should return an express router instance', function() {
    expect(universityNameIndex).to.equal(routerStub);
  });

  describe('GET /api/university_names', function() {

    it('should route to universityName.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'universityNameCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/university_names/:id', function() {

    it('should route to universityName.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'universityNameCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/university_names', function() {

    it('should route to universityName.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'universityNameCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/university_names/:id', function() {

    it('should route to universityName.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'universityNameCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/university_names/:id', function() {

    it('should route to universityName.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'universityNameCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/university_names/:id', function() {

    it('should route to universityName.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'universityNameCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
