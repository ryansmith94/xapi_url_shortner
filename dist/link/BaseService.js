var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService_1 = require('../BaseService');
var UrlRegex_1 = require('./UrlRegex');
var q = require('q');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository) {
        this.repo = repository;
        _super.call(this);
    }
    Service.prototype.validateLink = function (long_url, custom_url) {
        var deferred = q.defer();
        if (!UrlRegex_1.default.test(long_url)) {
            deferred.reject(new Error('Invalid Long URL'));
        }
        if (!/^[\da-z]+$/.test(custom_url)) {
            deferred.reject(new Error('Invalid Custom URL `' + custom_url + '`. It may only contain digits and lowercase letters.'));
        }
        if (custom_url != undefined) {
            this.getLinkByShortUrl(custom_url).then(function (link) {
                deferred.reject(new Error('Custom URL already exists.'));
            }, function (err) {
                deferred.resolve(true);
            });
        }
        else {
            deferred.resolve(true);
        }
        return deferred.promise;
    };
    Service.prototype.idToShortUrl = function (value) {
        return parseInt(value, 10).toString(36);
    };
    Service.prototype.shortUrlToId = function (value) {
        return parseInt(value, 36).toString(10);
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
})(BaseService_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;
//# sourceMappingURL=BaseService.js.map