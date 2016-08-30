/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cases              ->  index
 * POST    /api/cases              ->  create
 * GET     /api/cases/:id          ->  show
 * PUT     /api/cases/:id          ->  update
 * DELETE  /api/cases/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import db, { Case, User, CaseType,Status, Minio, CaseAddressVerification,
  CaseCriminalVerification, CaseEducationVerification, CaseSiteVerification,
  Allocation } from '../../sqldb';

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
  console.log(err);
  statusCode = statusCode || 500;
  res.status(statusCode).send(err);
}

// Gets a list of Cases
export function index(req, res) {
  if (!req.user.id)
    return res.status(404).json([{message: "not authorized"}]);
  let whereClause;
  if (req.user.Company.user_type_id != 1) {
    whereClause = {
      user_id: req.user.id
    };
  }
  return Case.findAll({
      attributes: ['id', 'name','created_at','updated_at'],
      where: whereClause,
      order: 'created_at DESC',
      include: [
        { model: Status, attributes:['id','name']},
        { model: User, attributes:['id','name'] },
        { model: CaseType, attributes:['id','name']},
        { model: Allocation, attributes:['id'], include: [{ model: User, attributes:['id','name']}], required: false }
      ]
    })
    .then(respondWithResult(res))
    .catch(err => handleError(res, 500, err));
}

// Gets a single Case from the DB
export function show(req, res) {
  return Case.find({
      where: {
        id: req.params.id
      },
      include: [
        //{model: CaseCriminalVerification, include: [db.Designation]},
        {model: CaseCriminalVerification},
        {model: CaseAddressVerification, include: [db.HouseType]},
        {model: CaseEducationVerification},
        {model: CaseSiteVerification},
        //{model: CaseEducationVerification, include: [db.Degree, db.Designation]},
        //{model: CaseSiteVerification, include: [db.Designation]},
        {model: User}
      ]
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(err => handleError(res, 500, err));
}

// Gets a single Case from the DB
export function vendorUploaded(req, res) {
  return Case.findAll({
      include: [Status],
      where: {status_id: [2, 3, 4]}
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(err => handleError(res, 500, err));
}

export function getFile(req, res) {
  return Case.findById(req.params.id).then(caseObj => {
    return Minio.downloadLink({
      object: caseObj.pdf,
      name: `${caseObj.id}.pdf`
    }).then(link => res.redirect(link))
  }).catch(err => handleError(res, 500, err))
}

// Creates a new Case in the DB
export function create(req, res) {
  return db.Case.create(req.body)
    .then((caseObj) => {
      /* Start Minio */
      const { base64:base64String, filename } = req.body.logo;
      const extention = filename.substring(filename.lastIndexOf('.') + 1);

// only upload if valid file extension
      if (~['doc', 'docx', 'pdf', 'rtf', 'txt','png','jpeg'].indexOf(extention)) {

        const rangeFolder = caseObj.id - (caseObj.id % 100000);
        const minioObject = {
          // object: 'cases/0/5/5.pdf'
          object: `cases/${rangeFolder}/${caseObj.id}/${caseObj.id}.${extention.toLowerCase()}`,
          base64String: base64String,
        }

        // Async
        Minio.base64Upload(minioObject).then(re => {
          return caseObj.update({pdf: minioObject.object})
          console.log("file saved success")
        }).catch(err => console.log(err))
      }

      /* End Minio */

      let casePr;
      switch (req.body.case_type_id) {
        case 1:
          req.body.address = {};
          req.body.address.case_id = caseObj.id;
          casePr = db.CaseAddressVerification.create(req.body.address)
          break;
        case 2:
          req.body.criminal.case_id = caseObj.id;
          casePr = db.CaseCriminalVerification.create(req.body.criminal)
          break;
        case 3:
          req.body.education.case_id = caseObj.id;
          casePr = db.CaseEducationVerification.create(req.body.education)
          break;
        case 4:
          req.body.site = {};
          req.body.site.case_id = caseObj.id;
          casePr = db.CaseSiteVerification.create(req.body.site)
          break;
      }

      return casePr.then(()=> {
        return res.json(caseObj);
      }).catch

    })
    .catch(err => handleError(res, 500, err));
}
//export function update(req, res) {
//  var model = req.body;
//  var uploadFlag = model.flag;
//  if(uploadFlag == true){
//    // upload state file if exists
//    if (req.body.case && req.body.case.filename) {
//      const { base64, filename } = req.body.case;
//      const extention = filename.substring(filename.lastIndexOf('.') + 1);
//
//      // only upload if valid file extension
//      if (~['doc', 'docx', 'pdf', 'rtf', 'txt'].indexOf(extention)) {
//        const rangeFolder = model.applicant_id - (model.applicant_id % 10000);
//        const path = `Applicants/${rangeFolder}/${model.applicant_id}/` +
//          `${moment().format('D-MM-YY-h_mm_ss')}.${extention}`;
//
//        // Write file to QDMS
//        fs.writeFile(`${config.QDMS_PATH}/${path}`, base64, 'base64', err => {
//          if (err) return logger.error(model.id, err);
//          return db.Case.build({
//              applicant_state_id: model.applicant_state_id,
//              path, created_by: req.user.id,
//            })
//            .save()
//            .then(stateFile => {
//              return stateFile.update({path:path})
//                .then(result => {
//                  return res.json({message: "success"});
//                })
//            }) // save file path to database
//            .catch(logger.error);
//        });
//      } else {
//        logger.error(model.id, 'Invalid applicant state file upload');
//      }
//    }
//  }else{
//    // upload state file if exists
//    if (req.body.state_file && req.body.state_file.filename) {
//      const { base64, filename } = req.body.state_file;
//      const extention = filename.substring(filename.lastIndexOf('.') + 1);
//
//      // only upload if valid file extension
//      if (~['doc', 'docx', 'pdf', 'rtf', 'txt'].indexOf(extention)) {
//        const rangeFolder = model.applicant_id - (model.applicant_id % 10000);
//        const path = `Applicants/${rangeFolder}/${model.applicant_id}/` +
//          `${moment().format('D-MM-YY-h_mm_ss')}.${extention}`;
//
//        // Write file to QDMS
//        fs.writeFile(`${config.QDMS_PATH}/${path}`, base64, 'base64', err => {
//          if (err) return logger.error(model.id, err);
//          return  db.StateFile.find({
//              where: {
//                id: model.id
//              }
//            })
//            .then(handleEntityNotFound(res))
//            .then(stateFile => {
//              return stateFile.update({path:path})
//                .then(result => {
//                  return res.json({message: "success"});
//                })
//            })
//            .catch(err => handleError(res, 500, err));
//        });
//      } else {
//        logger.error(model.id, 'Invalid applicant state file upload');
//      }
//    }
//  }
//}

// Updates an existing Case in the DB
export function update(req, res) {
  if (!req.query) {
    return res.status(404).json({message: 'Invalid data'});
  }
  return Case.update(req.query, {
      where: {
        id: req.params.id
      }
    })
    .then(respondWithResult(res))
    .catch(err => handleError(res, 500, err));
}

// Deletes a Case from the DB
export function destroy(req, res) {
  return Case.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(err => handleError(res, 500, err));
}
