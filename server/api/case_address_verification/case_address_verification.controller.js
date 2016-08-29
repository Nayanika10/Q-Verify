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
import db, {CaseAddressVerification, Minio, Case} from '../../sqldb';

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

function handleError(res, statusCode, err) {
  console.log(err)
  return res.status(statusCode).send(err);
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

export function getFile(req, res) {
  return CaseAddressVerification.findById(req.params.id).then(caseObj => {
    console.log(caseObj.image)
    if(!caseObj.image) return res.status(404).json({message: 'not found'})
    return Minio.downloadLink({
      object: caseObj.image,
      download: true,
    }).then(link => res.redirect(link))
  }).catch(err => handleError(res, 500, err))
}

// Creates a new CaseAddressVerification in the DB
export function create(req, res) {
  req.body.status_id = 1;
  return db.CaseAddressVerification.create(req.body)
    .then((caseObj) => {
      const { base64:base64String, filename } = req.body.img;
      const extention = filename.substring(filename.lastIndexOf('.') + 1);

      // only upload if valid file extension
      if (~['doc', 'docx', 'pdf', 'rtf', 'txt'].indexOf(extention)) {

        const rangeFolder = caseObj.id - (caseObj.id % 10000);
        const minioObject = {
          // object: 'cases/0/5/5.pdf'
          object: `case_address_verifications/${rangeFolder}/${caseObj.id}/${caseObj.id}.${extention.toLowerCase()}`,
          base64String: base64String,
        }

        return Minio.base64Upload(minioObject).then(re => {
          return caseObj.update({image: minioObject.object}).then(()=>{

            console.log("file saved success")
            return Case.update({status_id:2},{
              where:{id: caseObj.case_id}
            }).then(()=>{
              return res.json(caseObj);
            }).catch(err => handleError(res, 500, err));
          })
        }).catch(err => handleError(res, 500, err));
      }
      return res.json(caseObj);
    })
    .catch(err => handleError(res, 500, err));
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
