var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService_1 = require('../BaseService');
var q = require('q');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository) {
        this.repo = repository;
        _super.call(this);
    }
    Service.prototype.validateEmail = function (email) {
        var deferred = q.defer();
        var email_regex = /^[A-Z0-9.\'_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!email_regex.test(email)) {
            deferred.reject(new Error('Invalid email'));
        }
        else {
            deferred.resolve(true);
        }
        return deferred.promise;
    };
    return Service;
})(BaseService_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;
//# sourceMappingURL=BaseService.js.map