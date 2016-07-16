/**
 * CaseType model events
 */

'use strict';

import {EventEmitter} from 'events';
var CaseType = require('../../sqldb').CaseType;
var CaseTypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CaseTypeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CaseType.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CaseTypeEvents.emit(event + ':' + doc._id, doc);
    CaseTypeEvents.emit(event, doc);
    done(null);
  }
}

export default CaseTypeEvents;
