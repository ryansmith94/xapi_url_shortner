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
    function Service(repository, tracking_service) {
        this.repo = repository;
        this.tracking_service = tracking_service;
        _super.call(this);
    }
    Service.prototype.validateLink = function (long_url, custom_url) {
        var deferred = q.defer();
        if (!url_regex.test(long_url)) {
            deferred.reject(new Error('Invalid Long URL'));
        }
        if (!/^[\da-z]+$/.test(custom_url)) {
            deferred.reject(new Error('Invalid Custom URL `' + custom_url + '`. It may only contain digits and lowercase letters.'));
        }
        this.getLinkByShortUrl(custom_url).then(function (link) {
            deferred.reject(new Error('Link already exists.'));
        }, function (err) {
            deferred.resolve(true);
        });
        return deferred.promise;
    };
    Service.prototype.createLink = function (long_url, custom_url) {
        var self = this;
        return self.validateLink(long_url, custom_url).then(function () {
            return self.repo.createLink({
                long_url: long_url,
                short_url: custom_url
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
        });
    };
    Service.prototype.trackLink = function (short_url, tracking_options) {
        return this.getLinkByShortUrl(short_url).then(function (link) {
            this.tracking_service.trackLink(link, tracking_options);
            return link;
        }.bind(this));
    };
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
    Service.prototype.convertBase = function (value, from_base, to_base) {
        var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
        var from_range = range.slice(0, from_base);
        var to_range = range.slice(0, to_base);
        var dec_value = ('' + value).split('').reverse().reduce(function (carry, digit, index) {
            if (from_range.indexOf(digit) === -1)
                throw new Error('Invalid digit `' + digit + '` for base ' + from_base + '.');
            return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
        }, 0);
        var new_value = '';
        while (dec_value > 0) {
            new_value = to_range[dec_value % to_base] + new_value;
            dec_value = (dec_value - (dec_value % to_base)) / to_base;
        }
        return new_value || '0';
    };
    Service.prototype.idToShortUrl = function (value) {
        return this.convertBase(value, 10, 36);
    };
    Service.prototype.shortUrlToId = function (value) {
        return this.convertBase(value, 36, 10);
    };
    Service.prototype.getCustomLinkById = function (id) {
        var short_url = this.idToShortUrl(id);
        return this.getCustomLinkByShortUrl(short_url);
    };
    Service.prototype.getCustomLinkByShortUrl = function (short_url) {
        return this.repo.getCustomLinkByShortUrl(short_url);
    };
    Service.prototype.getLinkByShortUrl = function (short_url) {
        return this.getCustomLinkByShortUrl(short_url).then(function (link) {
            return link;
        }.bind(this), function (err) {
            var id = this.shortUrlToId(short_url);
            return this.getLinkById(id);
        }.bind(this)).then(function (link) {
            link.short_url = link.short_url || this.idToShortUrl(link.id);
            return link;
        }.bind(this));
    };
    Service.prototype.getLinkById = function (id) {
        return this.repo.getLinkById(id);
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map