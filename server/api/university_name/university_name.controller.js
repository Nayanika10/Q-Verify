/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/university_names              ->  index
 * POST    /api/university_names              ->  create
 * GET     /api/university_names/:id          ->  show
 * PUT     /api/university_names/:id          ->  update
 * DELETE  /api/university_names/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {UniversityName} from '../../sqldb';

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

// Gets a list of UniversityNames
export function index(req, res) {
  return UniversityName.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single UniversityName from the DB
export function show(req, res) {
  return UniversityName.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new UniversityName in the DB
export function create(req, res) {
  return UniversityName.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing UniversityName in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return UniversityName.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a UniversityName from the DB
export function destroy(req, res) {
  return UniversityName.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
