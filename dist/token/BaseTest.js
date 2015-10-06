var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
    }
    Test.prototype.beforeEach = function () { };
    return Test;
})(BaseTest);
module.exports = Test;
//# sourceMappingURL=BaseTest.js.map