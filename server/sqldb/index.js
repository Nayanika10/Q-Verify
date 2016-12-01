/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';
import Minio from 'minio';
import Bluebird from 'bluebird';
var db = {
  Sequelize,
  sequelizeQuarc: new Sequelize(
    config.quarc.database, config.quarc.username,
    config.quarc.password, config.quarc
  ),
  sequelizeQverify: new Sequelize(
    config.qverify.database, config.qverify.username,
    config.qverify.password, config.qverify
  ),
  Minio: new Minio(config.MINIO),
};

// Insert models below
//db.Internalstatus = db.sequelize.import('../api/internalstatus/internalstatus.model');
db.QueuedTask = db.sequelizeQuarc.import('../api/queuedTask/queuedTask.model');
db.Email = db.sequelizeQverify.import('../api/email/email.model');
db.Candidate = db.sequelizeQverify.import('../api/candidate/candidate.model');
db.CandidateMap = db.sequelizeQverify.import('../api/candidate_map/candidate_map.model');
//db.UniversityName = db.sequelizeQverify.import('../api/university_name/university_name.model');
db.UsersPhoneRelation = db.sequelizeQverify.import('../api/users_phone_relation/users_phone_relation.model');
db.HouseType = db.sequelizeQverify.import('../api/house_type/house_type.model');
//db.Designation = db.sequelizeQverify.import('../api/designation/designation.model');
//db.Degree = db.sequelizeQverify.import('../api/degree/degree.model');
db.CaseType = db.sequelizeQverify.import('../api/case_type/case_type.model');
db.Status = db.sequelizeQverify.import('../api/status/status.model');
db.AllocationStatus = db.sequelizeQverify.import('../api/allocation_status/allocation_status.model');
db.Allocation = db.sequelizeQverify.import('../api/allocation/allocation.model');
//db.Case = db.sequelizeQverify.import('../api/case/case.model');
db.CaseSiteVerification = db.sequelizeQverify.import('../api/case_site_verification/case_site_verification.model');
db.CaseEducationVerification = db.sequelizeQverify.import('../api/case_education_verification/case_education_verification.model');
db.CaseCriminalVerification = db.sequelizeQverify.import('../api/case_criminal_verification/case_criminal_verification.model');
db.CaseAddressVerification = db.sequelizeQverify.import('../api/case_address_verification/case_address_verification.model');
//db.Location = db.sequelizeQverify.import('../api/location/location.model');
db.Company = db.sequelizeQverify.import('../api/company/company.model');
db.UserType = db.sequelizeQverify.import('../api/user_type/user_type.model');
db.User = db.sequelizeQverify.import('../api/user/user.model');
//db.Manager = db.sequelizeQverify.import('../api/manager/manager.model');

// OAuth
db.RefreshToken = db.sequelizeQverify.import('../api/refreshToken/refreshToken.model');
db.AccessToken = db.sequelizeQverify.import('../api/accessToken/accessToken.model');
db.App = db.sequelizeQverify.import('../api/app/app.model');
db.AuthCode = db.sequelizeQverify.import('../api/authCode/authCode.model');

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});


Bluebird.promisifyAll(Object.getPrototypeOf(db.Minio));

db.Minio.bufferUpload = function(minioObject){
  minioObject.bucket = minioObject.bucket || 'qverify'   // Bucket name always in lowercaseObj
  return db.Minio.putObjectAsync(minioObject.bucket,minioObject.object, minioObject.buffer, 'application/octet-stream')
}

function qualifyBucket(bucketName) {
  let bucket = bucketName;
  if (typeof bucket === 'string' && bucket[0] === '/') {
    bucket = bucket.slice(1);
  }
  return bucket.toLowerCase();
}
db.Minio.base64Upload = function(minioObject){
  minioObject.buffer = Buffer.from(minioObject.base64String, 'base64');
  return db.Minio.bufferUpload(minioObject)
}

db.Minio.base64UploadMulti = (minioObjects) => {
  return Promise.all(minioObjects.map(m => Minio.base64Upload(m)))
}

db.Minio.downloadLinkBase = (minioObject) => {
  const minObj = minioObject;
  minObj.bucket = minObj.bucket || 'qverify';   // Bucket name always in lowercaseObj
  minObj.expires = minObj.expires || 24 * 60 * 60;   // Expired in one day
  minObj.headers = {
    'response-content-disposition':
      `attachment; filename="${minObj.name.replace(/[^a-zA-Z0-9-_\.]/g, '')}"` };
  return db.Minio.presignedGetObjectAsync(
    minObj.bucket.toLowerCase(), qualifyBucket(minObj.object),
    minObj.expires, minObj.headers
  );
};

db.Minio.downloadLink = (minioObject) => {
  const minObj = minioObject;
  minObj.bucket = minObj.bucket || 'qverify';   // Bucket name always in lowercase
  return db.Minio.statObjectAsync(minObj.bucket, qualifyBucket(minObj.object))
    .then(() => db.Minio.downloadLinkBase(minObj))
    .catch((err) => {
      console.log('Minio: File not found', minObj, err)
      return `${config.PREFIX}api.${config.DOMAIN}/api/404.pdf`;
    });
};

module.exports = db;
