var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var q = require('q');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository, group_service) {
        this.repo = repository;
        this.group_service = group_service;
        _super.call(this);
    }
    Service.prototype.validateUser = function (email, password, group_id) {
        var deferred = q.defer();
        var email_regex = /^[A-Z0-9.\'_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!email_regex.test(email)) {
            deferred.reject(new Error('Invalid email'));
        }
        this.group_service.getGroupById(group_id).then(function (group) {
            this.getUserByEmail(email).then(function (user) {
                if (user.group_id == group_id) {
                    deferred.reject(new Error('Email already exists in the group.'));
                }
                else {
                    deferred.reject(new Error('Email already exists in another group.'));
                }
            }, function (err) {
                deferred.resolve(true);
            });
        }.bind(this), function (err) {
            deferred.reject(new Error('Group does not exist.'));
        });
        return deferred.promise;
    };
    Service.prototype.createUser = function (email, password, group_id) {
        return this.validateUser(email, password, group_id).then(function () {
            return this.repo.createUser({
                email: email,
                password: password,
                group_id: group_id
            });
        }.bind(this));
    };
    Service.prototype.getUserByEmail = function (email) {
        return this.repo.getUserByEmail(email);
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map