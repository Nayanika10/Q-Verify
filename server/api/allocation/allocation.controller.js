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
import db, {Allocation, Case, minio} from '../../sqldb';

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
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Allocations
export function index(req, res) {
  if (!req.user.id)
    return res.status(404).json([{message: "not authorized"}]);
  let whereClause;
  if(req.user.Company.user_type_id != 1) {
    whereClause = {
      user_id: req.user.id
    };
  }
  return Allocation.findAll({
      where: whereClause,
      include: [
        {
          model: Case,
          include: [db.User, db.Status, db.CaseType]
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
    .then(allocation => {
      Case.update({status_id: 1}, {
        where: {
          id: req.body.case_id
        }
      }).then(() => res.json(allocation))
    })
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

// Gets a list of Allocations
export function vendorUpload(req, res) {
  if (!req.user.id)
    return res.status(404).json([{message: "not authorized"}]);
  return Allocation.findAll({
      where: {
        user_id: req.user.id
      },
      include: [
        {
          model: Case,
          where: {status_id: 3},
          include: [db.User, db.Status, db.CaseType]
        },
        {model: db.User},
        {model: db.AllocationStatus}
      ]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function byStatusId(req, res) {
  if (!req.user.id)
    return res.status(404).json([{message: "not authorized"}]);
  if(!req.params.status_id)
    return res.status(404).json([{message: "Invalid request"}]);
  let whereClause;
  if(req.user.Company.user_type_id != 1) {
    whereClause = {
      user_id: req.user.id
    };
  }
  return Allocation.findAll({
      where: whereClause,
      include: [
        {
          model: Case,
          where: {status_id: req.params.status_id.split(',')},
          include: [db.User, db.Status, db.CaseType]
        },
        {model: db.User},
        {model: db.AllocationStatus}
      ]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
