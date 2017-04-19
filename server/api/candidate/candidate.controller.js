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
  CaseCriminalVerification, CaseEducationVerification, CaseSiteVerification,Company,
  CandidateCase,Allocation } from '../../sqldb';

//const candidate = req.body
//const candidate  = {
//  "client_id": 3,
//  "user_id": 3,
//  "name": "Manjesh",
//  "address": "Thirthahalli",
//  "phone": "9844717202",
//  "state": "Karnataka",
//  "pin": "577432",
//  "father_name": "Vinayaka",
//  "logo": {"filetype": "application/pdf", "filename": "cast.pdf", "filesize": 37907, "base64": "xyz"},
//  "types": [1]
//}


const CASE_TYPES = {
  ADDRESS: 1,
  CRIMINAL: 2,
  EDUCATION: 3,
  SITE: 4,
}
//const save = {
//  name: candidate.name,
//  address: candidate.address,
//  phone: candidate.phone,
//  state: candidate.state,
//  pin: candidate.pin,
//  logo: candidate.pdf
//}

//if(candidate.types.indexOf(CASE_TYPES.ADDRESS) !== -1) {
//  save.n
//}

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
          model: CandidateCase,
          attributes: [
            'id',
            'case_type_id',
            //'case_criminal_verification_id',
            //'case_education_verification_id',
            //'case_site_verification_id'
          ],

          include: [
            {model: CaseType, attributes: ['id', 'name']},
          ],
        },
        //{model: Status, attributes: ['id', 'name']},
        //{model: CaseType, attributes: ['id', 'name']},
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
  return Candidate.find({
      where: {id: req.params.id},
      include: [{
        model: CandidateCase,
        include: [
          {model: CaseCriminalVerification, where: {'$case_type_id$': 2}, required: false},
          {model: CaseAddressVerification, attributes: ['id'], where: {'$case_type_id$': 1}, required: false},
          {model: CaseEducationVerification, where: {'$case_type_id$': 3}, required: false},
          {model: CaseSiteVerification, where: {'$case_type_id$': 4}, required: false},
        ]
      }, {
        model: User,
        attributes: ['id', 'name'],
        include: {model: Company, attributes: ['id', 'name']}
      }]
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
  return Candidate.findById(req.params.id).then(candidate => {
    return Minio.downloadLink({
      object: candidate.pdf,
      name: `${candidate.id}.pdf`
    }).then(link => res.redirect(link))
  }).catch(err => handleError(res, 500, err))
}

// Creates a new Candidate in the DB
export function create(req, res) {
  return Candidate.create(req.body)
    .then((candidateObj) => {
      const candidate = candidateObj.toJSON();
      if (req.body.logo) {
        /* Start Minio */
        const { base64:base64String, filename } = req.body.logo;
        const extention = filename.substring(filename.lastIndexOf('.') + 1);

        // only upload if valid file extension
        if (~['doc', 'docx', 'pdf', 'rtf', 'txt', 'png', 'jpeg'].indexOf(extention)) {

          const rangeFolder = candidate.id - (candidate.id % 100000);
          const minioObject = {
            // object: 'cases/0/5/5.pdf'
            object: `candidates/${rangeFolder}/${candidate.id}/${candidate.id}.${extention.toLowerCase()}`,
            base64String: base64String,
          }

          // Async
          Minio.base64Upload(minioObject).then(res => {
            return candidateObj.updateAttributes({pdf: minioObject.object})
            console.log("file saved success")
          }).catch(err => console.log(err))
        }

        /* End Minio */
      }
      let casePromises = req.body.types.map(typeId => {
        switch (typeId) {
          case CASE_TYPES.ADDRESS:
            req.body.address = {};
            return CaseAddressVerification.create(req.body.address);
            break;
          case CASE_TYPES.CRIMINAL:
            return CaseCriminalVerification.create(req.body.criminal);
            break;
          case CASE_TYPES.EDUCATION:
            return CaseEducationVerification.create(req.body.education);
            break;
          case CASE_TYPES.SITE:
            return CaseSiteVerification.create(req.body.site);
            break;
        }
      })
      return Promise.all(casePromises).then(cases => {
        const candidateCasePromises = cases.map((caseObj, index) => {
          return CandidateCase.create({
            case_id: caseObj.id,
            case_type_id: req.body.types[index],
            candidate_id: candidate.id,
          });
        });


        return Promise
          .all(candidateCasePromises)
          .then(candidateCases => res.json(candidateCases.map(cc => cc.toJSON())))
          .catch(err => handleError(res, 500, err));
      });
    })
    .catch(err => handleError(res, 500, err));
}

// Updates an existing Candidate in the DB
export function update(req, res) {
  if (req.body._id) delete req.body._id;
  return Candidate.update(req.body, { where: {id: req.params.id}})
    .then(data => res.json(data))
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
  return CandidateCase
    .findAll({
      where: {candidate_id: req.params.id},
    })
    .then(candidateCases => {
      const result = [];
      candidateCases.forEach(candidateCase => {
        if (candidateCase.case_address_verification_id) {
          result.push({
            id: candidateCase.case_address_verification_id,
            name: 'Address Verification',
            case_type_id: 1,
          })
        }
        if (candidateCase.case_criminal_verification_id) {
          result.push({
            id: candidateCase.case_criminal_verification_id,
            name: 'Criminal Verification',
            case_type_id: 2,
          })
        }
        if (candidateCase.case_education_verification_id) {
          result.push({
            id: candidateCase.case_education_verification_id,
            name: 'Education Verification',
            case_type_id: 3,
          })
        }
        if (candidateCase.case_site_verification_id) {
          result.push({
            id: candidateCase.case_site_verification_id,
            name: 'Site Verification',
            case_type_id: 4,
          })
        }
      });
      return res.json(result);
    })
}
