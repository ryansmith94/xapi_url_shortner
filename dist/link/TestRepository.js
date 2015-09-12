/// <reference path="../definitions/references.d.ts" />
var q = require('q');
var Repository = (function () {
    function Repository() {
    }
    Repository.prototype.createLink = function (link) {
        return q({
            id: '1',
            long_url: link.long_url
        });
    };
    return Repository;
})();
module.exports = Repository;
