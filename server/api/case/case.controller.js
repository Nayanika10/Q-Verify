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
import db, {Case} from '../../sqldb';

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
  console.log(req.body);
  req.body.status_id = 1;
  return Case.create(req.body)
    .then((item)=> {
      switch (req.body.case_type_id) {
        case 1:
          req.body.address = {};
          req.body.address.case_id = item.id;
          db.CaseAddressVerification.create(req.body.address)
            .then(()=>{
              return res.json(item);
            })
            .catch(handleError(res));
          break;
        case 2:
          req.body.criminal.case_id = item.id;
          db.CaseCriminalVerification.create(req.body.criminal)
            .then(()=>{
              return res.json(item);
            })
            .catch(handleError(res));
          break;
        case 3:
          req.body.education.case_id = item.id;
          db.CaseEducationVerification.create(req.body.education)
            .then(()=>{
              return res.json(item);
            })
            .catch(handleError(res));
          break;
        case 4:
          req.body.site.case_id = item.id;
          db.CaseSiteVerification.create(req.body.site)
            .then(()=>{
              return res.json(item);
            })
            .catch(handleError(res));
          break;
      }
    })
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
