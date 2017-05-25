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
import db, {CaseAddressVerification, Minio, Candidate} from '../../sqldb';

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
  return CaseAddressVerification
    .find({where: {id: req.params.id}})
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
}

export function getFile(req, res) {
  return CaseAddressVerification.findById(req.params.id).then(caseaddressverificationObj => {
    console.log(caseaddressverificationObj.image)
    if(!caseaddressverificationObj.image) return res.status(404).json({message: 'not found'})
    return Minio.downloadLink({
      object: caseaddressverificationObj.image,
      name: `${caseaddressverificationObj.id}.pdf`,
      download: true,
    }).then(link => res.redirect(link))
  }).catch(err => handleError(res, 500, err))
}


export function create(req, res) {
  return CaseAddressVerification.create(req.body)
    .then(caseTypeObj=> {
      return Candidate.update({status_id:2},{
        where:{id: caseTypeObj.candidate_id}
      }).then(()=>{
        return res.json(caseTypeObj);
      })
    })
    .catch(handleError(res));
}
 //Creates a new CaseAddressVerification in the DB
//export function create(req, res) {
//  return db.CaseAddressVerification.create(req.body)
//    .then((candidateObj) => {
//      const { base64:base64String, filename } = req.body.img;
//      //console.log('filename')
//      const extention = filename.substring(filename.lastIndexOf('.') + 1);
//
//      // only upload if valid file extension
//      if (~['doc', 'docx', 'pdf', 'rtf', 'txt', 'png'].indexOf(extention)) {
//
//        const rangeFolder = candidateObj.id - (candidateObj.id % 100000);
//        const minioObject = {
//          // object: 'cases/0/5/5.pdf'
//          object: `case_address_verifications/${rangeFolder}/${candidateObj.id}/${candidateObj.id}.${extention.toLowerCase()}`,
//          base64String: base64String,
//        }
//
//        Minio.base64Upload(minioObject).then(res => {
//          return candidateObj.updateAttributes({image: minioObject.object}).then(()=>{
//            console.log("file saved success")
//            return Candidate.update({status_id:2},{
//              where:{id: candidateObj.candidate_id}
//            }).then(()=>{
//              return res.json(candidateObj);
//            }).catch(err => handleError(res, 500, err));
//          })
//        }).catch(err => handleError(res, 500, err));
//      }
//      return Candidate.update({status_id:2},{
//        where:{id: candidateObj.candidate_id}
//      }).then(()=>{
//        return res.json(candidateObj);
//      }).catch(err => handleError(res, 500, err));;
//    })
//    .catch(err => handleError(res, 500, err));
//}


 //Updates an existing CaseAddressVerification in the DB
export function update(req, res) {
  //req.body.status_id = 1;
  return CaseAddressVerification
    .update(
      req.body,
      { where: {id: req.params.id} })
      .then(() => CaseAddressVerification.find({
        where: {
          id: req.params.id
        }
      })
    .then((caseaddressverificationObj) => {
      const case_address_verifications = caseaddressverificationObj.toJSON();
      if (req.body.img) {
        /* Start Minio */
        const { base64:base64String, filename } = req.body.img;
        const extention = filename.substring(filename.lastIndexOf('.') + 1);

        // only upload if valid file extension
        if (~['doc', 'docx', 'pdf', 'rtf', 'txt', 'png'].indexOf(extention)) {

          const rangeFolder = caseaddressverificationObj.id - (caseaddressverificationObj.id % 100000);
          const minioObject = {
            // object: 'cases/0/5/5.pdf'
            object: `case_address_verifications/${rangeFolder}/${caseaddressverificationObj.id}/${caseaddressverificationObj.id}.${extention.toLowerCase()}`,
            base64String: base64String,
          }
          Minio.base64Upload(minioObject).then(res => {
            return caseaddressverificationObj.updateAttributes({image: minioObject.object}).then(()=> {
              return Candidate.update({status_id: 2}, {
                where: {id: caseaddressverificationObj.case_address_verification_id}
              }).then(()=> {
                return res.json(caseaddressverificationObj);
                console.log("file saved success")
                }).catch(err => handleError(res));
            })
          }).catch(err => handleError(res));
        }
      }
      return CaseAddressVerificationComponent.update({status_id:2},{
        where:{id: caseaddressverificationObj.case_address_verification_id}
      }).then(()=>{
        return res.json(caseaddressverificationObj);
      }).catch(err => handleError(res));;
    }))
    //.then(data => res.json(data))
    .catch(err => res.json(err));

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
