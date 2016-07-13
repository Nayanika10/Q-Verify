'use strict';

var app = require('../..');
import request from 'supertest';

var newUserType;

describe('UserType API:', function() {

  describe('GET /api/user_types', function() {
    var userTypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_types')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userTypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(userTypes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/user_types', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/user_types')
        .send({
          name: 'New UserType',
          info: 'This is the brand new userType!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUserType = res.body;
          done();
        });
    });

    it('should respond with the newly created userType', function() {
      expect(newUserType.name).to.equal('New UserType');
      expect(newUserType.info).to.equal('This is the brand new userType!!!');
    });

  });

  describe('GET /api/user_types/:id', function() {
    var userType;

    beforeEach(function(done) {
      request(app)
        .get('/api/user_types/' + newUserType._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userType = res.body;
          done();
        });
    });

    afterEach(function() {
      userType = {};
    });

    it('should respond with the requested userType', function() {
      expect(userType.name).to.equal('New UserType');
      expect(userType.info).to.equal('This is the brand new userType!!!');
    });

  });

  describe('PUT /api/user_types/:id', function() {
    var updatedUserType;

    beforeEach(function(done) {
      request(app)
        .put('/api/user_types/' + newUserType._id)
        .send({
          name: 'Updated UserType',
          info: 'This is the updated userType!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUserType = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserType = {};
    });

    it('should respond with the updated userType', function() {
      expect(updatedUserType.name).to.equal('Updated UserType');
      expect(updatedUserType.info).to.equal('This is the updated userType!!!');
    });

  });

  describe('DELETE /api/user_types/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/user_types/' + newUserType._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userType does not exist', function(done) {
      request(app)
        .delete('/api/user_types/' + newUserType._id)
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
