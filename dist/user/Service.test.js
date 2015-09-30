var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('./TestRepository');
var GroupService = require('../group/Service');
var GroupTestRepository = require('../group/TestRepository');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var GROUP_ID = 1;
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'user/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.group_service = new GroupService(new GroupTestRepository());
        this.service = new Service(new TestRepository(), this.group_service);
    };
    Test.prototype.testCreateUser = function (assert, done) {
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (user) {
                assert.equal(user.email, EMAIL);
                assert.equal(user.password, PASSWORD);
                assert.equal(user.group_id, group.id);
            });
        }.bind(this)).then(done, done);
    };
    Test.prototype.testCreateUserWithInvalidEmail = function (assert, done) {
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return this.service.createUser('invalid_email', PASSWORD, group.id).then(function (user) {
                assert.equal(true, false);
            }, function () {
                assert.equal(false, false);
            });
        }.bind(this)).then(done, done);
    };
    Test.prototype.testCreateUserWithInvalidGroupId = function (assert, done) {
        this.service.createUser(EMAIL, PASSWORD, GROUP_ID).then(function (user) {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.testCreateUserThatExistsInGroup = function (assert, done) {
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (existing_user) {
                return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (user) {
                    assert.equal(true, false);
                }, function () {
                    assert.equal(false, false);
                });
            }.bind(this));
        }.bind(this)).then(done, done);
    };
    Test.prototype.testGetUserByEmailAndPassword = function (assert, done) {
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (existing_user) {
                return this.service.getUserByEmailAndPassword(EMAIL, PASSWORD).then(function (user) {
                    assert.equal(user.id, existing_user.id);
                    assert.equal(user.email, EMAIL);
                    assert.equal(user.password, PASSWORD);
                });
            }.bind(this));
        }.bind(this)).then(done, done);
    };
    Test.prototype.testGetUserByEmailAndPasswordWithNoUser = function (assert, done) {
        this.service.getUserByEmailAndPassword(EMAIL, PASSWORD).then(function (user) {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.testGetUserByIdWithNoUser = function (assert, done) {
        this.service.getUserById(1).then(function (user) {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map