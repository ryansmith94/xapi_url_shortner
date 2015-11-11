var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = require('../BaseService');
var q = require('q');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(repository) {
        this.repo = repository;
        _super.call(this);
    }
    Service.prototype.setUserService = function (user_service) {
        this.user_service = user_service;
    };
    Service.prototype.setLinkService = function (link_service) {
        this.link_service = link_service;
    };
    Service.prototype.createGroup = function (name) {
        return this.repo.createGroup({
            name: name
        });
    };
    Service.prototype.getGroupById = function (id) {
        return this.repo.getGroupById(id);
    };
    Service.prototype.getGroups = function () {
        return this.repo.getGroups();
    };
    Service.prototype.deleteGroupById = function (id) {
        return q.all([
            this.user_service.deleteUsersByGroupId(id),
            this.link_service.deleteLinksByGroupId(id),
            this.repo.deleteGroupById(id)
        ]).then(function () {
            return true;
        });
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map