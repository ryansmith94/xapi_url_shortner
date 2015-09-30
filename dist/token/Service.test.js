var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('./TestRepository');
var UserService = require('../user/Service');
var UserTestRepository = require('../user/TestRepository');
var GroupService = require('../group/Service');
var GroupTestRepository = require('../group/TestRepository');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'token/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.group_service = new GroupService(new GroupTestRepository());
        this.user_service = new UserService(new UserTestRepository(), this.group_service);
        this.service = new Service(new TestRepository(), this.user_service);
    };
    Test.prototype.testCreateToken = function (assert, done) {
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return this.user_service.createUser(EMAIL, PASSWORD, group.id).then(function (user) {
                return this.service.createToken(EMAIL, PASSWORD).then(function (token) {
                    assert.equal(typeof token.value, 'string');
                    assert.equal(token.user_id, user.id);
                }.bind(this));
            }.bind(this));
        }.bind(this)).then(done, done);
    };
    Test.prototype.testCreateTokenWithInvalidUser = function (assert, done) {
        this.service.createToken(EMAIL, PASSWORD).then(function (token) {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.testGetUserByValue = function (assert, done) {
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return this.user_service.createUser(EMAIL, PASSWORD, group.id).then(function (user) {
                return this.service.createToken(EMAIL, PASSWORD).then(function (token) {
                    return this.service.getUserByValue(token.value).then(function (token_user) {
                        assert.equal(token_user.id, token.user_id);
                    });
                }.bind(this));
            }.bind(this));
        }.bind(this)).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map