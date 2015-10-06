var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository, tracking_service) {
        this.tracking_service = tracking_service;
        _super.call(this, repository);
    }
    Service.prototype.trackLink = function (short_url, tracking_options) {
        return this.getLinkByShortUrl(short_url).then(function (link) {
            this.tracking_service.trackLink(link, tracking_options);
            return link;
        }.bind(this));
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map