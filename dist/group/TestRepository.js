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
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=TestRepository.js.map