/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/allocations              ->  index
 * POST    /api/allocations              ->  create
 * GET     /api/allocations/:id          ->  show
 * PUT     /api/allocations/:id          ->  update
 * DELETE  /api/allocations/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import db, {Allocation,minio,CandidateMap,User,Company,Candidate,AllocationStatus,
  CaseSiteVerification,CaseAddressVerification,CaseCriminalVerification,
  CaseEducationVerification} from '../../sqldb';

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
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Allocations
export function index(req, res) {
  if (!req.user.id)
    return res.status(404).json([{message: "not authorized"}]);
  let whereClause;
  if(req.user.Company.user_type_id != 1) {
    whereClause = {
      user_id: req.user.id
    };
  }
  return Allocation.findAll({
      where: whereClause,
      include: [
        {
          //model: Candidate,attributes:['id','name'],
          //include: [db.User, db.Status, db.CaseType]
          model: db.CandidateMap,include:[{model: db.Candidate, attributes: ['id', 'name'],
          include: [
            {
              model: db.User,
              attributes: ['id', 'name'],
              include: [
                {
                  model: db.Company,
                  attributes: ['id', 'name']
                }
              ]
            }

          ]
        }
          ]
        },
        {model: db.User, attributes:['id','name']},
        {model: db.AllocationStatus},
        {model: db.Status, attributes:['id','name']},

      ]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Allocation from the DB
export function show(req, res) {
  return Allocation
    .find({
      where: {
        id: req.params.id
      },
      include:[{model: CandidateMap, include:[
        {model: Candidate},
        {model:CaseCriminalVerification},
        {model: CaseAddressVerification},
        {model: CaseEducationVerification},
        {model: CaseSiteVerification},
      ]
      }]
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
}

// Creates a new Allocation in the DB
export function create(req, res) {
  req.body.allocation_status_id = 1;
  req.body.status_id = 1;
  const {
    candidate_id,
    case_criminal_verification_id,
    case_address_verification_id,
    case_education_verification_id,
    case_site_verification_id,
    } = req.body;
  const where = { candidate_id: req.body.candidate_id};
  if (req.body.case_criminal_verification_id) {
    where.case_criminal_verification_id = req.body.case_criminal_verification_id;
  }
  if (req.body.case_address_verification_id) {
    where.case_address_verification_id = req.body.case_address_verification_id;
  }
  if (req.body.case_education_verification_id) {
    where.case_education_verification_id = req.body.case_education_verification_id;
  }
  if (req.body.case_site_verification_id) {
    where.case_site_verification_id = req.body.case_site_verification_id;
  }
  return CandidateMap
    .find({ where })
    .then(candidateMap => {
      req.body.candidate_map_id = candidateMap.id;
      return Allocation
        .create(req.body)
        .then(allocation => res.json(allocation));
    })
    .catch(handleError(res));
}

// Updates an existing Allocation in the DB
export function update(req, res) {
  return Allocation
    .update(req.body, {where: {id: req.params.id}})
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
}

// Deletes a Allocation from the DB
export function destroy(req, res) {
  return Allocation.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets a list of Allocations
export function vendorUpload(req, res) {
  if (!req.user.id)
    return res.status(404).json([{message: "not authorized"}]);
  return Allocation.findAll({
      where: {
        user_id: req.user.id
      },
      include: [
        {
          model: db.CandidateMap,include:[{model: db.Candidate,
          attributes:['id','name'],
          include : [
            {
              model: db.User,
              attributes: ['id', 'name'],
              include : [
                {
                  model: db.Company,
                  attributes: ['id', 'name']
                }
              ]
            },
            ]

        }]
          //where: {status_id: 3},
          //include: [db.User, db.Status, db.CaseType]
        },
        {model: db.User},
        {model: db.AllocationStatus}
      ]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function byStatusId(req, res) {
  if (!req.user.id)
    return res.status(404).json([{message: "not authorized"}]);
  if(!req.params.status_id)
    return res.status(404).json([{message: "Invalid request"}]);
  let whereClause = {status_id : req.params.status_id ? req.params.status_id.split(',') : []};
  if(req.user.Company.user_type_id != 1) {
    whereClause.user_id = req.user.id;
  }
  //if(req.allocation.status_id=1)
  //return res.partner;
  return Allocation.findAll({
      where: whereClause,
      include: [
        {
          model: db.CandidateMap ,
          attributes: ['id'],
          include:[{
            model: db.Candidate,
            attributes: ['id', 'name'],
            include: [
              {
                model: db.User,
                attributes: ['id', 'name'],
                include: [
                  {
                    model: db.Company,
                    attributes: ['id', 'name']
                  }
                ]
              },
            ]},
            { model: CaseAddressVerification },
            { model: CaseCriminalVerification },
            { model: CaseEducationVerification },
            { model: CaseSiteVerification },
        ]

          //where: {status_id: req.params.status_id.split(',')},
          //include: [db.User, db.Status, db.CaseType]
        },
        {model: db.User},
        //{model: db.Status},
        {model: db.AllocationStatus}
      ]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
