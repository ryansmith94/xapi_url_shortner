var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest_1 = require('../../BaseTest');
var TestFactory_1 = require('./TestFactory');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = __filename;
    }
    Test.prototype.beforeEach = function () {
        this.service = TestFactory_1.default();
    };
    Test.prototype.testCreateUser = function () {
        var _this = this;
        return this.service.createUser(EMAIL, PASSWORD).then(function (user) {
            _this.assert(user.email === EMAIL);
            _this.assert(user.password === PASSWORD);
        });
    };
    Test.prototype.testCreateUserWithInvalidEmail = function () {
        return this.service.createUser('invalid_email', PASSWORD).then(this.fail(), this.pass());
    };
    return Test;
})(BaseTest_1.default);
(new Test()).run();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;
//# sourceMappingURL=Service.test.js.map