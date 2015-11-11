/// <reference path="../definitions/references.d.ts" />
var q = require('q');
var Repository = (function () {
    function Repository() {
        this.links = [];
    }
    Repository.prototype.createLink = function (link) {
        link.id = this.links.length + 1;
        this.links.push(link);
        return q(link);
    };
    Repository.prototype.updateLink = function (link) {
        var deferred = q.defer();
        if (this.links[link.id - 1]) {
            this.links[link.id - 1] = link;
            deferred.resolve(link);
        }
        else {
            deferred.reject(new Error('No link'));
        }
        return deferred.promise;
    };
    Repository.prototype.getLinkById = function (id) {
        var deferred = q.defer();
        if (this.links[id - 1]) {
            deferred.resolve(this.links[id - 1]);
        }
        else {
            deferred.reject(new Error('No link'));
        }
        return deferred.promise;
    };
    Repository.prototype.getCustomLinkByShortUrl = function (short_url) {
        var deferred = q.defer();
        var filtered_links = this.links.filter(function (link) {
            return link.short_url === short_url;
        });
        if (filtered_links.length > 0) {
            deferred.resolve(filtered_links[0]);
        }
        else {
            deferred.reject(new Error('No link'));
        }
        return deferred.promise;
    };
    Repository.prototype.getLinks = function () {
        return q(this.links);
    };
    Repository.prototype.getLinksByGroupId = function (group_id) {
        var filtered_links = this.links.filter(function (link) {
            return link.group_id === group_id;
        });
        return q(filtered_links);
    };
    Repository.prototype.deleteLinkById = function (id) {
        var deferred = q.defer();
        var filtered_links = this.links.filter(function (link, index) {
            link.index = index;
            return link.id === id;
        });
        if (filtered_links.length > 0) {
            this.links = this.links.slice(0, filtered_links[0].index).concat(this.links.slice(filtered_links[0].index + 1));
            deferred.resolve(true);
        }
        else {
            deferred.reject(new Error('No link'));
        }
        return deferred.promise;
    };
    Repository.prototype.deleteLinksByGroupId = function (group_id) {
        var deferred = q.defer();
        this.links = this.links.filter(function (link) {
            return link.group_id !== group_id;
        });
        deferred.resolve(true);
        return deferred.promise;
    };
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=TestRepository.js.map