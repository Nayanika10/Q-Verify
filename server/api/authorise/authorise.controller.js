/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/authorise              ->  index
 * POST    /api/authorise              ->  create
 * GET     /api/authorise/:id          ->  show
 * PUT     /api/authorise/:id          ->  update
 * DELETE  /api/authorise/:id          ->  destroy
 */

import { App } from '../../sqldb';
import oAuth from '../../components/oauthjs';

function handleError(res, argStatusCode, err) {
  const statusCode = argStatusCode || 500;
  return res.status(statusCode).json(err);
}

export function index(req, res) {
  return App.findOne({
    where: {
      client_id: req.query.client_id,
      redirect_uri: req.query.redirect_uri,
    },
    attributes: ['id', 'name'],
  })
    .then(model => {
      if (!model) return res.status(404).json({ error: 'Invalid Client' });
      return res.json(model);
    })
    .catch(err => handleError(res, 500, err));
}

exports.create = oAuth.authCodeGrant((req, callback) => {
  if (req.body.allow !== 'true') return callback(null, false);
  return callback(null, true, req.user);
});
