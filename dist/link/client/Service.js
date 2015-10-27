var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var Service = (function (_super) {
    __extends(Service, _super);
    /**
     * Constructs a new Service.
     * @param {any} repository A repository.
     */
    function Service(repository) {
        _super.call(this, repository);
    }
    /**
     * Creates a new link.
     * @param {string} long_url The long_url to be used.
     * @param {string} custom_url The custom_url to be used (optional).
     * @return {Future}
     */
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
    /**
     * Gets links.
     * @return {Future}
     */
    Service.prototype.getLinks = function () {
        return this.repo.getLinks();
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map