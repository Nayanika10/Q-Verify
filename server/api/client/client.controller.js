/**
 * Created by sif on 9/1/2016.
 */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/clients              ->  index
 * POST    /api/clients              ->  create
 * GET     /api/clients/:id          ->  show
 * PUT     /api/clients/:id          ->  update
 * DELETE  /api/clients/:id          ->  destroy
 */

import _ from 'lodash';
import config from '../../config/environment';
import { User, Company, Candidate } from '../../sqldb';
var rp = require('request-promise');

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

export function index(req, res) {
  return Company.findAll({
      attributes: [ 'id', 'name'],
      where: {
        user_type_id: 2
      }
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function candidates(req, res) {
  return Candidate
    .findAll({
      include: [{
        model: User,
        where: { company_id: req.params.id },
      }]
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
}
