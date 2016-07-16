'use strict';

var app = require('../..');
import request from 'supertest';

var newCase;

describe('Case API:', function() {

  describe('GET /api/cases', function() {
    var cases;

    beforeEach(function(done) {
      request(app)
        .get('/api/cases')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cases = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cases).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/cases', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cases')
        .send({
          name: 'New Case',
          info: 'This is the brand new case!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCase = res.body;
          done();
        });
    });

    it('should respond with the newly created case', function() {
      expect(newCase.name).to.equal('New Case');
      expect(newCase.info).to.equal('This is the brand new case!!!');
    });

  });

  describe('GET /api/cases/:id', function() {
    var case;

    beforeEach(function(done) {
      request(app)
        .get('/api/cases/' + newCase._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          case = res.body;
          done();
        });
    });

    afterEach(function() {
      case = {};
    });

    it('should respond with the requested case', function() {
      expect(case.name).to.equal('New Case');
      expect(case.info).to.equal('This is the brand new case!!!');
    });

  });

  describe('PUT /api/cases/:id', function() {
    var updatedCase;

    beforeEach(function(done) {
      request(app)
        .put('/api/cases/' + newCase._id)
        .send({
          name: 'Updated Case',
          info: 'This is the updated case!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCase = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCase = {};
    });

    it('should respond with the updated case', function() {
      expect(updatedCase.name).to.equal('Updated Case');
      expect(updatedCase.info).to.equal('This is the updated case!!!');
    });

  });

  describe('DELETE /api/cases/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cases/' + newCase._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when case does not exist', function(done) {
      request(app)
        .delete('/api/cases/' + newCase._id)
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
