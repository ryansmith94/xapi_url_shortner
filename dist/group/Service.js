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
    Service.prototype.createGroup = function (name) {
        return this.repo.createGroup({
            name: name
        });
    };
    Service.prototype.getGroupById = function (id) {
        return this.repo.getGroupById(id);
    };
    return Service;
})(BaseService);
module.exports = Service;
//# sourceMappingURL=Service.js.map