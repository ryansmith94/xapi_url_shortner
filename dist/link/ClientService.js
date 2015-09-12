var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository) {
        this.repo = repository;
        _super.call(this);
    }
    Service.prototype.createLink = function (long_url) {
        if (this.last_created && long_url === this.last_created.long_url) {
            return false;
        }
        return this.repo.createLink({
            long_url: long_url
        }).then(function (link) {
            this.last_created = link;
            this.emitChange();
            return link;
        }.bind(this));
    };
    Service.prototype.getLastCreatedLink = function () {
        return this.last_created;
    };
    return Service;
})(BaseService);
module.exports = Service;
