/// <reference path="../definitions/references.d.ts" />
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
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=TestRepository.js.map