'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  qverify: {
    username: process.env.QVERIFY_MYSQL_USER,
    password: process.env.QVERIFY_MYSQL_PASS,
    database: process.env.QVERIFY_MYSQL_DB,
    host: process.env.QVERIFY_MYSQL_HOST,
    dialect: 'mysql',
    logging: console.log,
    timezone: '+05:30',
  },

  MINIO: {
    endPoint: process.env.MINIO_ENDPOINT,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    bucket: process.env.MINIO_BUCKET,
    secure: false,
    port: 8000,
  },
};
