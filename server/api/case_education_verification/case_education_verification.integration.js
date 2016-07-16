'use strict';

var app = require('../..');
import request from 'supertest';

var newCaseEducationVerification;

describe('CaseEducationVerification API:', function() {

  describe('GET /api/case_education_verifications', function() {
    var caseEducationVerifications;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_education_verifications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseEducationVerifications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(caseEducationVerifications).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/case_education_verifications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/case_education_verifications')
        .send({
          name: 'New CaseEducationVerification',
          info: 'This is the brand new caseEducationVerification!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCaseEducationVerification = res.body;
          done();
        });
    });

    it('should respond with the newly created caseEducationVerification', function() {
      expect(newCaseEducationVerification.name).to.equal('New CaseEducationVerification');
      expect(newCaseEducationVerification.info).to.equal('This is the brand new caseEducationVerification!!!');
    });

  });

  describe('GET /api/case_education_verifications/:id', function() {
    var caseEducationVerification;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_education_verifications/' + newCaseEducationVerification._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseEducationVerification = res.body;
          done();
        });
    });

    afterEach(function() {
      caseEducationVerification = {};
    });

    it('should respond with the requested caseEducationVerification', function() {
      expect(caseEducationVerification.name).to.equal('New CaseEducationVerification');
      expect(caseEducationVerification.info).to.equal('This is the brand new caseEducationVerification!!!');
    });

  });

  describe('PUT /api/case_education_verifications/:id', function() {
    var updatedCaseEducationVerification;

    beforeEach(function(done) {
      request(app)
        .put('/api/case_education_verifications/' + newCaseEducationVerification._id)
        .send({
          name: 'Updated CaseEducationVerification',
          info: 'This is the updated caseEducationVerification!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCaseEducationVerification = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCaseEducationVerification = {};
    });

    it('should respond with the updated caseEducationVerification', function() {
      expect(updatedCaseEducationVerification.name).to.equal('Updated CaseEducationVerification');
      expect(updatedCaseEducationVerification.info).to.equal('This is the updated caseEducationVerification!!!');
    });

  });

  describe('DELETE /api/case_education_verifications/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/case_education_verifications/' + newCaseEducationVerification._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when caseEducationVerification does not exist', function(done) {
      request(app)
        .delete('/api/case_education_verifications/' + newCaseEducationVerification._id)
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
