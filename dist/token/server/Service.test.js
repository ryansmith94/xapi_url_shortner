var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('./TestRepository');
var UserService = require('../../user/server/Service');
var UserTestRepository = require('../../user/TestRepository');
var GroupService = require('../../group/Service');
var GroupTestRepository = require('../../group/TestRepository');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'token/server/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.group_service = new GroupService(new GroupTestRepository());
        this.service = new Service(new TestRepository());
        this.user_service = new UserService(new UserTestRepository());
        this.user_service.setGroupService(this.group_service);
        this.user_service.setTokenService(this.service);
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
                return _this.service.getUserByValue(token.value).then(function (token_user) {
                    _this.assert(token_user.id === token.user_id);
                });
            });
        });
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map