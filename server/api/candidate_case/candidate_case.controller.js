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
  res.status(statusCode).send(err);
}

// Gets a list of CandidateCases
export function index(req, res) {
  return CandidateCase.findAll({
      attributes: [
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
        {model: CaseType},
        {
          model: Allocation,
          attributes: [
            'id',
            'created_on',
            'internal_status_id'
          ],
          include: [
            {model: Status, attribute: ['id', 'name']},
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
            AllocationStatus: {id: 0, name: 'Unallocated'}
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
  //if ()
  //const caseIdMap = {
  //  1: ,
  //  2: ,
  //  3: ,
  //  4: ,
  //};
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
        {model: CaseType},
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
  let promise;
  if (req.body.case_type_id === 1) promise = CaseAddressVerification.create(req.body.CaseAddressVerification);
  if (req.body.case_type_id === 2) promise = CaseCriminalVerification.create(req.body.CaseCriminalVerification);
  if (req.body.case_type_id === 3) promise = CaseEducationVerification.create(req.body.CaseEducationVerification);
  if (req.body.case_type_id === 4) promise = CaseSiteVerification.create(req.body.CaseSiteVerification);
  return promise
    .then(item => CandidateCase.create({
      candidate_id: req.body.candidate_id,
      case_id: item.id,
      case_type_id: req.body.case_type_id,
    }))
    .then(candidateCase => res.json(candidateCase))
    .catch(err => handleError(res, 500, err));
}

// Updates an existing CandidateCase in the DB
export function update(req, res) {
  delete req.body.id;
  delete req.body.candidate_id;
  let model;
  let body;
  if (req.body.case_type_id === 1){
    model = CaseAddressVerification;
    body = req.body.CaseAddressVerification;
  }
  if (req.body.case_type_id === 2) {
    model = CaseCriminalVerification;
    body = req.body.CaseCriminalVerification
  }
  if (req.body.case_type_id === 3) {
    model = CaseEducationVerification;
    body = req.body.CaseEducationVerification;
  }
  if (req.body.case_type_id === 4) {
    model = CaseSiteVerification;
    body = req.body.CaseSiteVerification;
  }
  return model.update(body, {where: {id: req.params.id}})
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
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
