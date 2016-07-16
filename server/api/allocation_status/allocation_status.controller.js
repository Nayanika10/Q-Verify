/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/allocation_statuss              ->  index
 * POST    /api/allocation_statuss              ->  create
 * GET     /api/allocation_statuss/:id          ->  show
 * PUT     /api/allocation_statuss/:id          ->  update
 * DELETE  /api/allocation_statuss/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {AllocationStatus} from '../../sqldb';

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
    res.status(statusCode).send(err);
  };
}

// Gets a list of AllocationStatuss
export function index(req, res) {
  return AllocationStatus.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single AllocationStatus from the DB
export function show(req, res) {
  return AllocationStatus.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new AllocationStatus in the DB
export function create(req, res) {
  return AllocationStatus.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing AllocationStatus in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return AllocationStatus.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a AllocationStatus from the DB
export function destroy(req, res) {
  return AllocationStatus.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
