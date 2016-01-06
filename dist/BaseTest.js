var chai = require('chai');
var source_map_support = require('source-map-support');
source_map_support.install({
    handleUncaughtExceptions: false
});
var TestCase = (function () {
    function TestCase() {
        this.name = __filename;
    }
    TestCase.prototype.run = function () {
        var _this = this;
        describe(this.name, function () {
            var keys = [];
            for (var key in _this) {
                keys.push(key);
            }
            var tests = keys.filter(function (key) {
                return key.indexOf('test') === 0;
            });
            tests.forEach(_this.runTest.bind(_this));
        });
    };
    TestCase.prototype.runTest = function (test) {
        var _this = this;
        beforeEach(this.beforeEach.bind(this));
        it(test, function (done) {
            return _this[test]().then(done, done);
        });
        afterEach(this.afterEach.bind(this));
    };
    TestCase.prototype.beforeEach = function () { };
    TestCase.prototype.afterEach = function () { };
    TestCase.prototype.assert = function (condition, message) {
        chai.assert.equal(condition == true, true, message);
    };
    TestCase.prototype.pass = function () {
        var _this = this;
        return function () { return _this.assert(true); };
    };
    TestCase.prototype.fail = function () {
        var _this = this;
        return function () { return _this.assert(false, 'Fail'); };
    };
    return TestCase;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestCase;
//# sourceMappingURL=BaseTest.js.map