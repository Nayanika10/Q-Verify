/**
 * Case model events
 */

'use strict';

import {EventEmitter} from 'events';
var Case = require('../../sqldb').Case;
var CaseEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CaseEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Case.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CaseEvents.emit(event + ':' + doc._id, doc);
    CaseEvents.emit(event, doc);
    done(null);
  }
}

export default CaseEvents;
