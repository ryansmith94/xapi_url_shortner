"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseHttpRepository_1 = require('../../BaseHttpRepository');
var q = require('q');
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository(endpoint, token_value) {
        _super.call(this, endpoint);
        this.token_value = token_value;
    }
    Repository.prototype.connect = function (opts) {
        opts.beforeSend = function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.token_value);
        }.bind(this);
        return _super.prototype.connect.call(this, opts);
    };
    Repository.prototype.createLink = function (link) {
        return this.connect({
            method: 'POST',
            data: link
        }).then(function (link) {
            this.links.push(link);
            return link;
        }.bind(this));
    };
    Repository.prototype.updateLink = function (updated_link) {
        var deferred = q.defer();
        var filtered_indexes = this.links.map(function (link, index) {
            return link.id === updated_link.id ? index : null;
        }).filter(function (index) {
            return index !== null;
        });
        if (filtered_indexes.length > 0) {
            this.links[filtered_indexes[0]] = updated_link;
            deferred.resolve(updated_link);
        }
        else {
            deferred.reject(new Error('No link'));
        }
        return deferred.promise;
    };
    Repository.prototype.getLinks = function () {
        if (this.links)
            return q(this.links);
        return this.connect({
            method: 'GET'
        }).then(function (links) {
            this.links = links;
            return links;
        }.bind(this));
    };
    Repository.prototype.getLinkById = function (id) {
        return this.filterModels(this.links, function (link) {
            return link.id === id;
        });
    };
    Repository.prototype.getCustomLinkByShortUrl = function (short_url) {
        return this.filterModels(this.links, function (link) {
            return link.short_url === short_url;
        });
    };
    Repository.prototype.deleteLinkById = function (id) {
        return this.connect({
            method: 'DELETE',
            url: this.endpoint + '/' + id
        }).then(function () {
            return this.deleteModel(this.links, function (link) {
                return link.id === id;
            });
        }.bind(this)).then(function (links) {
            this.links = links;
            return true;
        }.bind(this));
    };
    Repository.prototype.changeLongUrl = function (id, long_url) {
        var _this = this;
        return this.connect({
            method: 'PUT',
            url: this.endpoint + '/' + id,
            data: { long_url: long_url }
        }).then(function () {
            _this.links = _this.links.map(function (link) {
                if (link.id === id) {
                    link.long_url = long_url;
                }
                return link;
            });
        });
    };
    return Repository;
}(BaseHttpRepository_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=HttpRepository.js.map
