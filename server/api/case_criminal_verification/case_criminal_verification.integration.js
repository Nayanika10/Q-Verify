'use strict';

var app = require('../..');
import request from 'supertest';

var newCaseCriminalVerification;

describe('CaseCriminalVerification API:', function() {

  describe('GET /api/case_criminal_verifications', function() {
    var caseCriminalVerifications;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_criminal_verifications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseCriminalVerifications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(caseCriminalVerifications).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/case_criminal_verifications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/case_criminal_verifications')
        .send({
          name: 'New CaseCriminalVerification',
          info: 'This is the brand new caseCriminalVerification!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCaseCriminalVerification = res.body;
          done();
        });
    });

    it('should respond with the newly created caseCriminalVerification', function() {
      expect(newCaseCriminalVerification.name).to.equal('New CaseCriminalVerification');
      expect(newCaseCriminalVerification.info).to.equal('This is the brand new caseCriminalVerification!!!');
    });

  });

  describe('GET /api/case_criminal_verifications/:id', function() {
    var caseCriminalVerification;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_criminal_verifications/' + newCaseCriminalVerification._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseCriminalVerification = res.body;
          done();
        });
    });

    afterEach(function() {
      caseCriminalVerification = {};
    });

    it('should respond with the requested caseCriminalVerification', function() {
      expect(caseCriminalVerification.name).to.equal('New CaseCriminalVerification');
      expect(caseCriminalVerification.info).to.equal('This is the brand new caseCriminalVerification!!!');
    });

  });

  describe('PUT /api/case_criminal_verifications/:id', function() {
    var updatedCaseCriminalVerification;

    beforeEach(function(done) {
      request(app)
        .put('/api/case_criminal_verifications/' + newCaseCriminalVerification._id)
        .send({
          name: 'Updated CaseCriminalVerification',
          info: 'This is the updated caseCriminalVerification!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCaseCriminalVerification = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCaseCriminalVerification = {};
    });

    it('should respond with the updated caseCriminalVerification', function() {
      expect(updatedCaseCriminalVerification.name).to.equal('Updated CaseCriminalVerification');
      expect(updatedCaseCriminalVerification.info).to.equal('This is the updated caseCriminalVerification!!!');
    });

  });

  describe('DELETE /api/case_criminal_verifications/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/case_criminal_verifications/' + newCaseCriminalVerification._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when caseCriminalVerification does not exist', function(done) {
      request(app)
        .delete('/api/case_criminal_verifications/' + newCaseCriminalVerification._id)
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
