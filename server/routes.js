/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function (app) {
  // Insert routes below
  //app.use('/api/university_names', app.oauth.authenticate(), require('./api/university_name'));
  app.use('/api/users_phone_relations', app.oauth.authenticate(), require('./api/users_phone_relation'));
  //app.use('/api/university_names', app.oauth.authenticate(), require('./api/university_name'));
  app.use('/api/house_types', app.oauth.authenticate(), require('./api/house_type'));
  //app.use('/api/designations', app.oauth.authenticate(), require('./api/designation'));
  //app.use('/api/degrees', app.oauth.authenticate(), require('./api/degree'));
  app.use('/api/case_types', app.oauth.authenticate(), require('./api/case_type'));
  app.use('/api/status', app.oauth.authenticate(), require('./api/status'));
  app.use('/api/allocation_status', app.oauth.authenticate(), require('./api/allocation_status'));
  app.use('/api/allocations', app.oauth.authenticate(), require('./api/allocation'));
  app.use('/api/cases', app.oauth.authenticate(), require('./api/case'));
  app.use('/api/case_site_verifications', app.oauth.authenticate(), require('./api/case_site_verification'));
  app.use('/api/case_education_verifications', app.oauth.authenticate(), require('./api/case_education_verification'));
  app.use('/api/case_criminal_verifications', app.oauth.authenticate(), require('./api/case_criminal_verification'));
  app.use('/api/case_address_verifications', app.oauth.authenticate(), require('./api/case_address_verification'));
  //app.use('/api/locations', app.oauth.authenticate(), require('./api/location'));
  app.use('/api/companys', require('./api/company'));
  app.use('/api/user_types', app.oauth.authenticate(), require('./api/user_type'));
  app.use('/api/users', app.oauth.authenticate(), require('./api/user'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
