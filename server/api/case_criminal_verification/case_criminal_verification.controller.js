/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/case_criminal_verifications              ->  index
 * POST    /api/case_criminal_verifications              ->  create
 * GET     /api/case_criminal_verifications/:id          ->  show
 * PUT     /api/case_criminal_verifications/:id          ->  update
 * DELETE  /api/case_criminal_verifications/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {CaseCriminalVerification, Candidate} from '../../sqldb';

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

// Gets a list of CaseCriminalVerifications
export function index(req, res) {
  return CaseCriminalVerification.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single CaseCriminalVerification from the DB
export function show(req, res) {
  return CaseCriminalVerification
    .find({ where: { id: req.params.id }})
    .then(data => res.json(data))
    .catch(handleError(res));
}

// Creates a new CaseCriminalVerification in the DB
export function create(req, res) {
  return CaseCriminalVerification.create(req.body)
    .then(caseTypeObj=> {
      return Candidate.update({status_id:2},{
        where:{id: caseTypeObj.candidate_id}
      }).then(()=>{
        return res.json(caseTypeObj);
      })
    })
    .catch(handleError(res));
}

// Updates an existing CaseCriminalVerification in the DB
export function update(req, res) {
  return CaseCriminalVerification
    .update(req.body, { where: {id: req.params.id}})
    .then(data => res.json(data))
    .catch(handleError(res));
}

// Deletes a CaseCriminalVerification from the DB
export function destroy(req, res) {
  return CaseCriminalVerification.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
