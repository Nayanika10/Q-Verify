/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/locations', require('./api/location'));
  app.use('/api/companys', require('./api/company'));
  app.use('/api/user_types', require('./api/user_type'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/managers', require('./api/manager'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
