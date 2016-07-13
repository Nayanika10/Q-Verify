'use strict';

var app = require('../..');
import request from 'supertest';

var newCompany;

describe('Company API:', function() {

  describe('GET /api/companys', function() {
    var companys;

    beforeEach(function(done) {
      request(app)
        .get('/api/companys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          companys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(companys).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/companys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/companys')
        .send({
          name: 'New Company',
          info: 'This is the brand new company!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCompany = res.body;
          done();
        });
    });

    it('should respond with the newly created company', function() {
      expect(newCompany.name).to.equal('New Company');
      expect(newCompany.info).to.equal('This is the brand new company!!!');
    });

  });

  describe('GET /api/companys/:id', function() {
    var company;

    beforeEach(function(done) {
      request(app)
        .get('/api/companys/' + newCompany._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          company = res.body;
          done();
        });
    });

    afterEach(function() {
      company = {};
    });

    it('should respond with the requested company', function() {
      expect(company.name).to.equal('New Company');
      expect(company.info).to.equal('This is the brand new company!!!');
    });

  });

  describe('PUT /api/companys/:id', function() {
    var updatedCompany;

    beforeEach(function(done) {
      request(app)
        .put('/api/companys/' + newCompany._id)
        .send({
          name: 'Updated Company',
          info: 'This is the updated company!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCompany = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompany = {};
    });

    it('should respond with the updated company', function() {
      expect(updatedCompany.name).to.equal('Updated Company');
      expect(updatedCompany.info).to.equal('This is the updated company!!!');
    });

  });

  describe('DELETE /api/companys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/companys/' + newCompany._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when company does not exist', function(done) {
      request(app)
        .delete('/api/companys/' + newCompany._id)
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
