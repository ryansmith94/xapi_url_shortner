"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService_1 = require('../BaseService');
var EXPIRY_TIME = 120;
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.apply(this, arguments);
    }
    Service.prototype.setUserService = function (user_service) {
        this.user_service = user_service;
    };
    Service.prototype.createToken = function (email, password) {
        var _this = this;
        return this.user_service.getUserByEmailAndPassword(email, password).then(function (user) {
            var expiry = new Date();
            expiry.setMinutes(expiry.getMinutes() + EXPIRY_TIME);
            return _this.repo.createToken({
                value: Math.random().toString(36).substr(2),
                user_id: user.id,
                expiry: expiry.toISOString()
            });
        }).then(function (token) {
            return token;
        });
    };
    Service.prototype.getUserByValue = function (token_value) {
        return this.repo.getTokenByValue(token_value).then(function (token) {
            if ((new Date()).toISOString() < token.expiry) {
                return token.user_id;
            }
            else {
                throw new Error('No token. Log out and log back in.');
            }
        });
    };
    return Service;
}(BaseService_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;

//# sourceMappingURL=Service.js.map
