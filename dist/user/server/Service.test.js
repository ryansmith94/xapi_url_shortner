var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../../BaseTest');
var Factory = require('./TestFactory');
var GroupFactory = require('../../group/TestFactory');
var TokenFactory = require('../../token/server/TestFactory');
var passhash = require('password-hash');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var GROUP_ID = 1;
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = __filename;
    }
    Test.prototype.beforeEach = function () {
        this.group_service = GroupFactory();
        this.token_service = TokenFactory();
        this.service = Factory();
        this.service.setGroupService(this.group_service);
        this.service.setTokenService(this.token_service);
        this.token_service.setUserService(this.service);
    };
    Test.prototype.createToken = function (id) {
        var _this = this;
        if (id === void 0) { id = ''; }
        var user_email = id + 'test@example.com';
        var user_pass = 'test_password';
        var group_name = 'GROUP_NAME';
        return this.group_service.createGroup(group_name).then(function (group) {
            return _this.service.createUser(user_email, user_pass, group.id);
        }).then(function (user) {
            return _this.token_service.createToken(user_email, user_pass);
        });
    };
    Test.prototype.testCreateUser = function () {
        var _this = this;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return _this.service.createUser(EMAIL, PASSWORD, group.id).then(function (user) {
                _this.assert(user.email === EMAIL);
                _this.assert(passhash.verify(PASSWORD, user.password));
                _this.assert(user.group_id === group.id);
            });
        });
    };
    Test.prototype.testCreateUserWithInvalidEmail = function () {
        var _this = this;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return _this.service.createUser('invalid_email', PASSWORD, group.id);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testCreateUserWithInvalidGroupId = function () {
        return this.service.createUser(EMAIL, PASSWORD, GROUP_ID).then(this.fail(), this.pass());
    };
    Test.prototype.testCreateUserThatExistsInGroup = function () {
        var _this = this;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return _this.service.createUser(EMAIL, PASSWORD, group.id).then(function (existing_user) {
                return _this.service.createUser(EMAIL, PASSWORD, group.id).then(_this.fail(), _this.pass());
            });
        });
    };
    Test.prototype.testGetUserByEmailAndPassword = function () {
        var _this = this;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return _this.service.createUser(EMAIL, PASSWORD, group.id).then(function (existing_user) {
                return _this.service.getUserByEmailAndPassword(EMAIL, PASSWORD).then(function (user) {
                    _this.assert(user.id === existing_user.id);
                    _this.assert(user.email === EMAIL);
                    _this.assert(passhash.verify(PASSWORD, user.password));
                });
            });
        });
    };
    Test.prototype.testGetUserByEmailAndPasswordWithNoUser = function () {
        return this.service.getUserByEmailAndPassword(EMAIL, PASSWORD).then(this.fail(), this.pass());
    };
    Test.prototype.testGetUserByIdWithNoUser = function () {
        return this.service.getUserById(1).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteUserById = function () {
        var _this = this;
        var group_id, user_id;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            group_id = group.id;
            return _this.service.createUser(EMAIL, PASSWORD, group_id);
        }).then(function (user) {
            user_id = user.id;
            return _this.service.deleteUserById(user_id);
        }).then(function () {
            return _this.service.getUserById(user_id);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteUserByIdWithNoUser = function () {
        return this.service.deleteUserById(1).then(this.fail(), this.pass());
    };
    Test.prototype.testCreateUserWithToken = function () {
        var _this = this;
        return this.createToken('1').then(function (token) {
            return _this.service.createUserWithToken(EMAIL, PASSWORD, token.value);
        }).then(function (user) {
            _this.assert(user.email === EMAIL);
            _this.assert(passhash.verify(PASSWORD, user.password));
            _this.assert(user.group_id === user.group_id);
        });
    };
    Test.prototype.testCreateUserWithTokenAndInvalidEmail = function () {
        var _this = this;
        return this.createToken('1').then(function (token) {
            return _this.service.createUserWithToken('invalid email', PASSWORD, token.value);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testCreateUserWithTokenThatExists = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.createUserWithToken(EMAIL, PASSWORD, token.value);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testGetUsersWithGroupId = function () {
        var _this = this;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return _this.service.createUser(EMAIL, PASSWORD, group.id);
        }).then(function (user) {
            return _this.service.getUsersByGroupId(user.group_id);
        }).then(function (users) {
            _this.assert(Array.isArray(users));
            _this.assert(users.length === 1);
            _this.assert(users[0].email === EMAIL);
        });
    };
    Test.prototype.testGetUsersWithInvalidGroupId = function () {
        return this.service.getUsersByGroupId(GROUP_ID).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteUsersByGroupId = function () {
        var _this = this;
        var group_id, user_id;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            group_id = group.id;
            return _this.service.createUser(EMAIL, PASSWORD, group_id);
        }).then(function (user) {
            user_id = user.id;
            return _this.service.deleteUsersByGroupId(group_id);
        }).then(function () {
            return _this.service.getUserById(user_id);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteUsersByInvalidGroupId = function () {
        return this.service.deleteUsersByGroupId(1).then(this.fail(), this.pass());
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map