var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var q = require('q');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.apply(this, arguments);
    }
    /**
     * Sets the tracking service.
     * @param {any} tracking_service A tracking service.
     */
    Service.prototype.setTrackingService = function (tracking_service) {
        this.tracking_service = tracking_service;
    };
    /**
     * Sets the token service.
     * @param {any} token_service A token service.
     */
    Service.prototype.setTokenService = function (token_service) {
        this.token_service = token_service;
    };
    /**
     * Tracks a link.
     * @param {string} short_url The short_url to track.
     * @param {any} tracking_options The options to be used by the tracking service.
     */
    Service.prototype.trackLink = function (short_url, tracking_options) {
        return this.getLinkByShortUrl(short_url).then(function (link) {
            this.tracking_service.trackLink(link, tracking_options);
            return link;
        }.bind(this));
    };
    /**
     * Creates a new link.
     * @param {string} long_url The long_url to be used.
     * @param {string} token The token used by the user creating the link.
     * @param {string} custom_url The custom_url to be used (optional).
     * @return {Future}
     */
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
    /**
     * Gets links.
     * @param {string} token The token used by the user requesting the links.
     * @return {Future}
     */
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
    /**
     * Deletes a link by ID if able to with the given token.
     * @param {string} id The ID of the link to delete.
     * @param {string} token The token used by the user requesting the links.
     * @return {Future}
     */
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
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map