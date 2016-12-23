/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/candidate_maps              ->  index
 * POST    /api/candidate_maps              ->  create
 * GET     /api/candidate_maps/:id          ->  show
 * PUT     /api/candidate_maps/:id          ->  update
 * DELETE  /api/candidate_maps/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import db, {CandidateCase,Candidate,User,CaseType, CaseAddressVerification,Allocation,
  CaseCriminalVerification, CaseEducationVerification, CaseSiteVerification,Company ,Status ,AllocationStatus} from '../../sqldb';

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
export function vendorUploaded(req, res) {
  return CandidateCase.findAll({
      include: [Status],
      where: {status_id: [2, 3, 4]}
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(err => handleError(res, 500, err));
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

function handleError(res, statusCode, err) {
  console.log(err)
  res.status(statusCode).send(err);
}

// Gets a list of CandidateCases
export function index(req, res) {
  return CandidateCase.findAll({
      attributes:[
        'id',
        //'case_address_verification_id',
        //'case_criminal_verification_id',
        //'case_education_verification_id',
        //'case_site_verification_id'
        //'status_id'
      ],
    include: [
      {
        model: Candidate,
        attributes: ['id', 'name'],
        include: [
          {
            model: User,
            attributes: ['id', 'name'],
            include: [
              {
                model: Company,
                attributes: ['id', 'name']
              }
            ]
          },
        ]
      },
      {
        model: Allocation,
        attributes: [
          'id',
          'created_on',
          'internal_status_id'
        ],
        include: [
          {model: Status , attribute: ['id', 'name']},
          {model: User, attributes: ['id', 'name']},
          {model: AllocationStatus}
        ]
      }
    ]

  })
    .then(data => {
      const result = [];
      data.forEach(CandidateCase => {
        const c = CandidateCase.toJSON();
        if (!c.Allocations.length) {
          c.Allocations.push({
            AllocationStatus: { id:0 , name: 'Unallocated' }
          });
        }
        result.push(c);
      });
      return res.json(result);
    })
    .catch(err => handleError(res, 500, err));
}

// Gets a single CandidateCase from the DB
export function show(req, res) {
  return CandidateCase.find({
    where: {
      _id: req.params.id
    },
      include: [
        //{model: CaseCriminalVerification, include: [db.Designation]},
        {model: CaseCriminalVerification},
        {model: CaseAddressVerification, include: [db.HouseType]},
        {model: CaseEducationVerification},
        {model: CaseSiteVerification},
        {model: User, attributes: ['name']},
        //{model: CaseEducationVerification, include: [db.Degree, db.Designation]},
        //{model: CaseSiteVerification, include: [db.Designation]},
      ]
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new CandidateCase in the DB
export function create(req, res) {
  return CandidateCase.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing CandidateCase in the DB
export function update(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  return CandidateCase.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a CandidateCase from the DB
export function destroy(req, res) {
  return CandidateCase.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
