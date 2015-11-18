var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Factory = require('./TestFactory');
var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = __filename;
    }
    Test.prototype.beforeEach = function () {
        this.service = Factory();
    };
    Test.prototype.testCreateToken = function () {
        return this.service.createToken(EMAIL, PASSWORD).then(this.pass());
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map