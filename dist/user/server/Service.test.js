var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest_1 = require('../../BaseTest');
var TestFactory_1 = require('./TestFactory');
var TestFactory_2 = require('../../group/TestFactory');
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
        this.group_service = TestFactory_2.default();
        this.service = TestFactory_1.default();
        this.service.setGroupService(this.group_service);
    };
    Test.prototype.createUser = function (id) {
        var _this = this;
        if (id === void 0) { id = ''; }
        var user_email = id + 'test@example.com';
        var user_pass = 'test_password';
        var group_name = 'GROUP_NAME';
        return this.group_service.createGroup(group_name).then(function (group) {
            return _this.service.createUser(user_email, user_pass, group.id);
        });
    };
    Test.prototype.testCreateUser = function () {
        var _this = this;
        return this.group_service.createGroup(GROUP_NAME).then(function (group) {
            return _this.service.createUser(EMAIL, PASSWORD, group.id).then(function (user) {
                _this.assert(user.email === EMAIL);
                _this.assert(passhash.verify(PASSWORD, user.password));
                _this.assert(user.group_id === group.id);
                _this.assert(user.admin === false);
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
                    _this.assert(user.admin === false);
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
    Test.prototype.testCreateUserWithUser = function () {
        var _this = this;
        return this.createUser('1').then(function (user) {
            return _this.service.createUserWithUser(EMAIL, PASSWORD, user.id);
        }).then(function (user) {
            _this.assert(user.email === EMAIL);
            _this.assert(passhash.verify(PASSWORD, user.password));
            _this.assert(user.admin === false);
        });
    };
    Test.prototype.testCreateUserWithUserAndInvalidEmail = function () {
        var _this = this;
        return this.createUser('1').then(function (user) {
            return _this.service.createUserWithUser('invalid email', PASSWORD, user.id);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testCreateUserWithUserThatExists = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createUserWithUser(EMAIL, PASSWORD, user.id);
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
    Test.prototype.testCreateAdmin = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createAdmin(user.id);
        }).then(function (user) {
            _this.assert(user.admin === true);
        });
    };
    return Test;
})(BaseTest_1.default);
(new Test()).run();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;
//# sourceMappingURL=Service.test.js.map