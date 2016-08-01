/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/case_education_verifications              ->  index
 * POST    /api/case_education_verifications              ->  create
 * GET     /api/case_education_verifications/:id          ->  show
 * PUT     /api/case_education_verifications/:id          ->  update
 * DELETE  /api/case_education_verifications/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Case, CaseEducationVerification} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of CaseEducationVerifications
export function index(req, res) {
  return CaseEducationVerification.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single CaseEducationVerification from the DB
export function show(req, res) {
  return CaseEducationVerification.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new CaseEducationVerification in the DB
export function create(req, res) {
  return CaseEducationVerification.create(req.body)
    .then(caseTypeObj=> {
      return Case.update({status_id:2},{
        where:{id: caseTypeObj.case_id}
      }).then(()=>{
        return res.json(caseTypeObj);
      })
    })
    .catch(handleError(res));
}

// Updates an existing CaseEducationVerification in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return CaseEducationVerification.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a CaseEducationVerification from the DB
export function destroy(req, res) {
  return CaseEducationVerification.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
