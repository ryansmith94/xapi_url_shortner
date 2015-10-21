var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository, group_service, token_service) {
        this.group_service = group_service;
        this.token_service = token_service;
        _super.call(this, repository);
    }
    Service.prototype.validateGroupId = function (group_id) {
        return this.group_service.getGroupById(group_id).then(function (group) {
            return group;
        }.bind(this), function (err) {
            throw new Error('Group does not exist.');
        });
    };
    Service.prototype.validateCreateUser = function (email, password, group_id) {
        return this.validateEmail(email).then(function () {
            return this.validateGroupId(group_id);
        }.bind(this)).then(function (group) {
            return this.getUserByEmail(email).then(function (user) {
                if (user.group_id == group_id) {
                    throw new Error('Email already exists in the group.');
                }
                else {
                    throw new Error('Email already exists in another group.');
                }
            }, function (err) {
                return true;
            });
        }.bind(this));
    };
    Service.prototype.validateUser = function (email, group_id) {
        return this.validateEmail(email).then(function () {
            return this.validateGroupId(group_id);
        }.bind(this));
    };
    Service.prototype.createUser = function (email, password, group_id) {
        return this.validateCreateUser(email, password, group_id).then(function () {
            return this.repo.createUser({
                email: email,
                password: password,
                group_id: group_id
            });
        }.bind(this));
    };
    Service.prototype.createUserWithToken = function (email, password, token) {
        return this.token_service.getUserByValue(token).then(function (user) {
            return this.createUser(email, password, user.group_id);
        }.bind(this));
    };
    Service.prototype.deleteUserById = function (id) {
        return this.repo.deleteUserById(id);
    };
    Service.prototype.getUserByEmailAndPassword = function (email, password) {
        return this.repo.getUserByEmailAndPassword(email, password);
    };
    Service.prototype.getUserById = function (id) {
        return this.repo.getUserById(id);
    };
    Service.prototype.getUsersByGroupId = function (group_id) {
        return this.validateGroupId(group_id).then(function () {
            return this.repo.getUsersByGroupId(group_id);
        }.bind(this));
    };
    Service.prototype.getUserByEmail = function (email) {
        return this.repo.getUserByEmail(email);
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map