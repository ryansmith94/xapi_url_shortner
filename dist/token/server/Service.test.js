"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest_1 = require('../BaseTest');
var TestFactory_1 = require('./TestFactory');
var TestFactory_2 = require('../../user/server/TestFactory');
var TestFactory_3 = require('../../group/TestFactory');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = __filename;
    }
    Test.prototype.beforeEach = function () {
        this.group_service = TestFactory_3.default();
        this.service = TestFactory_1.default();
        this.user_service = TestFactory_2.default();
        this.user_service.setGroupService(this.group_service);
        this.service.setUserService(this.user_service);
    };
    Test.prototype.testCreateToken = function () {
        var _this = this;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return _this.user_service.createUser(EMAIL, PASSWORD, group.id);
        }).then(function (user) {
            return _this.service.createToken(EMAIL, PASSWORD).then(function (token) {
                _this.assert(typeof token.value === 'string');
                _this.assert(token.user_id === user.id);
            });
        });
    };
    Test.prototype.testCreateTokenWithInvalidUser = function () {
        return this.service.createToken(EMAIL, PASSWORD).then(this.fail(), this.pass());
    };
    Test.prototype.testGetUserByValue = function () {
        var _this = this;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return _this.user_service.createUser(EMAIL, PASSWORD, group.id);
        }).then(function (user) {
            return _this.service.createToken(EMAIL, PASSWORD).then(function (token) {
                return _this.service.getUserByValue(token.value).then(function (user_id) {
                    _this.assert(user_id === token.user_id);
                });
            });
        });
    };
    return Test;
}(BaseTest_1.default));
(new Test()).run();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;

//# sourceMappingURL=Service.test.js.map
