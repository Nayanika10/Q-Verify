/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import oAuthComponent from './../components/oauthjs';
import config from './environment';
import routes from './../routes.js';

export default function(app) {
  var env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  app.use(morgan('dev'));
  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use('/api/open/users', function(req,res,next){
    console.log("s")
    return require('../api/user')(req,res,next)
  });
  app.oauth = oAuthComponent;

  // OAuth Token authorization_code, password, refresh_token
  app.all('/oauth/token', app.oauth.grant());

  app.oauth.authenticate = require('./../components/oauthjs/authenticate')

  // OAuth Authorise from Third party applications
  app.use('/authorise', app.oauth.authenticate(), require('./../api/authorise'));  // /authorise
  app.use('/api/authorise', app.oauth.authenticate(), require('./../api/authorise'));  // /authorise

  routes(app);
  //// Persist sessions with MongoStore / sequelizeStore
  //// We need to enable sessions for passport-twitter because it's an
  //// oauth 1.0 strategy, and Lusca depends on sessions
  //app.use(session({
  //  secret: config.secrets.session,
  //  saveUninitialized: true,
  //  resave: false,
  //  store: new Store(sqldb.sequelize)
  //}));

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if ('test' !== env) {
    //app.use(lusca({
    //  csrf: {
    //    angular: true
    //  },
    //  xframe: 'SAMEORIGIN',
    //  hsts: {
    //    maxAge: 31536000, //1 year, in seconds
    //    includeSubDomains: true,
    //    preload: true
    //  },
    //  xssProtection: true
    //}));
  }



}
