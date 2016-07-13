'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  qverify: {
    username: process.env.QVERIFY_MYSQL_USER,
    password: process.env.QVERIFY_MYSQL_PASS,
    database: process.env.QVERIFY_MYSQL_DB,
    host: process.env.QVERIFY_MYSQL_HOST,
    dialect: 'mysql',
    logging: true,
    timezone: '+05:30',
  },
};
