var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService_1 = require('../BaseService');
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.apply(this, arguments);
    }
    Service.prototype.createToken = function (email, password) {
        return this.repo.createToken({
            email: email,
            password: password
        });
    };
    return Service;
})(BaseService_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;
//# sourceMappingURL=Service.js.map