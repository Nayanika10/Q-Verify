/**
 * Created by sif on 9/12/2016.
 */
/**
 * Created by sif on 9/1/2016.
 */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vendors              ->  index
 * POST    /api/vendors              ->  create
 * GET     /api/vendors/:id          ->  show
 * PUT     /api/vendors/:id          ->  update
 * DELETE  /api/vendors/:id          ->  destroy
 */

import _ from 'lodash';
import config from '../../config/environment';
import { User, Company } from '../../sqldb';
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
        user_type_id: 3
      }
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
