'use strict';

var app = require('../..');
import request from 'supertest';

var newCaseSiteVerification;

describe('CaseSiteVerification API:', function() {

  describe('GET /api/case_site_verifications', function() {
    var caseSiteVerifications;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_site_verifications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseSiteVerifications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(caseSiteVerifications).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/case_site_verifications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/case_site_verifications')
        .send({
          name: 'New CaseSiteVerification',
          info: 'This is the brand new caseSiteVerification!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCaseSiteVerification = res.body;
          done();
        });
    });

    it('should respond with the newly created caseSiteVerification', function() {
      expect(newCaseSiteVerification.name).to.equal('New CaseSiteVerification');
      expect(newCaseSiteVerification.info).to.equal('This is the brand new caseSiteVerification!!!');
    });

  });

  describe('GET /api/case_site_verifications/:id', function() {
    var caseSiteVerification;

    beforeEach(function(done) {
      request(app)
        .get('/api/case_site_verifications/' + newCaseSiteVerification._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caseSiteVerification = res.body;
          done();
        });
    });

    afterEach(function() {
      caseSiteVerification = {};
    });

    it('should respond with the requested caseSiteVerification', function() {
      expect(caseSiteVerification.name).to.equal('New CaseSiteVerification');
      expect(caseSiteVerification.info).to.equal('This is the brand new caseSiteVerification!!!');
    });

  });

  describe('PUT /api/case_site_verifications/:id', function() {
    var updatedCaseSiteVerification;

    beforeEach(function(done) {
      request(app)
        .put('/api/case_site_verifications/' + newCaseSiteVerification._id)
        .send({
          name: 'Updated CaseSiteVerification',
          info: 'This is the updated caseSiteVerification!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCaseSiteVerification = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCaseSiteVerification = {};
    });

    it('should respond with the updated caseSiteVerification', function() {
      expect(updatedCaseSiteVerification.name).to.equal('Updated CaseSiteVerification');
      expect(updatedCaseSiteVerification.info).to.equal('This is the updated caseSiteVerification!!!');
    });

  });

  describe('DELETE /api/case_site_verifications/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/case_site_verifications/' + newCaseSiteVerification._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when caseSiteVerification does not exist', function(done) {
      request(app)
        .delete('/api/case_site_verifications/' + newCaseSiteVerification._id)
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
