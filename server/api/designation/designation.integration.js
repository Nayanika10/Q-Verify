'use strict';

var app = require('../..');
import request from 'supertest';

var newDesignation;

describe('Designation API:', function() {

  describe('GET /api/designations', function() {
    var designations;

    beforeEach(function(done) {
      request(app)
        .get('/api/designations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          designations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(designations).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/designations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/designations')
        .send({
          name: 'New Designation',
          info: 'This is the brand new designation!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDesignation = res.body;
          done();
        });
    });

    it('should respond with the newly created designation', function() {
      expect(newDesignation.name).to.equal('New Designation');
      expect(newDesignation.info).to.equal('This is the brand new designation!!!');
    });

  });

  describe('GET /api/designations/:id', function() {
    var designation;

    beforeEach(function(done) {
      request(app)
        .get('/api/designations/' + newDesignation._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          designation = res.body;
          done();
        });
    });

    afterEach(function() {
      designation = {};
    });

    it('should respond with the requested designation', function() {
      expect(designation.name).to.equal('New Designation');
      expect(designation.info).to.equal('This is the brand new designation!!!');
    });

  });

  describe('PUT /api/designations/:id', function() {
    var updatedDesignation;

    beforeEach(function(done) {
      request(app)
        .put('/api/designations/' + newDesignation._id)
        .send({
          name: 'Updated Designation',
          info: 'This is the updated designation!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDesignation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDesignation = {};
    });

    it('should respond with the updated designation', function() {
      expect(updatedDesignation.name).to.equal('Updated Designation');
      expect(updatedDesignation.info).to.equal('This is the updated designation!!!');
    });

  });

  describe('DELETE /api/designations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/designations/' + newDesignation._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when designation does not exist', function(done) {
      request(app)
        .delete('/api/designations/' + newDesignation._id)
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
