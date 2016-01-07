var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService_1 = require('../BaseService');
var q = require('q');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.apply(this, arguments);
    }
    Service.prototype.setTrackingService = function (tracking_service) {
        this.tracking_service = tracking_service;
    };
    Service.prototype.setUserService = function (user_service) {
        this.user_service = user_service;
    };
    Service.prototype.setGroupService = function (group_service) {
        this.group_service = group_service;
    };
    Service.prototype.trackLink = function (short_url, tracking_options) {
        var _this = this;
        return this.getLinkByShortUrl(short_url).then(function (link) {
            _this.tracking_service.trackLink(link, tracking_options);
            return link;
        });
    };
    Service.prototype.createLink = function (long_url, user_id, custom_url) {
        var _this = this;
        return this.validateLink(long_url, custom_url).then(function () {
            return _this.user_service.getUserById(user_id);
        }).then(function (user) {
            return _this.repo.createLink({
                long_url: long_url,
                short_url: custom_url,
                group_id: user.group_id,
                user_id: user.id
            });
        }).then(function (link) {
            link.owner = true;
            return _this.getCustomLinkById(link.id).then(function (custom_link) {
                link.short_url = _this.idToShortUrl(custom_link.id);
                return _this.repo.updateLink(link).then(function (link) {
                    _this.emitChange();
                    return link;
                });
            }, function (err) {
                link.short_url = link.short_url || _this.idToShortUrl(link.id);
                _this.emitChange();
                return link;
            });
        });
    };
    Service.prototype.getLinks = function (user_id) {
        var _this = this;
        var user;
        return this.user_service.getUserById(user_id).then(function (token_user) {
            user = token_user;
            return _this.repo.getLinksByGroupId(user.group_id);
        }).then(function (links) {
            return links.map(function (link) {
                return {
                    id: link.id,
                    long_url: link.long_url,
                    short_url: link.short_url || _this.idToShortUrl(link.id),
                    owner: link.user_id == user.id
                };
            });
        });
    };
    Service.prototype.deleteLinkById = function (id, user_id) {
        var _this = this;
        return q.all([
            this.user_service.getUserById(user_id),
            this.repo.getLinkById(id)
        ]).spread(function (user, link) {
            if (link.user_id == user.id) {
                _this.repo.deleteLinkById(link.id);
                return true;
            }
            else {
                throw new Error('Link cannot be deleted by that user');
            }
        });
    };
    Service.prototype.deleteLinksByGroupId = function (group_id) {
        var _this = this;
        return this.group_service.getGroupById(group_id).then(function () {
            return _this.repo.deleteLinksByGroupId(group_id);
        });
    };
    return Service;
})(BaseService_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;
//# sourceMappingURL=Service.js.map