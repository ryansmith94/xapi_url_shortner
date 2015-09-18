/// <reference path="./definitions/references.d.ts" />
import events = require('events');
var CHANGE_EVENT = 'change';

class Service extends events.EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback: Function) {
    this.addListener(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback: Function) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export = Service;