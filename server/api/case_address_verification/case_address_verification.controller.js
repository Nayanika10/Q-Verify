/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/case_address_verifications              ->  index
 * POST    /api/case_address_verifications              ->  create
 * GET     /api/case_address_verifications/:id          ->  show
 * PUT     /api/case_address_verifications/:id          ->  update
 * DELETE  /api/case_address_verifications/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {CaseAddressVerification} from '../../sqldb';

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

// Gets a list of CaseAddressVerifications
export function index(req, res) {
  return CaseAddressVerification.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single CaseAddressVerification from the DB
export function show(req, res) {
  return CaseAddressVerification.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new CaseAddressVerification in the DB
export function create(req, res) {
  return CaseAddressVerification.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing CaseAddressVerification in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return CaseAddressVerification.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a CaseAddressVerification from the DB
export function destroy(req, res) {
  return CaseAddressVerification.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
