/// <reference path="./definitions/references.d.ts" />
var chai = require('chai');
var source_map_support = require('source-map-support');
source_map_support.install({
    handleUncaughtExceptions: false
});
var TestCase = (function () {
    function TestCase() {
        this.name = 'TestCase';
    }
    TestCase.prototype.run = function () {
        describe(this.name, function () {
            var keys = Object.keys(this.constructor.prototype);
            var tests = keys.filter(function (key) {
                return key.indexOf('test') === 0;
            });
            tests.forEach(function (test) {
                beforeEach(this.beforeEach.bind(this));
                it(test, function (done) {
                    return this[test](chai.assert, done);
                }.bind(this));
                afterEach(this.afterEach.bind(this));
            }.bind(this));
        }.bind(this));
    };
    TestCase.prototype.beforeEach = function () { };
    TestCase.prototype.afterEach = function () { };
    TestCase.prototype.match = function (act, exp) {
        act.forEach(function (val, index) {
            chai.assert.equal(act[index], exp[index]);
        });
        exp.forEach(function (val, index) {
            chai.assert.equal(act[index], exp[index]);
        });
    };
    return TestCase;
})();
module.exports = TestCase;
//# sourceMappingURL=BaseTest.js.map