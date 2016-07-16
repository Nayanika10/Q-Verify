/**
 * CaseCriminalVerification model events
 */

'use strict';

import {EventEmitter} from 'events';
var CaseCriminalVerification = require('../../sqldb').CaseCriminalVerification;
var CaseCriminalVerificationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CaseCriminalVerificationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CaseCriminalVerification.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CaseCriminalVerificationEvents.emit(event + ':' + doc._id, doc);
    CaseCriminalVerificationEvents.emit(event, doc);
    done(null);
  }
}

export default CaseCriminalVerificationEvents;
