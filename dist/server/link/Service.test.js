var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestCase = require('../../TestCase');
var Service = require('./Service');
var TestRepository = require('./TestRepository');
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.service = new Service(new TestRepository());
    };
    Test.prototype.testCreateLink = function (assert) {
        var long_url = 'http://www.example.com';
        this.service.createLink('http://www.example.com').then(function (link) {
            assert.equal(long_url, link.long_url);
        });
    };
    return Test;
})(TestCase);
(new Test()).run();
module.exports = Test;
