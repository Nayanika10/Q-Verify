'use strict';

var app = require('../..');
import request from 'supertest';

var newManager;

describe('Manager API:', function() {

  describe('GET /api/managers', function() {
    var managers;

    beforeEach(function(done) {
      request(app)
        .get('/api/managers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          managers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(managers).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/managers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/managers')
        .send({
          name: 'New Manager',
          info: 'This is the brand new manager!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newManager = res.body;
          done();
        });
    });

    it('should respond with the newly created manager', function() {
      expect(newManager.name).to.equal('New Manager');
      expect(newManager.info).to.equal('This is the brand new manager!!!');
    });

  });

  describe('GET /api/managers/:id', function() {
    var manager;

    beforeEach(function(done) {
      request(app)
        .get('/api/managers/' + newManager._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          manager = res.body;
          done();
        });
    });

    afterEach(function() {
      manager = {};
    });

    it('should respond with the requested manager', function() {
      expect(manager.name).to.equal('New Manager');
      expect(manager.info).to.equal('This is the brand new manager!!!');
    });

  });

  describe('PUT /api/managers/:id', function() {
    var updatedManager;

    beforeEach(function(done) {
      request(app)
        .put('/api/managers/' + newManager._id)
        .send({
          name: 'Updated Manager',
          info: 'This is the updated manager!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedManager = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedManager = {};
    });

    it('should respond with the updated manager', function() {
      expect(updatedManager.name).to.equal('Updated Manager');
      expect(updatedManager.info).to.equal('This is the updated manager!!!');
    });

  });

  describe('DELETE /api/managers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/managers/' + newManager._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when manager does not exist', function(done) {
      request(app)
        .delete('/api/managers/' + newManager._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
