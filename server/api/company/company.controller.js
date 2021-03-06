/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/companys              ->  index
 * POST    /api/companys              ->  create
 * GET     /api/companys/:id          ->  show
 * PUT     /api/companys/:id          ->  update
 * DELETE  /api/companys/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import db, {Company,User,UserType} from '../../sqldb';

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

// Gets a list of Companys
export function index(req, res) {
  return Company.findAll({
      attributes: ['id', 'name','created_on','address','user_type_id'],
    include: [UserType]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Company from the DB
export function show(req, res) {
  return Company.find({
    where: {
      id: req.params.id
    },

  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Company in the DB
export function create(req, res) {
  //console.log('Body :'+  req.body);
  return Company.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Company in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Company.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Company from the DB
export function destroy(req, res) {
  return Company.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function companyUsers(req, res) {
  console.log(req.params.id)
  return User.findAll({
    attributes: ['id', 'name','username'],
    where: {
      company_id: req.params.id,
    }
  }).then(users => {
    if (!users) return res.status(404).json({message: "Resource not found"});
    return res.json(users);
  }).catch(err=>console.log(err));
}
