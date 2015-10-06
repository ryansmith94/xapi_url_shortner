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
    /**
     * Constructs a new Service.
     * @param {any} repository A repository.
     */
    function Service(repository) {
        this.repo = repository;
        _super.call(this);
    }
    /**
     * Validates the given long_url and custom_url.
     * @param {string} long_url The long_url to validate.
     * @param {string} custom_url The custom_url to validate (optional).
     * @return {Future}
     */
    Service.prototype.validateLink = function (long_url, custom_url) {
        var deferred = q.defer();
        // Validates the long_url pattern.
        if (!url_regex.test(long_url)) {
            deferred.reject(new Error('Invalid Long URL'));
        }
        // Validates the custom_url pattern.
        if (!/^[\da-z]+$/.test(custom_url)) {
            deferred.reject(new Error('Invalid Custom URL `' + custom_url + '`. It may only contain digits and lowercase letters.'));
        }
        // Checks that the custom_url doesn't exist already.
        this.getLinkByShortUrl(custom_url).then(function (link) {
            deferred.reject(new Error('Link already exists.'));
        }, function (err) {
            deferred.resolve(true);
        });
        return deferred.promise;
    };
    /**
     * Creates a new link.
     * @param {string} long_url The long_url to be used.
     * @param {string} custom_url The custom_url to be used (optional).
     * @return {Future}
     */
    Service.prototype.createLink = function (long_url, custom_url) {
        var self = this;
        return self.validateLink(long_url, custom_url).then(function () {
            return self.repo.createLink({
                long_url: long_url,
                short_url: custom_url
            });
        }).then(function (link) {
            return self.getCustomLinkById(link.id).then(function (custom_link) {
                link.short_url = self.idToShortUrl(custom_link.id);
                return self.repo.updateLink(link).then(function (link) {
                    self.emitChange();
                    return link;
                });
            }, function (err) {
                link.short_url = link.short_url || self.idToShortUrl(link.id);
                self.emitChange();
                return link;
            });
        });
    };
    /**
     * Gets links.
     * @return {Future}
     */
    Service.prototype.getLinks = function () {
        return this.repo.getLinks().then(function (links) {
            return links.map(function (link) {
                return {
                    id: link.id,
                    long_url: link.long_url,
                    short_url: link.short_url || this.idToShortUrl(link.id)
                };
            }.bind(this));
        }.bind(this));
    };
    /**
     * Converts an id to a short_url.
     * @param  {string} value The id to be converted.
     * @return {string} short_url
     */
    Service.prototype.idToShortUrl = function (value) {
        return parseInt(value, 10).toString(36);
    };
    /**
     * Converts a short_url to an id.
     * @param  {string} value The short_url to be converted.
     * @return {string} id
     */
    Service.prototype.shortUrlToId = function (value) {
        return parseInt(value, 36).toString(10);
    };
    /**
     * Gets a customised link by its id.
     * @param {number} id The id to find.
     * @return {Future}
     */
    Service.prototype.getCustomLinkById = function (id) {
        var short_url = this.idToShortUrl(id);
        return this.getCustomLinkByShortUrl(short_url);
    };
    /**
     * Gets a customised link by its short_url.
     * @param {string} short_url The short_url to find.
     * @return {Future}
     */
    Service.prototype.getCustomLinkByShortUrl = function (short_url) {
        return this.repo.getCustomLinkByShortUrl(short_url);
    };
    /**
     * Gets a link by its short_url.
     * @param {string} short_url The short_url to find.
     * @return {Future}
     */
    Service.prototype.getLinkByShortUrl = function (short_url) {
        return this.getCustomLinkByShortUrl(short_url).then(function (link) {
            return link;
        }.bind(this), function (err) {
            // Converts the short_url to an id and searches by the id.
            var id = this.shortUrlToId(short_url);
            return this.getLinkById(id);
        }.bind(this)).then(function (link) {
            // Returns the custom_url as the short_url or the converted id as the short_url.
            link.short_url = link.short_url || this.idToShortUrl(link.id);
            return link;
        }.bind(this));
    };
    /**
     * Gets a link by its id.
     * @param {number} id The id to find.
     * @return {Future}
     */
    Service.prototype.getLinkById = function (id) {
        return this.repo.getLinkById(id);
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=BaseService.js.map