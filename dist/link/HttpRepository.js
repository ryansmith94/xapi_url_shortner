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
    Repository.prototype.getLinks = function () {
        return jquery.ajax({
            url: this.endpoint,
            dataType: 'json',
            method: 'GET'
        });
    };
    return Repository;
})();
module.exports = Repository;
