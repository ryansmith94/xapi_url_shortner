/// <reference path="../definitions/references.d.ts" />
var q = require('q');
var Repository = (function () {
    function Repository() {
    }
    Repository.prototype.getTitle = function (url) {
        return q(url);
    };
    return Repository;
})();
module.exports = Repository;
