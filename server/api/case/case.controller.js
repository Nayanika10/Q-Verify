/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cases              ->  index
 * POST    /api/cases              ->  create
 * GET     /api/cases/:id          ->  show
 * PUT     /api/cases/:id          ->  update
 * DELETE  /api/cases/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Case} from '../../sqldb';

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

// Gets a list of Cases
export function index(req, res) {
  return Case.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Case from the DB
export function show(req, res) {
  return Case.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Case in the DB
export function create(req, res) {
  return Case.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Case in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Case.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Case from the DB
export function destroy(req, res) {
  return Case.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
