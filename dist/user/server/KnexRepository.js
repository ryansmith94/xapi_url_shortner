"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseKnexRepository_1 = require('../../BaseKnexRepository');
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository() {
        _super.apply(this, arguments);
    }
    Repository.prototype.createUser = function (user) {
        return this.connect().insert(user, 'id').then(function (ids) {
            return {
                id: ids[0],
                email: user.email,
                password: user.password,
                group_id: user.group_id,
                admin: user.admin
            };
        });
    };
    Repository.prototype.getUserByEmail = function (email) {
        return this.connect().where('email', email).first().then(function (user) {
            if (!user) {
                throw new Error('No user');
            }
            else {
                return user;
            }
        });
    };
    Repository.prototype.getUserById = function (id) {
        return this.connect().where('id', id).first().then(function (user) {
            if (!user) {
                throw new Error('No user');
            }
            else {
                return user;
            }
        });
    };
    Repository.prototype.deleteUserById = function (id) {
        return this.connect().where('id', id).delete().then(function (user) {
            if (!user) {
                throw new Error('No user');
            }
            else {
                return user;
            }
        });
    };
    Repository.prototype.getUsersByGroupId = function (group_id) {
        return this.connect().where('group_id', group_id);
    };
    Repository.prototype.deleteUsersByGroupId = function (group_id) {
        return this.connect().where('group_id', group_id).delete().then(function () {
            return true;
        });
    };
    Repository.prototype.updateUserById = function (id, user) {
        return this.connect().where('id', id).update(user).then(function (ids) {
            if (ids === 0)
                throw new Error('No user');
            return user;
        });
    };
    return Repository;
}(BaseKnexRepository_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=KnexRepository.js.map
