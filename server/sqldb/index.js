/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelizeQverify: new Sequelize(
    config.qverify.database, config.qverify.username,
    config.qverify.password, config.qverify
  ),
};

// Insert models below
db.UniversityName = db.sequelizeQverify.import('../api/university_name/university_name.model');
db.UsersPhoneRelation = db.sequelizeQverify.import('../api/users_phone_relation/users_phone_relation.model');
db.HouseType = db.sequelizeQverify.import('../api/house_type/house_type.model');
db.Designation = db.sequelizeQverify.import('../api/designation/designation.model');
db.Degree = db.sequelizeQverify.import('../api/degree/degree.model');
db.CaseType = db.sequelizeQverify.import('../api/case_type/case_type.model');
db.Status = db.sequelizeQverify.import('../api/Status/Status.model');
db.AllocationStatus = db.sequelizeQverify.import('../api/allocation_status/allocation_status.model');
db.Allocation = db.sequelizeQverify.import('../api/allocation/allocation.model');
db.Case = db.sequelizeQverify.import('../api/case/case.model');
db.CaseSiteVerification = db.sequelizeQverify.import('../api/case_site_verification/case_site_verification.model');
db.CaseEducationVerification = db.sequelizeQverify.import('../api/case_education_verification/case_education_verification.model');
db.CaseCriminalVerification = db.sequelizeQverify.import('../api/case_criminal_verification/case_criminal_verification.model');
db.CaseAddressVerification = db.sequelizeQverify.import('../api/case_address_verification/case_address_verification.model');
db.Location = db.sequelizeQverify.import('../api/location/location.model');
db.Company = db.sequelizeQverify.import('../api/company/company.model');
db.UserType = db.sequelizeQverify.import('../api/user_type/user_type.model');
db.User = db.sequelizeQverify.import('../api/user/user.model');
//db.Manager = db.sequelizeQverify.import('../api/manager/manager.model');


Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
