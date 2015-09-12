/// <reference path="../definitions/references.d.ts" />
var jquery = require('jquery');
var Repository = (function () {
    function Repository(endpoint) {
        this.endpoint = endpoint;
    }
    Repository.prototype.createLink = function (link) {
        return jquery.ajax({
            url: this.endpoint,
            dataType: 'json',
            method: 'POST',
            data: link
        });
    };
    return Repository;
})();
module.exports = Repository;
