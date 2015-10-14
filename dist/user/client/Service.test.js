var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../../BaseTest');
var Service = require('./Service');
var TestRepository = require('../TestRepository');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'user/client/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.service = new Service(new TestRepository());
    };
    Test.prototype.testCreateUser = function (assert, done) {
        return this.service.createUser(EMAIL, PASSWORD).then(function (user) {
            assert.equal(user.email, EMAIL);
            assert.equal(user.password, PASSWORD);
        }).then(done, done);
    };
    Test.prototype.testCreateUserWithInvalidEmail = function (assert, done) {
        return this.service.createUser('invalid_email', PASSWORD).then(function (user) {
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