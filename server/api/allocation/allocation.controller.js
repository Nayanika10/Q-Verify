/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/allocations              ->  index
 * POST    /api/allocations              ->  create
 * GET     /api/allocations/:id          ->  show
 * PUT     /api/allocations/:id          ->  update
 * DELETE  /api/allocations/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import db, {Allocation, Case} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Allocations
export function index(req, res) {
  return Allocation.findAll({
      include: [
        {
          model: Case,
          include: [{model: db.User}]
        },
        {model: db.User},
        {model: db.AllocationStatus}
      ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Allocation from the DB
export function show(req, res) {
  return Allocation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Allocation in the DB
export function create(req, res) {
  req.body.allocation_status_id = 1;
  return Allocation.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Allocation in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Allocation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Allocation from the DB
export function destroy(req, res) {
  return Allocation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
