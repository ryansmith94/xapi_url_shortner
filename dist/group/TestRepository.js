/// <reference path="../definitions/references.d.ts" />
var q = require('q');
var Repository = (function () {
    function Repository() {
        this.groups = [];
    }
    Repository.prototype.createGroup = function (group) {
        group.id = this.groups.length + 1;
        this.groups.push(group);
        return q(group);
    };
    Repository.prototype.getGroupById = function (id) {
        var deferred = q.defer();
        if (this.groups[id - 1]) {
            deferred.resolve(this.groups[id - 1]);
        }
        else {
            deferred.reject(new Error('No group'));
        }
        return deferred.promise;
    };
    Repository.prototype.getGroups = function (id) {
        return q(this.groups);
    };
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=TestRepository.js.map