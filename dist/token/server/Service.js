var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var q = require('q');
var EXPIRY_TIME = 30;
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.apply(this, arguments);
    }
    Service.prototype.setUserService = function (user_service) {
        this.user_service = user_service;
    };
    Service.prototype.createToken = function (email, password) {
        var deferred = q.defer();
        this.user_service.getUserByEmailAndPassword(email, password).then(function (user) {
            var expiry = new Date();
            expiry.setMinutes(expiry.getMinutes() + EXPIRY_TIME);
            return this.repo.createToken({
                value: Math.random().toString(36).substr(2),
                user_id: user.id,
                expiry: expiry.toISOString()
            }).then(function (token) {
                return deferred.resolve(token);
            });
        }.bind(this)).then(function (err) {
            deferred.reject(err);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    Service.prototype.getUserByValue = function (token_value) {
        return this.repo.getTokenByValue(token_value).then(function (token) {
            if ((new Date()).toISOString() < token.expiry) {
                return this.user_service.getUserById(token.user_id);
            }
            else {
                throw new Error('No token. Log out and log back in.');
            }
        }.bind(this));
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map