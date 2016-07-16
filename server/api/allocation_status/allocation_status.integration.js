'use strict';

var app = require('../..');
import request from 'supertest';

var newAllocationStatus;

describe('AllocationStatus API:', function() {

  describe('GET /api/allocation_statuss', function() {
    var allocationStatuss;

    beforeEach(function(done) {
      request(app)
        .get('/api/allocation_statuss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          allocationStatuss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(allocationStatuss).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/allocation_statuss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/allocation_statuss')
        .send({
          name: 'New AllocationStatus',
          info: 'This is the brand new allocationStatus!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAllocationStatus = res.body;
          done();
        });
    });

    it('should respond with the newly created allocationStatus', function() {
      expect(newAllocationStatus.name).to.equal('New AllocationStatus');
      expect(newAllocationStatus.info).to.equal('This is the brand new allocationStatus!!!');
    });

  });

  describe('GET /api/allocation_statuss/:id', function() {
    var allocationStatus;

    beforeEach(function(done) {
      request(app)
        .get('/api/allocation_statuss/' + newAllocationStatus._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          allocationStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      allocationStatus = {};
    });

    it('should respond with the requested allocationStatus', function() {
      expect(allocationStatus.name).to.equal('New AllocationStatus');
      expect(allocationStatus.info).to.equal('This is the brand new allocationStatus!!!');
    });

  });

  describe('PUT /api/allocation_statuss/:id', function() {
    var updatedAllocationStatus;

    beforeEach(function(done) {
      request(app)
        .put('/api/allocation_statuss/' + newAllocationStatus._id)
        .send({
          name: 'Updated AllocationStatus',
          info: 'This is the updated allocationStatus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAllocationStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAllocationStatus = {};
    });

    it('should respond with the updated allocationStatus', function() {
      expect(updatedAllocationStatus.name).to.equal('Updated AllocationStatus');
      expect(updatedAllocationStatus.info).to.equal('This is the updated allocationStatus!!!');
    });

  });

  describe('DELETE /api/allocation_statuss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/allocation_statuss/' + newAllocationStatus._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when allocationStatus does not exist', function(done) {
      request(app)
        .delete('/api/allocation_statuss/' + newAllocationStatus._id)
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
