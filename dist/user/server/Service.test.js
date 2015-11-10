var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../../BaseTest');
var Service = require('./Service');
var TestRepository = require('../TestRepository');
var GroupService = require('../../group/Service');
var GroupTestRepository = require('../../group/TestRepository');
var TokenService = require('../../token/server/Service');
var TokenTestRepository = require('../../token/server/TestRepository');
var passhash = require('password-hash');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var GROUP_ID = 1;
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'user/server/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.group_service = new GroupService(new GroupTestRepository());
        this.token_service = new TokenService(new TokenTestRepository());
        this.service = new Service(new TestRepository());
        this.service.setGroupService(this.group_service);
        this.service.setTokenService(this.token_service);
        this.token_service.setUserService(this.service);
    };
    Test.prototype.createToken = function (id) {
        if (id === void 0) { id = ''; }
        var user_email = id + 'test@example.com';
        var user_pass = 'test_password';
        var group_name = 'GROUP_NAME';
        return this.group_service.createGroup(group_name).then(function (group) {
            return this.service.createUser(user_email, user_pass, group.id);
        }.bind(this)).then(function (user) {
            return this.token_service.createToken(user_email, user_pass);
        }.bind(this));
    };
    Test.prototype.testCreateUser = function (assert, done) {
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (user) {
                assert.equal(user.email, EMAIL);
                assert.equal(passhash.verify(PASSWORD, user.password), true);
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
                    assert.equal(passhash.verify(PASSWORD, user.password), true);
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
    Test.prototype.testDeleteUserById = function (assert, done) {
        var group_id, user_id;
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            group_id = group.id;
            return this.service.createUser(EMAIL, PASSWORD, group_id);
        }.bind(this)).then(function (user) {
            user_id = user.id;
            return this.service.deleteUserById(user_id);
        }.bind(this)).then(function () {
            return this.service.getUserById(user_id);
        }.bind(this)).then(function () {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.testDeleteUserByIdWithNoUser = function (assert, done) {
        this.service.deleteUserById(1).then(function (user) {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.testCreateUserWithToken = function (assert, done) {
        this.createToken('1').then(function (token) {
            return this.service.createUserWithToken(EMAIL, PASSWORD, token.value);
        }.bind(this)).then(function (user) {
            assert.equal(user.email, EMAIL);
            assert.equal(passhash.verify(PASSWORD, user.password), true);
            assert.equal(user.group_id, user.group_id);
        }).then(done, done);
    };
    Test.prototype.testCreateUserWithTokenAndInvalidEmail = function (assert, done) {
        this.createToken('1').then(function (token) {
            return this.service.createUserWithToken('invalid email', PASSWORD, token.value);
        }.bind(this)).then(function () {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.testCreateUserWithTokenThatExists = function (assert, done) {
        this.createToken().then(function (token) {
            return this.service.createUserWithToken(EMAIL, PASSWORD, token.value);
        }.bind(this)).then(function () {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.testGetUsersWithGroupId = function (assert, done) {
        this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return this.service.createUser(EMAIL, PASSWORD, group.id);
        }.bind(this)).then(function (user) {
            return this.service.getUsersByGroupId(user.group_id);
        }.bind(this)).then(function (users) {
            assert.equal(Array.isArray(users), true);
            assert.equal(users.length, 1);
            assert.equal(users[0].email, EMAIL);
        }).then(done, done);
    };
    Test.prototype.testGetUsersWithInvalidGroupId = function (assert, done) {
        this.service.getUsersByGroupId(GROUP_ID).then(function () {
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