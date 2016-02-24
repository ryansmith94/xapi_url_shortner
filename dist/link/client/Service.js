"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService_1 = require('../BaseService');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository) {
        _super.call(this, repository);
    }
    Service.prototype.createLink = function (long_url, custom_url) {
        if (long_url.indexOf('://') === -1) {
            long_url = 'http://' + long_url;
        }
        return this.validateLink(long_url, custom_url).then(function () {
            return this.repo.createLink({
                long_url: long_url,
                short_url: custom_url
            });
        }.bind(this)).then(function (link) {
            this.emitChange();
            return link;
        }.bind(this));
    };
    Service.prototype.getLinks = function () {
        return this.repo.getLinks();
    };
    Service.prototype.deleteLinkById = function (id) {
        return this.repo.deleteLinkById(id).then(function () {
            this.emitChange();
            return true;
        }.bind(this));
    };
    Service.prototype.changeLongUrl = function (id, long_url) {
        var _this = this;
        return this.validateLink(long_url).then(function () {
            return _this.repo.changeLongUrl(id, long_url);
        }).then(function (result) {
            _this.emitChange();
            return result;
        });
    };
    return Service;
}(BaseService_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;

//# sourceMappingURL=Service.js.map
