'use strict';

var app = require('../..');
import request from 'supertest';

var newHouseType;

describe('HouseType API:', function() {

  describe('GET /api/house_types', function() {
    var houseTypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/house_types')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          houseTypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(houseTypes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/house_types', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/house_types')
        .send({
          name: 'New HouseType',
          info: 'This is the brand new houseType!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newHouseType = res.body;
          done();
        });
    });

    it('should respond with the newly created houseType', function() {
      expect(newHouseType.name).to.equal('New HouseType');
      expect(newHouseType.info).to.equal('This is the brand new houseType!!!');
    });

  });

  describe('GET /api/house_types/:id', function() {
    var houseType;

    beforeEach(function(done) {
      request(app)
        .get('/api/house_types/' + newHouseType._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          houseType = res.body;
          done();
        });
    });

    afterEach(function() {
      houseType = {};
    });

    it('should respond with the requested houseType', function() {
      expect(houseType.name).to.equal('New HouseType');
      expect(houseType.info).to.equal('This is the brand new houseType!!!');
    });

  });

  describe('PUT /api/house_types/:id', function() {
    var updatedHouseType;

    beforeEach(function(done) {
      request(app)
        .put('/api/house_types/' + newHouseType._id)
        .send({
          name: 'Updated HouseType',
          info: 'This is the updated houseType!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHouseType = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHouseType = {};
    });

    it('should respond with the updated houseType', function() {
      expect(updatedHouseType.name).to.equal('Updated HouseType');
      expect(updatedHouseType.info).to.equal('This is the updated houseType!!!');
    });

  });

  describe('DELETE /api/house_types/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/house_types/' + newHouseType._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when houseType does not exist', function(done) {
      request(app)
        .delete('/api/house_types/' + newHouseType._id)
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
