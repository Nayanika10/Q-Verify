'use strict';

var app = require('../..');
import request from 'supertest';

var newCaseType;

describe('CaseType API:', function() {

  describe('GET /api/case_types', function() {
    var caseTypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_types')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseTypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(caseTypes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/case_types', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/case_types')
        .send({
          name: 'New CaseType',
          info: 'This is the brand new caseType!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCaseType = res.body;
          done();
        });
    });

    it('should respond with the newly created caseType', function() {
      expect(newCaseType.name).to.equal('New CaseType');
      expect(newCaseType.info).to.equal('This is the brand new caseType!!!');
    });

  });

  describe('GET /api/case_types/:id', function() {
    var caseType;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_types/' + newCaseType._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseType = res.body;
          done();
        });
    });

    afterEach(function() {
      caseType = {};
    });

    it('should respond with the requested caseType', function() {
      expect(caseType.name).to.equal('New CaseType');
      expect(caseType.info).to.equal('This is the brand new caseType!!!');
    });

  });

  describe('PUT /api/case_types/:id', function() {
    var updatedCaseType;

    beforeEach(function(done) {
      request(app)
        .put('/api/case_types/' + newCaseType._id)
        .send({
          name: 'Updated CaseType',
          info: 'This is the updated caseType!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCaseType = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCaseType = {};
    });

    it('should respond with the updated caseType', function() {
      expect(updatedCaseType.name).to.equal('Updated CaseType');
      expect(updatedCaseType.info).to.equal('This is the updated caseType!!!');
    });

  });

  describe('DELETE /api/case_types/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/case_types/' + newCaseType._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when caseType does not exist', function(done) {
      request(app)
        .delete('/api/case_types/' + newCaseType._id)
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
