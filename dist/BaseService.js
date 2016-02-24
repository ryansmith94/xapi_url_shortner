"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events = require('events');
var CHANGE_EVENT = 'change';
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.apply(this, arguments);
    }
    Service.prototype.emitChange = function () {
        this.emit(CHANGE_EVENT);
    };
    Service.prototype.addChangeListener = function (callback) {
        this.addListener(CHANGE_EVENT, callback);
    };
    Service.prototype.removeChangeListener = function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    };
    return Service;
}(events.EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;

//# sourceMappingURL=BaseService.js.map
