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
    Repository.prototype.getLinkById = function (id) {
        return q({
            id: id,
            long_url: 'http://www.example.com/test'
        });
    };
    Repository.prototype.getLinks = function () {
        return q([{
                id: '1',
                long_url: 'http://www.example.com/test'
            }]);
    };
    return Repository;
})();
module.exports = Repository;
