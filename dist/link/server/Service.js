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
    Service.prototype.setTokenService = function (token_service) {
        this.token_service = token_service;
    };
    Service.prototype.setGroupService = function (group_service) {
        this.group_service = group_service;
    };
    Service.prototype.trackLink = function (short_url, tracking_options) {
        return this.getLinkByShortUrl(short_url).then(function (link) {
            this.tracking_service.trackLink(link, tracking_options);
            return link;
        }.bind(this));
    };
    Service.prototype.createLinkWithToken = function (long_url, token, custom_url) {
        var self = this;
        return self.validateLink(long_url, custom_url).then(function () {
            return self.token_service.getUserByValue(token);
        }).then(function (user) {
            return self.repo.createLink({
                long_url: long_url,
                short_url: custom_url,
                group_id: user.group_id,
                user_id: user.id
            });
        }).then(function (link) {
            link.owner = true;
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
    Service.prototype.getLinksByToken = function (token) {
        var user;
        return this.token_service.getUserByValue(token).then(function (token_user) {
            user = token_user;
            return this.repo.getLinksByGroupId(user.group_id);
        }.bind(this)).then(function (links) {
            return links.map(function (link) {
                return {
                    id: link.id,
                    long_url: link.long_url,
                    short_url: link.short_url || this.idToShortUrl(link.id),
                    owner: link.user_id == user.id
                };
            }.bind(this));
        }.bind(this));
    };
    Service.prototype.deleteLinkByIdWithToken = function (id, token) {
        return q.all([
            this.token_service.getUserByValue(token),
            this.repo.getLinkById(id)
        ]).spread(function (user, link) {
            if (link.user_id == user.id) {
                this.repo.deleteLinkById(link.id);
                return true;
            }
            else {
                throw new Error('Link cannot be deleted with that token');
            }
        }.bind(this));
    };
    Service.prototype.deleteLinksByGroupId = function (group_id) {
        return this.group_service.getGroupById(group_id).then(function () {
            return this.repo.deleteLinksByGroupId(group_id);
        }.bind(this));
    };
    return Service;
})(BaseService_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;
//# sourceMappingURL=Service.js.map