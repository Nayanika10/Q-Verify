'use strict';

var app = require('../..');
import request from 'supertest';

var newCaseAddressVerification;

describe('CaseAddressVerification API:', function() {

  describe('GET /api/case_address_verifications', function() {
    var caseAddressVerifications;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_address_verifications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseAddressVerifications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(caseAddressVerifications).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/case_address_verifications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/case_address_verifications')
        .send({
          name: 'New CaseAddressVerification',
          info: 'This is the brand new caseAddressVerification!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCaseAddressVerification = res.body;
          done();
        });
    });

    it('should respond with the newly created caseAddressVerification', function() {
      expect(newCaseAddressVerification.name).to.equal('New CaseAddressVerification');
      expect(newCaseAddressVerification.info).to.equal('This is the brand new caseAddressVerification!!!');
    });

  });

  describe('GET /api/case_address_verifications/:id', function() {
    var caseAddressVerification;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_address_verifications/' + newCaseAddressVerification._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseAddressVerification = res.body;
          done();
        });
    });

    afterEach(function() {
      caseAddressVerification = {};
    });

    it('should respond with the requested caseAddressVerification', function() {
      expect(caseAddressVerification.name).to.equal('New CaseAddressVerification');
      expect(caseAddressVerification.info).to.equal('This is the brand new caseAddressVerification!!!');
    });

  });

  describe('PUT /api/case_address_verifications/:id', function() {
    var updatedCaseAddressVerification;

    beforeEach(function(done) {
      request(app)
        .put('/api/case_address_verifications/' + newCaseAddressVerification._id)
        .send({
          name: 'Updated CaseAddressVerification',
          info: 'This is the updated caseAddressVerification!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCaseAddressVerification = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCaseAddressVerification = {};
    });

    it('should respond with the updated caseAddressVerification', function() {
      expect(updatedCaseAddressVerification.name).to.equal('Updated CaseAddressVerification');
      expect(updatedCaseAddressVerification.info).to.equal('This is the updated caseAddressVerification!!!');
    });

  });

  describe('DELETE /api/case_address_verifications/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/case_address_verifications/' + newCaseAddressVerification._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when caseAddressVerification does not exist', function(done) {
      request(app)
        .delete('/api/case_address_verifications/' + newCaseAddressVerification._id)
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
