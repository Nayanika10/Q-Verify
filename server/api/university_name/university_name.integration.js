'use strict';

var app = require('../..');
import request from 'supertest';

var newUniversityName;

describe('UniversityName API:', function() {

  describe('GET /api/university_names', function() {
    var universityNames;

    beforeEach(function(done) {
      request(app)
        .get('/api/university_names')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          universityNames = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(universityNames).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/university_names', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/university_names')
        .send({
          name: 'New UniversityName',
          info: 'This is the brand new universityName!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUniversityName = res.body;
          done();
        });
    });

    it('should respond with the newly created universityName', function() {
      expect(newUniversityName.name).to.equal('New UniversityName');
      expect(newUniversityName.info).to.equal('This is the brand new universityName!!!');
    });

  });

  describe('GET /api/university_names/:id', function() {
    var universityName;

    beforeEach(function(done) {
      request(app)
        .get('/api/university_names/' + newUniversityName._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          universityName = res.body;
          done();
        });
    });

    afterEach(function() {
      universityName = {};
    });

    it('should respond with the requested universityName', function() {
      expect(universityName.name).to.equal('New UniversityName');
      expect(universityName.info).to.equal('This is the brand new universityName!!!');
    });

  });

  describe('PUT /api/university_names/:id', function() {
    var updatedUniversityName;

    beforeEach(function(done) {
      request(app)
        .put('/api/university_names/' + newUniversityName._id)
        .send({
          name: 'Updated UniversityName',
          info: 'This is the updated universityName!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUniversityName = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUniversityName = {};
    });

    it('should respond with the updated universityName', function() {
      expect(updatedUniversityName.name).to.equal('Updated UniversityName');
      expect(updatedUniversityName.info).to.equal('This is the updated universityName!!!');
    });

  });

  describe('DELETE /api/university_names/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/university_names/' + newUniversityName._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when universityName does not exist', function(done) {
      request(app)
        .delete('/api/university_names/' + newUniversityName._id)
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
