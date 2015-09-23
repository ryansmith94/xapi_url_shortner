/// <reference path="../definitions/references.d.ts" />
var jquery = require('jquery');
var q = require('q');
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
        }).then(function (link) {
            this.links.push(link);
            return link;
        }.bind(this));
    };
    Repository.prototype.getLinks = function () {
        if (this.links)
            return q(this.links);
        return jquery.ajax({
            url: this.endpoint,
            dataType: 'json',
            method: 'GET'
        }).then(function (links) {
            this.links = links;
            return links;
        }.bind(this));
    };
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=HttpRepository.js.map