"use strict";
var q = require('q');
var Repository = (function () {
    function Repository() {
        this.users = [];
    }
    Repository.prototype.createUser = function (user) {
        user.id = this.users.length + 1;
        this.users.push(user);
        return q(user);
    };
    Repository.prototype.getUserByEmail = function (email) {
        var deferred = q.defer();
        var filtered_users = this.users.filter(function (user) {
            return user.email === email;
        });
        if (filtered_users.length > 0) {
            deferred.resolve(filtered_users[0]);
        }
        else {
            deferred.reject(new Error('No user'));
        }
        return deferred.promise;
    };
    Repository.prototype.getUserById = function (id) {
        var deferred = q.defer();
        var filtered_users = this.users.filter(function (user) {
            return user.id === id;
        });
        if (filtered_users.length > 0) {
            deferred.resolve(filtered_users[0]);
        }
        else {
            deferred.reject(new Error('No user'));
        }
        return deferred.promise;
    };
    Repository.prototype.deleteUserById = function (id) {
        var deferred = q.defer();
        var filtered_users = this.users.filter(function (user, index) {
            user.index = index;
            return user.id === id;
        });
        if (filtered_users.length > 0) {
            this.users = this.users.slice(0, filtered_users[0].index).concat(this.users.slice(filtered_users[0].index + 1));
            deferred.resolve(true);
        }
        else {
            deferred.reject(new Error('No user'));
        }
        return deferred.promise;
    };
    Repository.prototype.getUsersByGroupId = function (group_id) {
        var deferred = q.defer();
        var filtered_users = this.users.filter(function (user) {
            return user.group_id === group_id;
        });
        deferred.resolve(filtered_users);
        return deferred.promise;
    };
    Repository.prototype.deleteUsersByGroupId = function (group_id) {
        var deferred = q.defer();
        this.users = this.users.filter(function (user) {
            return user.group_id !== group_id;
        });
        deferred.resolve(true);
        return deferred.promise;
    };
    Repository.prototype.updateUserById = function (id, user) {
        var deferred = q.defer();
        this.users = this.users.map(function (stored_user) {
            if (stored_user.id === id) {
                return user;
            }
            else {
                return stored_user;
            }
        });
        deferred.resolve(user);
        return deferred.promise;
    };
    return Repository;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=TestRepository.js.map
