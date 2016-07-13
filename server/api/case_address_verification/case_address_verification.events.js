/**
 * CaseAddressVerification model events
 */

'use strict';

import {EventEmitter} from 'events';
var CaseAddressVerification = require('../../sqldb').CaseAddressVerification;
var CaseAddressVerificationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CaseAddressVerificationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CaseAddressVerification.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CaseAddressVerificationEvents.emit(event + ':' + doc._id, doc);
    CaseAddressVerificationEvents.emit(event, doc);
    done(null);
  }
}

export default CaseAddressVerificationEvents;
