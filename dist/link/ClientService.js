var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var url_regex = require('./UrlRegex');
var q = require('q');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository) {
        _super.call(this);
        this.links = [];
        this.repo = repository;
    }
    Service.prototype.createLink = function (long_url) {
        var deferred = q.defer();
        // Stops recreation of links.
        if (this.links.filter(function (link) {
            return link.long_url === long_url;
        }).length > 0) {
            deferred.reject(new Error('URL already shortened'));
            return deferred.promise;
        }
        // Validates URL.
        if (!url_regex.test(long_url)) {
            deferred.reject(new Error('Invalid URL'));
            return deferred.promise;
        }
        return this.repo.createLink({
            long_url: long_url
        }).then(function (link) {
            this.links.push(link);
            this.emitChange();
            return link;
        }.bind(this));
    };
    Service.prototype.fetchLinks = function () {
        return this.repo.getLinks().then(function (links) {
            this.links = links;
            this.emitChange();
            return links;
        }.bind(this));
    };
    Service.prototype.getLinks = function () {
        return this.links;
    };
    return Service;
})(BaseService);
module.exports = Service;
