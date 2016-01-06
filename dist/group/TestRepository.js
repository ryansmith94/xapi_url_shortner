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
    Repository.prototype.getGroups = function () {
        return q(this.groups);
    };
    Repository.prototype.deleteGroupById = function (id) {
        var deferred = q.defer();
        var filtered_groups = this.groups.filter(function (group, index) {
            group.index = index;
            return group.id === id;
        });
        if (filtered_groups.length > 0) {
            this.groups = this.groups.slice(0, filtered_groups[0].index).concat(this.groups.slice(filtered_groups[0].index + 1));
            deferred.resolve(true);
        }
        else {
            deferred.reject(new Error('No group'));
        }
        return deferred.promise;
    };
    return Repository;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;
//# sourceMappingURL=TestRepository.js.map