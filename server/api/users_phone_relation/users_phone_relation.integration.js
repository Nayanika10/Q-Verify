'use strict';

var app = require('../..');
import request from 'supertest';

var newUsersPhoneRelation;

describe('UsersPhoneRelation API:', function() {

  describe('GET /api/users_phone_relations', function() {
    var usersPhoneRelations;

    beforeEach(function(done) {
      request(app)
        .get('/api/users_phone_relations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usersPhoneRelations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(usersPhoneRelations).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/users_phone_relations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/users_phone_relations')
        .send({
          name: 'New UsersPhoneRelation',
          info: 'This is the brand new usersPhoneRelation!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUsersPhoneRelation = res.body;
          done();
        });
    });

    it('should respond with the newly created usersPhoneRelation', function() {
      expect(newUsersPhoneRelation.name).to.equal('New UsersPhoneRelation');
      expect(newUsersPhoneRelation.info).to.equal('This is the brand new usersPhoneRelation!!!');
    });

  });

  describe('GET /api/users_phone_relations/:id', function() {
    var usersPhoneRelation;

    beforeEach(function(done) {
      request(app)
        .get('/api/users_phone_relations/' + newUsersPhoneRelation._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usersPhoneRelation = res.body;
          done();
        });
    });

    afterEach(function() {
      usersPhoneRelation = {};
    });

    it('should respond with the requested usersPhoneRelation', function() {
      expect(usersPhoneRelation.name).to.equal('New UsersPhoneRelation');
      expect(usersPhoneRelation.info).to.equal('This is the brand new usersPhoneRelation!!!');
    });

  });

  describe('PUT /api/users_phone_relations/:id', function() {
    var updatedUsersPhoneRelation;

    beforeEach(function(done) {
      request(app)
        .put('/api/users_phone_relations/' + newUsersPhoneRelation._id)
        .send({
          name: 'Updated UsersPhoneRelation',
          info: 'This is the updated usersPhoneRelation!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUsersPhoneRelation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUsersPhoneRelation = {};
    });

    it('should respond with the updated usersPhoneRelation', function() {
      expect(updatedUsersPhoneRelation.name).to.equal('Updated UsersPhoneRelation');
      expect(updatedUsersPhoneRelation.info).to.equal('This is the updated usersPhoneRelation!!!');
    });

  });

  describe('DELETE /api/users_phone_relations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/users_phone_relations/' + newUsersPhoneRelation._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when usersPhoneRelation does not exist', function(done) {
      request(app)
        .delete('/api/users_phone_relations/' + newUsersPhoneRelation._id)
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
