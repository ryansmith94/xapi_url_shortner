/// <reference path="../definitions/references.d.ts" />
var q = require('q');
var Repository = (function () {
    function Repository() {
    }
    Repository.prototype.createUser = function (user) {
        return q(user);
    };
    Repository.prototype.getUserByEmail = function (email) {
        var deferred = q.defer();
        deferred.resolve({
            email: email
        });
        return deferred.promise;
    };
    Repository.prototype.getUserByEmailAndPassword = function (email, password) {
        var deferred = q.defer();
        deferred.resolve({
            email: email,
            password: password
        });
        return deferred.promise;
    };
    Repository.prototype.getUserById = function (id) {
        var deferred = q.defer();
        deferred.resolve({
            id: id
        });
        return deferred.promise;
    };
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=HttpRepository.js.map