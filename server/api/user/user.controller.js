/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import config from '../../config/environment';
import {User, Company} from '../../sqldb';
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

// Gets a list of Users
export function index(req, res) {
  return User.findAll({
    attributes: ['id', 'name'],
    where: whereClause,
    include: [
      { model: Company, attributes:['name']},
       ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single User from the DB
export function show(req, res) {
  return User.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new User in the DB
export function create(req, res) {

  return User.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing User in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return User.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
  return User.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Creates a new User in the DB
export function login(req, res) {
  //console.log(req.params);
  //console.log(req.query);
  //console.log(req.body);
  if (!req.body) return handleError(res, 400, {message: "Bad Request"})
  return User.find({
    where: {username: req.body.username},
    include: [{model: Company}]
  }).then((user)=> {
    const oAuthChatOptions = {
      method: 'POST',
      url: `${config.DOMAIN}/oauth/token`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      auth: {
        user: 'accounts',
        pass: 'accountssecret',
      },
      form: {
        grant_type: 'password',
        username: req.body.username,
        password: req.body.password,
      }
    };
    rp(oAuthChatOptions).then((body)=> {
      return res.json(body);
    }).catch((err)=> {
      return res.status(500).send(err);
    });
  }).catch((err)=> {
    console.log(err);
    return res.status(500).send(err);
  });
}
export function register(req, res) {
  //console.log(req.params);
  //console.log(req.query);
  //console.log(req.body);
  return User.create(
    req.body
  ).then((user)=> {
    return res.json(user);
  }).catch((err)=> {
    console.log(err);
    return res.status(404).json(err)
  });
}

export function client(req, res) {
  return User.findAll({
      include: [{model: Company,where: {user_type_id:2}}]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function vendor(req, res) {
  return User.findAll({
      include: [{model: Company,where: {user_type_id:3}}]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Users
export function me(req, res) {
  return res.json(req.user || {message: "not authorized"})
}
