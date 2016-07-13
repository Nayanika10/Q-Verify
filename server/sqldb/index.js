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
