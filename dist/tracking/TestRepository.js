/// <reference path="../definitions/references.d.ts" />
var q = require('q');
var Repository = (function () {
    function Repository() {
    }
    Repository.prototype.createStatement = function (statement) {
        return q(statement);
    };
    return Repository;
})();
module.exports = Repository;
