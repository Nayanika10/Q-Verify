/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/house_types              ->  index
 * POST    /api/house_types              ->  create
 * GET     /api/house_types/:id          ->  show
 * PUT     /api/house_types/:id          ->  update
 * DELETE  /api/house_types/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {HouseType} from '../../sqldb';

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

// Gets a list of HouseTypes
export function index(req, res) {
  return HouseType.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single HouseType from the DB
export function show(req, res) {
  return HouseType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new HouseType in the DB
export function create(req, res) {
  return HouseType.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing HouseType in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return HouseType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a HouseType from the DB
export function destroy(req, res) {
  return HouseType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
