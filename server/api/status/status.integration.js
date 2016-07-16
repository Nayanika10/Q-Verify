'use strict';

var app = require('../..');
import request from 'supertest';

var newStatus;

describe('Status API:', function() {

  describe('GET /api/Statuss', function() {
    var Statuss;

    beforeEach(function(done) {
      request(app)
        .get('/api/Statuss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Statuss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(Statuss).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/Statuss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Statuss')
        .send({
          name: 'New Status',
          info: 'This is the brand new Status!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStatus = res.body;
          done();
        });
    });

    it('should respond with the newly created Status', function() {
      expect(newStatus.name).to.equal('New Status');
      expect(newStatus.info).to.equal('This is the brand new Status!!!');
    });

  });

  describe('GET /api/Statuss/:id', function() {
    var Status;

    beforeEach(function(done) {
      request(app)
        .get('/api/Statuss/' + newStatus._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Status = res.body;
          done();
        });
    });

    afterEach(function() {
      Status = {};
    });

    it('should respond with the requested Status', function() {
      expect(Status.name).to.equal('New Status');
      expect(Status.info).to.equal('This is the brand new Status!!!');
    });

  });

  describe('PUT /api/Statuss/:id', function() {
    var updatedStatus;

    beforeEach(function(done) {
      request(app)
        .put('/api/Statuss/' + newStatus._id)
        .send({
          name: 'Updated Status',
          info: 'This is the updated Status!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStatus = {};
    });

    it('should respond with the updated Status', function() {
      expect(updatedStatus.name).to.equal('Updated Status');
      expect(updatedStatus.info).to.equal('This is the updated Status!!!');
    });

  });

  describe('DELETE /api/Statuss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Statuss/' + newStatus._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Status does not exist', function(done) {
      request(app)
        .delete('/api/Statuss/' + newStatus._id)
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
