/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/candidates              ->  index
 * POST    /api/candidates              ->  create
 * GET     /api/candidates/:id          ->  show
 * PUT     /api/candidates/:id          ->  update
 * DELETE  /api/candidates/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import db, { Candidate,User, CaseType,Status, Minio, CaseAddressVerification,
  CaseCriminalVerification, CaseEducationVerification, CaseSiteVerification,Company, CandidateMap,Allocation } from '../../sqldb';

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
  statusCode = statusCode || 500;
  console.log(err)
  res.status(statusCode).send(err);

}

// Gets a list of Candidates
export function index(req, res) {
  if (!req.user)
    return res.status(404).json([{message: "not authorized"}]);
  let whereClause;
  if (req.user.Company.user_type_id != 1) {
    whereClause = {
      user_id: req.user.id
    };
  }
  return Candidate.findAll({
      attributes: ['id', 'name', 'created_at', 'updated_at'],
      where: whereClause,
      order: 'created_at DESC',
      include: [
        {
          model: CandidateMap,
          attributes:[
            'id',
            'case_address_verification_id',
            'case_criminal_verification_id',
            'case_education_verification_id',
            'case_site_verification_id'
          ],

          //include: [
          //  {model: CaseAddressVerification, attributes: ['id']},
          //  {model: CaseCriminalVerification, attributes: ['id']},
          //  {model: CaseEducationVerification, attributes: ['id']},
          //  {model: CaseSiteVerification, attributes: ['id']},
          //],
        },
        //{model: Status, attributes: ['id', 'name']},
        {model: User, attributes: ['id', 'name'], include: {model: Company, attributes: ['id', 'name']}},
        //{
        //  model: Allocation,
        //  attributes: [
        //    'id',
        //    'case_address_verification_id',
        //    'case_criminal_verification_id',
        //    'case_education_verification_id',
        //    'case_site_verification_id',
        //    'created_on'
        //  ],
        //  include: [{ model: User, attributes:['id','name']}], required: false },
      ]
    })
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}

// Gets a single Candidate from the DB
export function show(req, res) {
  return CandidateMap.find({
      where: {
        candidate_id: req.params.id
      },
      include: [
        {model: Candidate},
        {model: CaseCriminalVerification},
        {model: CaseAddressVerification, include: [db.HouseType]},
        {model: CaseEducationVerification},
        {model: CaseSiteVerification},
        {model: Allocation,include:[{model:Status,attributes:['id','name']}] },
      ]
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(err => handleError(res, 500, err));
}
export function vendorUploaded(req, res) {
  return Candidate.findAll({
      include: [Status],
      where: {status_id: [2, 3, 4]}
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(err => handleError(res, 500, err));
}


export function getFile(req, res) {
  return Candidate.findById(req.params.id).then(candidateObj => {
    return Minio.downloadLink({
      object: candidateObj.pdf,
      name: `${candidateObj.id}.pdf`
    }).then(link => res.redirect(link))
  }).catch(err => handleError(res, 500, err))
}

// Creates a new Candidate in the DB
export function create(req, res) {
  return Candidate.create(req.body)
    .then((candidateObj) => {
      candidateObj = candidateObj.toJSON();
      if (req.body.logo) {
        /* Start Minio */
        const { base64:base64String, filename } = req.body.logo;
        const extention = filename.substring(filename.lastIndexOf('.') + 1);

      // only upload if valid file extension
        if (~['doc', 'docx', 'pdf', 'rtf', 'txt', 'png', 'jpeg'].indexOf(extention)) {

          const rangeFolder = candidateObj.id - (candidateObj.id % 100000);
          const minioObject = {
            // object: 'cases/0/5/5.pdf'
            object: `candidates/${rangeFolder}/${candidateObj.id}/${candidateObj.id}.${extention.toLowerCase()}`,
            base64String: base64String,
          }

          // Async
          Minio.base64Upload(minioObject).then(res => {
            return candidateObj.update({pdf: minioObject.object})
            console.log("file saved success")
          }).catch(err => console.log(err))
        }

        /* End Minio */
      }
      let casePromise = [];
      for (let i = 0; i < req.body.types.length; i++) {
        switch (req.body.types[i]) {
          case 1:
            req.body.address = {};
            casePromise.push(CaseAddressVerification.create(req.body.address));
            break;
          case 2:
            casePromise.push(CaseCriminalVerification.create(req.body.criminal));
            break;
          case 3:
            casePromise.push(CaseEducationVerification.create(req.body.education));
            break;
          case 4:
            casePromise.push(CaseSiteVerification.create(req.body.site));
            break;
        }
      }
      return Promise.all(casePromise).then(resultArray => {
        const candidateMapPromises = [];
        const candidateMap = { candidate_id: candidateObj.id };
        for (let i = 0; i < req.body.types.length; i++) {
          switch (req.body.types[i]) {
            case 1:
              candidateMapPromises.push(CandidateMap.create(Object.assign({
                case_address_verification_id: resultArray[i].id,
              }, candidateMap)));
              break;
            case 2:
              candidateMapPromises.push(CandidateMap.create(Object.assign({
                case_criminal_verification_id: resultArray[i].id,
              }, candidateMap)));
              break;
            case 3:
              candidateMapPromises.push(CandidateMap.create(Object.assign({
                case_education_verification_id: resultArray[i].id,
              }, candidateMap)));
              break;
            case 4:
              candidateMapPromises.push(CandidateMap.create(Object.assign({
                case_site_verification_id: resultArray[i].id,
              }, candidateMap)));
              break;

          }
        }
        return Promise
          .all(candidateMapPromises)
          .then(data => res.json(data))
          .catch(err => handleError(res, 500, err));
      });
    })
    .catch(err => handleError(res, 500, err));
}

// Updates an existing Candidate in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Candidate.find({
      where: {
        id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(err => handleError(res, 500, err));
}

// Deletes a Candidate from the DB
export function destroy(req, res) {
  return Candidate.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(err => handleError(res, 500, err));
}

export function caseTypes(req, res) {
  return CandidateMap
    .findAll({
      where: { candidate_id: req.params.id },
    })
    .then(candidateMaps => {
      const result = [];
      candidateMaps.forEach(candidateMap => {
        if (candidateMap.case_address_verification_id) {
          result.push({
            id: candidateMap.case_address_verification_id,
            name: 'Address Verification',
            case_type_id: 1,
          })
        }
        if (candidateMap.case_criminal_verification_id) {
          result.push({
            id: candidateMap.case_criminal_verification_id,
            name: 'Criminal Verification',
            case_type_id: 2,
          })
        }
        if (candidateMap.case_education_verification_id) {
          result.push({
            id: candidateMap.case_education_verification_id,
            name: 'Education Verification',
            case_type_id: 3,
          })
        }
        if (candidateMap.case_site_verification_id) {
          result.push({
            id: candidateMap.case_site_verification_id,
            name: 'Site Verification',
            case_type_id: 4,
          })
        }
      });
      return res.json(result);
    })
}
